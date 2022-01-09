const Boat = require('../../models/boat');
const Rental = require('../../models/rental');
const {transformReview} = require('./merge')
const {rentalNotFound, rentalNotYours, rentalNotClosed, isAlreadyPublished} = require("../../helpers/problemMessages");
const {authenticated} = require("../../auth/auth");

module.exports = {
    publishReview: authenticated(async (args, {req}) => {
        try {
            const {rentalId, body, rating} = args.inputReview;
            const rental = await Rental.findById(rentalId).lean()
            if (!rental) return {publishReviewProblem: rentalNotFound}
            if (!rental.customer.equals(req.userId)) return {publishReviewProblem: rentalNotYours}
            if (typeof rental.redeliveryDate === "undefined") return {publishReviewProblem: rentalNotClosed}

            const boat = await Boat.findOneAndUpdate(
                {
                    $and: [
                        {_id: rental.boat},
                        {reviews: { $not: { $elemMatch: {rental: rentalId, customer: req.userId } } } },
                    ]
                },
                {
                    $push: {
                        reviews: {
                            customer: req.userId,
                            rental: rental._id,
                            body,
                            rating,
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                },
            )
            if (!boat) return {publishReviewProblem: isAlreadyPublished}
            return {publishReviewData: transformReview(boat.reviews.toObject().slice(-1)[0], rental.boat)}
        } catch (err) {
            throw new Error(`Can't publish review. ${err}`)
        }
    })
}
