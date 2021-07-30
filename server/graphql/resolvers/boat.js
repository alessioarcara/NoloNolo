const Boat = require('../../models/boat');

module.exports = {
    boats: async args => {
        console.log(args.filter)
        const {where, skip, take} = args.filter
        try {
            const boats = await Boat
                    .find({ "location.city": { $regex: where, $options: "i" } } )
                    .skip(skip)
                    .limit(take);
            return boats.map(boat => {
                return {
                    ...boat._doc,
                    hasAdvertisement: {
                        ...boat._doc.advertisement._doc,
                        dailyFee: parseFloat(boat.advertisement.dailyFee),
                        fixedFee: parseFloat(boat.advertisement.fixedFee)
                    },
                    isDocked: boat.location
                }
            })
        } catch (err) { console.log(err)
            throw new Error(`Can't find boats. ${err}`) }
    },
    addBoat: async (args, {req}) => {
        const {yard, model, length, maximumCapacity, boatType, isDocked, publishAdvertisement} = args.inputBoat
        try {
            const boat = new Boat({
                    yard, model, length, maximumCapacity, boatType, shipowner: req.userId,
                    location: { ...isDocked},
                    advertisement: { ...publishAdvertisement }
                })

            await boat.save();
            return { addBoatData: { ...boat._doc, hasAdvertisement: boat.advertisement, isDocked: boat.location} }
        } catch (err) { throw new Error(`Can't add boat. ${err}`) }
        // if (!req.isAuth) { throw new Error("Unauthenticated.") }
    }
}
