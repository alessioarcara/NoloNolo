const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Counter = require('./counter')

const rentalSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    boat: {
        type: Schema.Types.ObjectId,
        ref: 'Boat'
    },
    fromDate: {
        type: Date,
        required: [true, 'Please provide start date rental']
    },
    toDate: {
        type: Date,
        required: [true, 'Please provide end date rental']
    },
    redeliveryDate: Date,
    totalAmount: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please provide the total amount']
    },
    billNumber: {
        type: String
    },
}, { timestamps: true })

rentalSchema.pre('save', async function (next) {
    if (!this.isNew) { next(); }

    this.billNumber = await Counter.increment('billNumber');
    next();
});
rentalSchema.pre('validate', (next) => {
    if (this.startDate > this.endDate) {
        this.invalidate('startDate', 'Start date must be less than end date.', this.startDate);
    }
    next();
});

module.exports = mongoose.model('Rental', rentalSchema)
