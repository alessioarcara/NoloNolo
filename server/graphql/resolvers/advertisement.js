const Boat = require('../../models/boat');

module.exports = {
    publishAdvertisement: async (args, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
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
                    useFindAndModify: true
                }
            )

        } catch (err) { throw new Error(`Can't publish advertisement. ${err}`)}
    },
}
