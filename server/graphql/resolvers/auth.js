const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const ACCESS_EXPIRE_TIME = '1h'
const REFRESH_EXPIRE_TIME = '7d'

const createTokens = (userId, email, count, res) => {
    const accessToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: ACCESS_EXPIRE_TIME});

    if (res !== undefined) {
        const refreshToken = jwt.sign({userId, count}, process.env.REFRESH_TOKEN_KEY, {
            expiresIn: REFRESH_EXPIRE_TIME});

        const expirationTime = new Date(new Date().getTime() + (+REFRESH_EXPIRE_TIME[0]) * 24 * 60 * 60 * 1000)
        res.cookie('refresh-token', refreshToken, {expires: expirationTime, httpOnly: true})
    }
    return accessToken
}

module.exports = {
    login: async ({email, password}, res) => {
        try {
            const user = await User.findOne({email});

            if (!user) { throw new Error('User does not exist!'); }

            const isEqual = bcrypt.compare(password, user.password)
            if (!isEqual) { throw new Error('Password is incorrect!'); }

            const accessToken = createTokens(user._id, user.email, user.count, res)

            return {userId: user._id, token: accessToken, tokenExpiration: +ACCESS_EXPIRE_TIME[0] };
        } catch (err) { throw new Error(`Can't login. ${err}`); }
    },
    createUser: async (args, {_, res}) => {
        const {email, password} = args.inputUser
        try {
            const existingUser = await User.findOne({email})
            if (existingUser) { throw new Error(`User already exists.`); }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email: email, password: hashedPassword})
            await user.save();

            const accessToken = createTokens(user._id, user.email, user.count, res)

            return {userId: user._id, token: accessToken, tokenExpiration: +ACCESS_EXPIRE_TIME[0]}
        } catch (err) {
            throw new Error(`Can't create user. ${err}`)
        }
    },
    refreshToken: async (_, {req, __}) => {
        const refreshToken = req.cookies["refresh-token"];
        if (!refreshToken || refreshToken === '') {
            throw new Error("Can't find refresh token.")
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
        } catch (err) { throw new Error('Invalid or expired refresh token.') }

        const user = await User.findById(decodedToken.userId)
        if (!user || user.count !== decodedToken.count) {
            throw new Error('Invalid or expired refresh token.')
        }
        user.count += 1
        await user.save();

        const accessToken = createTokens(user._id, user.email)
        return {userId: user._id, token: accessToken, tokenExpiration: +ACCESS_EXPIRE_TIME[0]}
    }
}
