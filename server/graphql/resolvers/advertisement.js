const Boat = require("../../models/boat")
const {authenticated, authorization} = require("../../auth/auth");
const {transformBoat} = require("./merge");
const Rental = require("../../models/rental");
const {boatNotFound} = require("../../helpers/problemMessages")

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
