const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Rental = require('../../models/rental');
const Boat = require('../../models/boat');

const {promises} = require('fs');
const {userNotFound, invalidPassword, duplicateEmail, samePassword, userWithRentals, userWithBoats} = require("../../helpers/problemMessages");
const {transformUser} = require("./merge");
const {authenticated} = require("../../auth/auth");
const {getUserDir} = require("../../helpers/utils");

const ACCESS_EXPIRE_TIME = '1m'
const REFRESH_EXPIRE_TIME = '7d'

const createTokens = (userId, userRole, count, res) => {
    const accessToken = jwt.sign({userId, userRole}, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: ACCESS_EXPIRE_TIME});
    const refreshToken = jwt.sign({userId, count}, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: REFRESH_EXPIRE_TIME});

    const expirationTime = new Date(new Date().getTime() + (parseInt(REFRESH_EXPIRE_TIME) * 24 * 60 * 60 * 1000));
    res.cookie('refresh-token', refreshToken, {expires: expirationTime, httpOnly: true})

    return accessToken
}
const decodeRefreshToken = (req) => {
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken || refreshToken === '') { throw new Error("Can't find refresh token.") }

    let decodedToken;
    try { decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
    } catch (err) { throw new Error('Invalid or expired refresh token.') }

    return decodedToken
}

module.exports = {
    user: authenticated(async (_, {req}) => {
        try {
            const user = await User.findById(req.userId).lean()
            if (!user) { return { authProblem: userNotFound } }
            return transformUser(user)
        } catch (err) { throw new Error(`Can't retrieve user info. ${err}`); }
    }),
    login: async (args, {_, res}) => {
        const {email, password} = args.inputUser
        try {
            const user = await User.findOne({email}).lean()
            if (!user) { return { authProblem: userNotFound } }

            const isEqual =  await bcrypt.compare(password, user.password)
            if (!isEqual) { return { authProblem: invalidPassword } }

            const accessToken = createTokens(user._id, user.userType, user.count, res)
            return {authData: {userId: user._id, token: accessToken} };
        } catch (err) { throw new Error(`Can't login. ${err}`); }
    },
    changePassword: authenticated(async (args, {req}) => {
        const {oldPassword, newPassword} = args.inputChangePassword
        try {
            if (oldPassword === newPassword) { return { changePasswordProblem: samePassword} }

            const user = await User.findById(req.userId)
            if (!user) { return { authProblem: userNotFound } }

            const isEqual =  await bcrypt.compare(oldPassword, user.password)
            if (!isEqual) { return { changePasswordProblem: invalidPassword } }

            user.password = await bcrypt.hash(newPassword, 12)
            await user.save()

            return {changePasswordData: transformUser(user) };
        } catch (err) { throw new Error(`Can't change password. ${err}`); }
    }),
    createUser: async (args, {_, res}) => {
        const {email, password} = args.inputUser
        try {
            const existingUser = await User.findOne({email}).lean()
            if (existingUser) { return { authProblem: duplicateEmail} }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await User.create({email: email, password: hashedPassword})

            const accessToken = createTokens(user._id, user.userType, user.count, res)
            return {authData: {userId: user._id, token: accessToken} }
        } catch (err) { throw new Error(`Can't create user. ${err}`); }
    },
    updateUser: authenticated(async (args, {req}) => {
        const {street, city, region, postalCode} = args.inputUpdateUser
        try {
            const user = await User.findById(req.userId)
            if (!user) { return { updateUserProblem: userNotFound } }

            if (street !== undefined) {
                user.address.street = street;
            }
            if (city !== undefined) {
                user.address.city = city;
            }
            if (region !== undefined) {
                user.address.region = region;
            }
            if (postalCode !== undefined) {
                user.address.postalCode = postalCode;
            }
            await user.save()
            return { updateUserData: transformUser(user) }
        } catch (err) { throw new Error(`Can't update user. ${err}`)}
    }),
    deleteUser: authenticated(async (_, {req}) => {
        try {
            const rentals = await Rental.find({customer: req.userId}).lean()
            if (rentals) return {deleteUserProblem: userWithRentals}
            const boats = await Boat.find({shipowner: req.userId}).lean()
            if (boats) return {deleteUserProblem: userWithBoats}

            const {deletedCount} = await User.deleteOne({_id: req.userId})
            if (deletedCount === 0) return {deleteUserProblem: userNotFound}

            const USER_DIR = getUserDir(req.userId);
            await promises.access(USER_DIR)
                .then(async () => await promises.rmdir(USER_DIR, {recursive: true}))
                .catch(() => console.log("Can't find user dir"))

            return { deletedUserId: req.userId }
        } catch (err) { throw new Error(`Can't delete user. ${err}`)}
    }),
    refreshToken: async (_, {req, res}) => {
        const decodedToken = decodeRefreshToken(req)

        const user = await User.findById(decodedToken.userId)
        if (!user || user.count !== decodedToken.count) { throw new Error('Invalid or expired refresh token.') }
        user.count += 1;
        await user.save();

        const accessToken = createTokens(user._id, user.userType, user.count, res)
        return {userId: user._id, token: accessToken}
    },
    invalidateTokens: async (_, {req, res}) => {
        const decodedToken = decodeRefreshToken(req)
        try {
            await User.findByIdAndUpdate(
                {_id: decodedToken.userId},
                { $inc: { count: 1 } },
                {useFindAndModify: false}
            )
            res.clearCookie('refresh-token')

            return true
        } catch (err) { throw new Error(`Can't invalide tokens. ${err}`) }
    }
}
