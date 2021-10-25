const Boat = require('../../models/boat');
const {transformBoat} = require("./merge");

module.exports = {
    boats: async ({filter, skip, take}) => {
        const {where, minPrice, maxPrice} = filter

        let pipeline = [
            {$match: {"location.city": {$regex: `^${where}`, $options: "i"}}},
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

        // if (minPrice ,a) {
        //     pipeline.unshift({$match: {}})
        // }

        try {
            const boats = await Boat.aggregate(pipeline)
            console.log(boats)
            return boats.map(transformBoat)
        } catch (err) {
            console.log(err)
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
