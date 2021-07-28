import {reviewSchema} from "./review";

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

export const advertisementSchema = new Schema({
    preferredBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    fixedFee: {
      type: Number,
      required: [true, 'Please provide a fixed fee']
    },
    dailyFee: {
        type: Number,
        required: [true, 'Please provide a daily fee']
    },
    images: [String],
    reviews: [reviewSchema]
})
