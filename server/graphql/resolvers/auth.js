const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const {userNotFound, invalidPassword, duplicateEmail, samePassword} = require("../../helpers/problemMessages");
const {transformUser} = require("./merge");

const ACCESS_EXPIRE_TIME = '1m'
const REFRESH_EXPIRE_TIME = '7d'

const createTokens = (userId, email, count, res) => {
    const accessToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_KEY, {
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
    user: async (_, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
        try {
            const user = await User.findById(req.userId)
            if (!user) { return { authProblem: userNotFound } }

            return transformUser(user)
        } catch (err) { throw new Error(`Can't retrieve user info. ${err}`); }
    },
    login: async (args, {_, res}) => {
        const {email, password} = args.inputUser
        try {
            const user = await User.findOne({email});
            if (!user) { return { authProblem: userNotFound } }

            const isEqual =  await bcrypt.compare(password, user.password)
            if (!isEqual) { return { authProblem: invalidPassword } }

            const accessToken = createTokens(user._id, user.email, user.count, res)
            return {authData: {userId: user._id, token: accessToken} };
        } catch (err) { throw new Error(`Can't login. ${err}`); }
    },
    changePassword: async (args, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
        const {oldPassword, newPassword} = args.inputChangePassword
        try {
            if (oldPassword === newPassword) { return { changePasswordProblem: samePassword} }

            const user = await User.findById(req.userId)
            if (!user) { return { authProblem: userNotFound } }

            const isEqual =  await bcrypt.compare(oldPassword, user.password)
            if (!isEqual) { return { changePasswordProblem: invalidPassword } }

            user.password = await bcrypt.hash(newPassword, 12)
            await user.save()

            return {changePasswordStatus: true };
        } catch (err) { throw new Error(`Can't change password. ${err}`); }
    },
    createUser: async (args, {_, res}) => {
        const {email, password} = args.inputUser
        try {
            const existingUser = await User.findOne({email})
            if (existingUser) { return { authProblem: duplicateEmail} }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email: email, password: hashedPassword})
            await user.save();

            const accessToken = createTokens(user._id, user.email, user.count, res)
            return {authData: {userId: user._id, token: accessToken} }
        } catch (err) { throw new Error(`Can't create user. ${err}`); }
    },
    updateUser: async (args, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
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
            return { updateUserData: transformUser(user) };
        } catch (err) { throw new Error(`Can't update user. ${err}`)}
    },
    refreshToken: async (_, {req, res}) => {
        const decodedToken = decodeRefreshToken(req)

        const user = await User.findById(decodedToken.userId)
        if (!user || user.count !== decodedToken.count) { throw new Error('Invalid or expired refresh token.') }
        user.count += 1;
        await user.save();

        const accessToken = createTokens(user._id, user.email, user.count, res)
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
