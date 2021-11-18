const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const lockSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: { unique: true }
    },
    timestamp: Number
})

module.exports = mongoose.model('Lock', lockSchema)
