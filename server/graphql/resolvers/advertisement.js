const Boat = require('../../models/boat');
const User = require('../../models/user');
const Rental = require("../../models/rental");
const {transformBoat} = require("./merge");
const {boatNotFound} = require("../../helpers/problemMessages")
const {authenticated} = require("../../helpers/authenticated-guard");

module.exports = {
    advertisementsByShipowner: authenticated(authorization('shipowner')(async (_, {req}) => {
        try {
            const boats = await Boat.find({
                    $and: [
                        {shipowner: req.userId},
                        {advertisement: {$exists: true}}
                    ]
                }
            ).lean()
            return boats.map(transformBoat)
        } catch (err) {throw new Error(`Can't find shipowner advertisements. ${err}`)}
    })),
    publishAdvertisement: authenticated(async (args, {req}) => {
        try {
            const {boatId, publishAdvertisement} = args.inputPublishAdvertisement

            const boat = await Boat.findByIdAndUpdate(
                boatId,
                {
                    advertisement: {
                        ...publishAdvertisement
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                }
            )

            if (!boat) return {publishAdvertisementProblem: boatNotFound}
            const user = await User.findById(req.userId)

            user.userType = 'shipowner'
            user.save()

            return {publishAdvertisementData: transformBoat(boat)}
        } catch (err) { throw new Error(`Can't publish advertisement. ${err}`)}
    }),
    withdrawAdvertisement: authenticated(authorization('shipowner')(async ({boatId}, {req}) => {
        try {
            const {modifiedCount} = await Boat.updateOne(
                {
                    $and: [
                        {_id: boatId},
                        {shipowner: req.userId}
                    ]
                },
                {$unset: {'advertisement': 1}}
            )
            if (modifiedCount === 0) return {withdrawAdvertisementProblem: boatNotFound}
            await Rental.deleteMany({
                $and: [
                    {boat: boatId},
                    {fromDate: {$gt: new Date()}}
                ]
            })
            return {withdrawnAdvertisementId: boatId}
        } catch (err) {throw new Error(`Can't withdraw advertisement. ${err}`)}
    })),
}
