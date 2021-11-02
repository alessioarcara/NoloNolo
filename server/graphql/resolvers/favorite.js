const Boat = require('../../models/boat');
const {boatNotFound} = require("../../helpers/problemMessages");
const {transformBoat} = require("./merge");

module.exports = {
    favorites: async (_, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
        try {
            const boats = await Boat.find({"advertisement.preferredBy": req.userId}).lean()
            return boats.map(transformBoat)
        } catch (err) { throw new Error(`Can't find favorites. ${err}`) }
    },
    addFavorite: async ({boatId}, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
        try {
            const boat = await Boat.findOne({ _id: boatId } )
            if (!boat) { return { favoritesProblem: boatNotFound }}

            boat.advertisement.preferredBy.push(req.userId)
            await boat.save()

            return { favoritesData: transformBoat(boat.toObject())}
        } catch (err) { throw new Error(`Can't add favorite. ${err}`) }
    },
    removeFavorite: async ({boatId}, {req}) => {
        if (!req.isAuth) { throw new Error("Unauthenticated.") }
        try {
            const boat = await Boat.findOne({_id: boatId})
            if (!boat) {return { favoritesProblem: boatNotFound} }

            boat.advertisement.preferredBy.pull(req.userId)
            await boat.save()

            return { favoritesData: transformBoat(boat.toObject())}
        } catch (err) { throw new Error(`Can't remove favorite. ${err}`) }
    }
}
