const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    login: async ({email, password}) => {
        try {
            const user = await User.findOne({email});

            if (!user) { throw new Error('User does not exist!'); }

            const isEqual = bcrypt.compare(password, user.password)
            if (!isEqual) { throw new Error('Password is incorrect!'); }

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.SECRET_KEY,
                {expiresIn: '1h'}
            )

            return {userId: user._id, token, tokenExpiration: 1 };
        } catch (err) { throw new Error(`Can't login. ${err}`); }
    },
    createUser: async args => {
        const {email, password} = args.inputUser
        try {
            const existingUser = await User.findOne({email})
            if (existingUser) { throw new Error(`User already exists.`); }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email: email, password: hashedPassword})
            await user.save();

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.SECRET_KEY,
                {expiresIn: '1h'}
            )

            return {userId: user._id, token, tokenExpiration: 1}
        } catch (err) {
            throw new Error(`Can't create user. ${err}`)
        }
    }
}
