const Boat = require('../../models/boat');
const {transformBoat} = require("./merge");
const Rental = require("../../models/rental");
const mongoose = require('mongoose');
const {boatNotFound, boatWithRentals} = require("../../helpers/problemMessages")

module.exports = {
    boat: async ({boatId}) => {
        try {
            const boat = await Boat.findById(boatId).lean()
            return transformBoat(boat)
        } catch (err) { throw new Error(`Can't find boat. ${err}`) }
    },
    boats: async ({filter, skip, take}) => {
        const {region, city, from, to, minCapacity, boatTypes, minPrice, maxPrice} = filter

        let pipeline = [
            { $match: {"advertisement": {$exists: true} } },
            {
                $facet: {
                    "Boats": [
                        {$skip: skip},
                        {$limit: take}
                    ],
                    "Count": [
                        {$count: "count"}
                    ],
                    "MinPrice": [
                        {
                            $group:
                                {
                                    "_id": null,
                                    "minPrice": {$min: "$advertisement.dailyFee"},
                                    "maxPrice": {$max: "$advertisement.dailyFee"}
                                }
                        }
                    ],
                }
            },
            {$unwind: "$Boats"},
            {
                $addFields: {
                    "Boats.totalCount": {$arrayElemAt: ["$Count.count", 0]},
                    "Boats.minPrice": {$arrayElemAt: ["$MinPrice.minPrice", 0]},
                    "Boats.maxPrice": {$arrayElemAt: ["$MinPrice.maxPrice", 0]}
                }
            },
            {$replaceRoot: {newRoot: "$Boats"}}
        ]

        if (city) {
            pipeline.unshift({$match: {"location.city": city}})
        } else {
            pipeline.unshift({$match: {"location.region": region}})
        }
        if (from && to) {
            const rentalsById = await Rental.find(
                {$and: [{fromDate: {$lte: to}}, {toDate: {$gte: from}}]},
                {boat: 1})

            const ids = rentalsById.map(item => item['boat'])
            pipeline.unshift({$match: {"_id": {$nin: ids}}})
        }
        if (minCapacity) {
            pipeline.unshift({$match: {"maximumCapacity": {$gte: minCapacity}}})
        }
        if (boatTypes) {
            pipeline.unshift({$match: {"boatType": {$in: boatTypes}}})
        }
        if (minPrice) {
            pipeline.unshift({$match: {"advertisement.dailyFee": {$gte: minPrice}}})
        }
        if (maxPrice) {
            pipeline.unshift({$match: {"advertisement.dailyFee": {$lte: maxPrice}}})
        }

        try {
            const boats = await Boat.aggregate(pipeline)
            return boats.map(transformBoat)
        } catch (err) { throw new Error(`Can't find boats. ${err}`) }
    },
    boatsByUser: async (args, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
        try {
            const boats = await Boat.find({
                $and: [
                    {shipowner: req.userId},
                    {$or: [
                            {advertisement: { $exists: false } },
                            {location: { $exists: false } }
                        ]
                    }
                ]
            }).lean()
            return boats.map(transformBoat)
        } catch (err) { throw new Error(`Can't find boats. ${err}`)}
    },
    addBoat: async (args, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
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
            ).lean()

            return {addBoatData: transformBoat(boat)}
        } catch (err) { throw new Error(`Can't add boat. ${err}`) }
    },
    removeBoat: async ({boatId}, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
        try {
            const rentals = Rental.find({boat: boatId}).lean()
            if (rentals) return { removeBoatProblem: boatWithRentals}

            const {deletedCount} = await Boat.deleteOne({_id: boatId})
            return deletedCount === 0 ? { removeBoatProblem: boatNotFound} : { removedBoatId: boatId}
        } catch (err) { throw new Error(`Can't remove boat. ${err}`)}
    },
    insertBoatLocation: async (args, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated") }
        try {
            const {boatId, isDocked} = args.inputInsertBoatLocation

            const boat = await Boat.findByIdAndUpdate(
                boatId,
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
            ).lean();
            return {insertBoatLocationData: transformBoat(boat)}
        } catch (err) { throw new Error(`Can't insert boat location. ${err}`)}
    }
}
