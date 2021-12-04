const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const counterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
})

counterSchema.static('increment', async function (counterName) {
    const count = await this.findByIdAndUpdate(
        counterName,
        {$inc: {seq: 1}},
        {new: true, upsert: true, useFindAndModify: false},
    );
    return count.seq;
})

module.exports = mongoose.model('Counter', counterSchema)
