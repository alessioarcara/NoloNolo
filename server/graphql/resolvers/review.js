const Boat = require('../../models/boat');

module.exports = {
    publishReview: async ({boatId, body, rating}, {req}) => {
        try {
            req.userId = "61013cd2cbcb99c21fbe91e2"
            // const review = await Boat.findOneAndUpdate(
            //     { _id: boatId },
            //     { $push: { "advertisement.reviews": { customer: req.userId, body, rating } } },
            //     { new: true, runValidators: true }
            // )
            const review = await Boat.findOne({_id: boatId})
            const review2 = await Boat.findById(boatId)
            console.log(req.userId)

            console.log(review)
            console.log(review2)
            return { publishReviewData: {...review} }
        } catch (err) { `Can't publish review. ${err}`}
    }
}
// if (!req.isAuth) { throw new Error("Unauthenticated.") }

