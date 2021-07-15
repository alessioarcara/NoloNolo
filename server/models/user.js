const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)
