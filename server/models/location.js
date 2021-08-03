const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    geometry: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
    },
    region: {
      type: String,
      required: [true, 'Please provide a region']
    },
    city: {
        type: String,
        required: [true, 'Please provide a city']
    },
    harbour: {
        type: String,
        required: [true, 'Please provide harbour']
    },
})

module.exports = mongoose.model('Location', locationSchema)

