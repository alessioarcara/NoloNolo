const Boat = require('../../models/boat');
const {transformBoat} = require("./merge");
const Rental = require("../../models/rental");

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
    addBoat: async (args, {req}) => {
        req.userId = "61013cd2cbcb99c21fbe91e2"
        // if (!req.isAuth) { throw new Error("Unauthenticated.") }
        const {yard, model, length, maximumCapacity, boatType, isDocked, publishAdvertisement} = args.inputBoat
        try {
            const boat = new Boat({
                yard, model, length, maximumCapacity, boatType, shipowner: req.userId,
                location: {
                    ...isDocked,
                    geometry: {
                        coordinates: [isDocked.longitude, isDocked.latitude]
                    }
                },
                advertisement: {...publishAdvertisement}
            })
            await boat.save();
            return {addBoatData: transformBoat(boat._doc)}
        } catch (err) { throw new Error(`Can't add boat. ${err}`) }
    }
}
