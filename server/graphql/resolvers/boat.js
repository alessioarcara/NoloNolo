const Boat = require('../../models/boat');
const {transformBoat} = require("./merge");
const Rental = require("../../models/rental");
const mongoose = require('mongoose');
const {boatNotFound, boatWithRentals} = require("../../helpers/problemMessages")
const {authenticated} = require("../../auth/auth");

module.exports = {
    boatsByUser: authenticated(async (args, {req}) => {
        try {
            const boats = await Boat.find({
                $and: [
                    {shipowner: req.userId},
                    {
                        $or: [
                            {advertisement: {$exists: false}},
                            {location: {$exists: false}}
                        ]
                    }
                ]
            }).lean()
            return boats.map(transformBoat)
        } catch (err) {throw new Error(`Can't find boats. ${err}`)}
    }),
    addBoat: authenticated(async (args, {req}) => {
        try {
            const {yard, model, length, maximumCapacity, boatType} = args.inputBoat
            const _id = typeof args.inputBoat._id === "undefined" ? new mongoose.Types.ObjectId() : args.inputBoat._id

            const boat = await Boat.findOneAndUpdate(
                {_id},
                {
                    yard,
                    model,
                    length,
                    maximumCapacity,
                    boatType,
                    shipowner: req.userId
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                    setDefaultsOnInsert: false,
                    useFindAndModify: false
                }
            )
            return {addBoatData: transformBoat(boat.toObject())}
        } catch (err) {throw new Error(`Can't add boat. ${err}`)}
    }),
    removeBoat: authenticated(async ({boatId}, {req}) => {
        try {
            const rentals = await Rental.find({boat: boatId}).lean()
            if (rentals.length > 0) return {removeBoatProblem: boatWithRentals}

            const {deletedCount} = await Boat.deleteOne(
                {
                    $and: [
                        {_id: boatId},
                        {shipowner: req.userId}
                    ]
                }
            )
            return deletedCount === 0 ? {removeBoatProblem: boatNotFound} : {removedBoatId: boatId}
        } catch (err) {throw new Error(`Can't remove boat. ${err}`)}
    }),
    insertBoatLocation: authenticated(async (args, {req}) => {
        try {
            const {boatId, isDocked} = args.inputInsertBoatLocation
            const boat = await Boat.findOneAndUpdate(
                {
                    $and: [
                        {_id: boatId},
                        {shipowner: req.userId}
                    ]
                },
                {
                    location: {
                        ...isDocked,
                        geometry: {
                            coordinates: [isDocked.longitude, isDocked.latitude]
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                }
            );
            return boat ?
                {insertBoatLocationProblem: boatNotFound} : {insertBoatLocationData: transformBoat(boat.toObject())}
        } catch (err) {throw new Error(`Can't insert boat location. ${err}`)}
    })
}
