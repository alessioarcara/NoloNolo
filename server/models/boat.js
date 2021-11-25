const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const advertisementSchema = require('./advertisement').schema;
const locationSchema = require('./location').schema;
const reviewSchema = require('./review').schema

const boatSchema = new Schema({
    shipowner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    length: {
        type: String,
        required: [true, 'Please provide a length']
    },
    yard: {
        type: String,
        required: [true, 'Please provide a yard']
    },
    model: {
        type: String,
        required: [true, 'Please provide a model']
    },
    maximumCapacity: {
        type: Number,
        required: [true, 'Please provide a maximum capacity']
    },
    boatType: {
        type: String,
        enum : ['sailboat', 'motorboat', 'catamaran', 'dinghy']
    },
    advertisement: advertisementSchema,
    location: {
        type: locationSchema,
        required: [true, 'Please provide a location']
    },
    reviews: [reviewSchema]
})

module.exports = mongoose.model('Boat', boatSchema)
