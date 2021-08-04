const Boat = require('../../models/boat');
const {transformBoat} = require("./merge");

module.exports = {
    boats: async args => {
        const {where, skip, take} = args.filter
        try {
            const boats = await Boat.aggregate([
                {$facet: {
                        "Boats": [
                            {$match: {"location.city": {$regex: `^${where}`, $options: "i"}}},
                            {$skip: skip},
                            {$limit: take}
                        ],
                        "Count": [
                            {$count: "count"}
                        ]
                    }
                },
                {$unwind: "$Boats"},
                {$addFields: {"Boats.Total": { $arrayElemAt:["$Count.count", 0]}}},
                {$replaceRoot: {newRoot: "$Boats"}}
            ])
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
