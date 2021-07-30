const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: {
        type: String,
        required: [true, "Review can't be empty"]
    },
    rating: {
        type: Number,
        required: [true, 'Rating must have a number'],
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
})

module.exports = mongoose.model('Review', reviewSchema)
