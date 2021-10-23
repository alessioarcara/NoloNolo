const Boat = require('../../models/boat');

module.exports = {
    publishReview: async (args, {req}) => {
        const {boatId, body, rating} = args.inputReview;
        try {
            req.userId = "6101ba0e9edb920b862e8c46"
            const boat = await Boat.findOne({ _id: boatId } )
            console.log(boat.advertisement.reviews)
            boat.advertisement.reviews.push( { customer: req.userId, body, rating } )
            boat.save()

            if (!boat) { return { publishReviewProblem: "Boat is still active?" } }
            const review = boat.advertisement.reviews.slice(-1)[0]

            return { publishReviewData: { ...review._doc, creator: review.customer } }
        } catch (err) { `Can't publish review. ${err}` }
    }
}
// if (!req.isAuth) { throw new Error("Unauthenticated.") }

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
