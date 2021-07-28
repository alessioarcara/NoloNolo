const mongoose = require('mongoose')
const {advertisementSchema} = require("./advertisement");
const {locationSchema} = require("./location");

const Schema = mongoose.Schema;

const boatSchema = new Schema({
    shipowner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    length: {
        type: String,
        required: true
    },
    yard: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    maximumCapacity: {
        type: Number,
        required: true
    },
    location: locationSchema,
    advertisement: advertisementSchema
})

module.exports = mongoose.model('Boat', boatSchema)
