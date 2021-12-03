const Boat = require('../../models/boat');
const User = require('../../models/user');
const Rental = require("../../models/rental");
const {transformBoat} = require("./merge");
const {boatNotFound} = require("../../helpers/problemMessages")
const {authenticated, authorization} = require("../../auth/auth");

module.exports = {
    advertisement: async ({boatId}) => {
        try {
            const boat = await Boat.findOne({
                $and: [
                    {_id: boatId},
                    {"advertisement": {$exists: true}}
                ]
            }).lean()
            return transformBoat(boat)
        } catch (err) {throw new Error(`Can't find boat. ${err}`)}
    },
    advertisements: async ({filter, skip, take}) => {
        const {region, city, from, to, minCapacity, boatTypes, minPrice, maxPrice} = filter

        let pipeline = [
            {$match: {"advertisement": {$exists: true}}},
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
                {boat: 1}).lean()

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
        } catch (err) {throw new Error(`Can't find boats. ${err}`)}
    },
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

            return {publishAdvertisementData: transformBoat(boat._doc)}
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
