const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email!'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8
    },
    count: {
        type: Number,
        default: 0
    },
    avatar: String,
    address: {
        street: String,
        city: String,
        region: String,
        postalCode: Number
    },
    userType: {
        type: String,
        enum : ['customer', 'shipowner', 'admin'],
        default: 'customer'
    }
})

module.exports = mongoose.model('User', userSchema)
