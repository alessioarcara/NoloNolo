const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const {userNotFound, invalidPassword, duplicateEmail} = require("../../helpers/problemMessages");

const ACCESS_EXPIRE_TIME = '60m'
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

            return user
        } catch (err) {`Can't retrieve user info. ${err}`}
    },
    login: async ({email, password}, {_, res}) => {
        try {
            const user = await User.findOne({email});
            if (!user) { return { authProblem: userNotFound } }

            const isEqual = bcrypt.compare(password, user.password)
            if (!isEqual) { return { authProblem: invalidPassword } }

            const accessToken = createTokens(user._id, user.email, user.count, res)
            return {authData: {userId: user._id, token: accessToken} };
        } catch (err) {
            throw new Error(`Can't login. ${err}`); }
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
        } catch (err) {
            throw new Error(`Can't create user. ${err}`)
        }
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

        await User.findByIdAndUpdate(decodedToken.userId, { $inc: { count: 1 } })
        res.clearCookie('refresh-token')
        return true
    }
}
