const mongoose = require('mongoose')

const Schema = mongoose.Schema;

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
    bill: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please provide the billing information']
    }
}, { timestamps: true })

rentalSchema.pre('validate', (next) => {
    if (this.startDate > this.endDate) {
        this.invalidate('startDate', 'Start date must be less than end date.', this.startDate);
    }
    next();
});

module.exports = mongoose.model('Rental', rentalSchema)
