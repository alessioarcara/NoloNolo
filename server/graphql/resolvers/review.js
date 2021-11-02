const Boat = require('../../models/boat');
const {boatNotFound} = require("../../helpers/problemMessages");

module.exports = {
    publishReview: async (args, {req}) => {
        // if (!req.isAuth) { throw new Error("Unauthenticated.") }
        const {boatId, body, rating} = args.inputReview;
        try {
            req.userId = "6101517c380b91c517a31039"
            const boat = await Boat.findOne({ _id: boatId } )
            if (!boat) { return { publishReviewProblem: boatNotFound } }

            boat.advertisement.reviews.push( { customer: req.userId, body, rating } )
            await boat.save()

            const review = boat.advertisement.reviews.slice(-1)[0]

            return { publishReviewData: { ...review._doc, creator: review.customer } }
        } catch (err) { `Can't publish review. ${err}` }
    }
}

// const review = await Boat.findOneAndUpdate(
//     { _id: boatId },
//     { $push: { "advertisement.reviews": { customer: req.userId, body, rating } } },
//     { new: true, runValidators: true,
//         projection: { "advertisement.reviews": {$slice: -1} }
//     }
// )

// req.userId = "6101ba0e9edb920b862e8c46"
// const boat = await Boat.findOneAndUpdate(
//     { _id: boatId },
//     { $push: { "advertisement.reviews": { customer: req.userId, body, rating } } },
//     { new: true, runValidators: true, useFindAndModify: false } )
