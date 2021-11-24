const Boat = require('../../models/boat');
const {boatNotFound} = require("../../helpers/problemMessages");
const {transformBoat} = require("./merge");
const {authenticated} = require("../../helpers/authenticated-guard");

module.exports = {
    favorites: authenticated(async (_, {req}) => {
        try {
            const boats = await Boat.find({"advertisement.preferredBy": req.userId}).lean()
            return boats.map(transformBoat)
        } catch (err) { throw new Error(`Can't find favorites. ${err}`) }
    }),
    addFavorite: authenticated(async ({boatId}, {req}) => {
        try {
            const boat = await Boat.findOne({ _id: boatId } )
            if (!boat) { return { favoritesProblem: boatNotFound }}

            boat.advertisement.preferredBy.push(req.userId)
            await boat.save()

            return { favoritesData: transformBoat(boat.toObject())}
        } catch (err) { throw new Error(`Can't add favorite. ${err}`) }
    }),
    removeFavorite: authenticated(async ({boatId}, {req}) => {
        try {
            const boat = await Boat.findOne({_id: boatId})
            if (!boat) {return { favoritesProblem: boatNotFound} }

            boat.advertisement.preferredBy.pull(req.userId)
            await boat.save()

            return { favoritesData: transformBoat(boat.toObject())}
        } catch (err) { throw new Error(`Can't remove favorite. ${err}`) }
    })
}
