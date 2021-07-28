const mongoose = require('mongoose')

const Schema = mongoose.Schema;

export const locationSchema = new Schema({
    geometry: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
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
