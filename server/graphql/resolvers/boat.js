const Boat = require('../../models/boat');
const {transformBoat} = require("./merge");
const Rental = require("../../models/rental");

module.exports = {
    boats: async ({filter, skip, take}) => {
        const {region, city, from, to, maxCapacity, boatTypes, minPrice, maxPrice} = filter

        let pipeline = [
            {$facet: {
                    "Boats": [
                        {$skip: skip},
                        {$limit: take}
                    ],
                    "Count": [
                        {$count: "count"}
                    ]
                }
            },
            {$unwind: "$Boats"},
            {$addFields: {"Boats.totalCount": { $arrayElemAt:["$Count.count", 0]}}},
            {$replaceRoot: {newRoot: "$Boats"}}
        ]

        if (city) {
            pipeline.unshift({$match: {"location.city": city }})
        } else {
            pipeline.unshift({$match: {"location.region": region }})
        }
        if (from && to) {
            const rentalsById = await Rental.find(
                {$and: [{fromDate: {$lte: to}}, {toDate: {$gte: from}}]},
                {boat: 1})

            const ids = rentalsById.map(item => item['boat'])
            pipeline.unshift({$match: {"_id": { $nin: ids}}})
        }
        if (maxCapacity) {
            pipeline.unshift({$match: {"maximumCapacity": {$gte: maxCapacity}}})
        }
        if (boatTypes) {
            pipeline.unshift({$match: {"boatType": { $in: boatTypes}}})
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
        } catch (err) {
            throw new Error(`Can't find boats. ${err}`)
        }
    },
    addBoat: async (args, {req}) => {
        const {yard, model, length, maximumCapacity, boatType, isDocked, publishAdvertisement} = args.inputBoat
        try {
            const boat = new Boat({
                yard, model, length, maximumCapacity, boatType, shipowner: req.userId,
                location: {...isDocked},
                advertisement: {...publishAdvertisement}
            })

            await boat.save();
            return {addBoatData: {...boat._doc, hasAdvertisement: boat.advertisement, isDocked: boat.location}}
        } catch (err) {
            throw new Error(`Can't add boat. ${err}`)
        }
        // if (!req.isAuth) { throw new Error("Unauthenticated.") }
    }
}
