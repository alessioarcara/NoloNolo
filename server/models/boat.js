const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const advertisementSchema = require('./advertisement').schema;
const locationSchema = require('./location').schema;

const boatSchema = new Schema({
    shipowner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    yard: {
        type: String,
        required: [true, 'Please provide a yard']
    },
    model: {
        type: String,
        required: [true, 'Please provide a model']
    },
    length: {
        type: Number,
        required: [true, 'Please provide a length']
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
        // required: [true, 'Please provide a location']
    }
})

module.exports = mongoose.model('Boat', boatSchema)
