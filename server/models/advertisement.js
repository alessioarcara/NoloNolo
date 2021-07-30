const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = require('./review').schema

const advertisementSchema = new Schema({
    preferredBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    fixedFee: {
      type: mongoose.Types.Decimal128,
      required: [true, 'Please provide a fixed fee']
    },
    dailyFee: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please provide a daily fee']
    },
    images: [String],
    reviews: [reviewSchema]
})

module.exports = mongoose.model('Advertisement', advertisementSchema)
