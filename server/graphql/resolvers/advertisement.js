const Boat = require("../../models/boat")
const {authenticated, authorization} = require("../../auth/auth");
const {transformBoat} = require("./merge");


module.exports = {
    advertisementsByShipowner: authenticated(authorization('shipowner')(async (_, {req}) => {
        try {
            const boats = await Boat.find({
                    $and: [
                        {shipowner: req.userId},
                        {advertisement: {$exists: true} }
                    ]
                }
            ).lean()
            return boats.map(transformBoat)
        } catch (err) {throw new Error(`Can't find shipowner advertisements. ${err}`) }
    }))
}
