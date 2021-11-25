const Boat = require("../../models/boat")
const {authenticated, authorization} = require("../../auth/auth");
const {transformBoat} = require("./merge");
const Rental = require("../../models/rental");

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
    withdrawAdvertisement: authenticated(authorization('shipowner')(async ({boatId}) => {
        try {
            const boat = await Boat.findByIdAndUpdate(boatId, {$unset: {'advertisement': 1} } )
            await Rental.deleteMany({
                $and: [
                    {boat: boatId},
                    {fromDate: { $gt: new Date() } }
                ]
            })
            return {withdrawnAdvertisementId: boat._id}
        } catch (err) {throw new Error(`Can't withdraw advertisement. ${err}`)}
    })),
}
