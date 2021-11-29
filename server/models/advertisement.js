const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const advertisementSchema = new Schema({
    preferredBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    dailyFee: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please provide a daily fee']
    },
    fixedFee: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please provide a fixed fee']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    images: [String],
})

module.exports = mongoose.model('Advertisement', advertisementSchema)
