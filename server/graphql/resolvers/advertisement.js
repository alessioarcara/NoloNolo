const Boat = require('../../models/boat');
const User = require('../../models/user');
const {transformBoat} = require("./merge");
const {boatNotFound} = require("../../helpers/problemMessages")
const {authenticated} = require("../../helpers/authenticated-guard");

module.exports = {
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

            return {publishAdvertisementData: transformBoat(boat)}
        } catch (err) { throw new Error(`Can't publish advertisement. ${err}`)}
    }),
}
