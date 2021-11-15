const Rental = require('../../models/rental');
const Boat = require("../../models/boat");
const {transformRental} = require("./merge");
const {dateToString} = require("../../helpers/utils");
const {boatNotFound} = require("../../helpers/problemMessages");
const {Error} = require("mongoose");
const {authenticated} = require("../../helpers/authenticated-guard");

module.exports = {
    boatRentals: async ({boatId}) => {
        try {
            const rentals = await Rental.find({boat: boatId})
            return rentals.map(transformRental)
        } catch (err) { throw new Error(`Can't find boat rentals. ${err}`) }
    },
    rentalsByUser: authenticated(async (_, {req}) => {
        try {
            const rentals = await Rental.find({customer: req.userId})
            return rentals.map(transformRental)
        } catch (err) { throw new Error(`Can't find user rentals. ${err}`) }
    }),
    rentBoat: authenticated(async (args, {req}) => {
        const {boatId, from, to, totalAmount} = args.inputRental
        try {
            const boat = await Boat.findOne({_id: boatId})
            if (!boat) {return {rentBoatProblem: boatNotFound}}

            if (dateToString(from) > dateToString(to)) {
                return {rentBoatProblem: "End date must be greater than start date"}
            }

            /* *----------------------------------------------*
             *                      |-- Date Range B --|      *
             * |-- Date Range A --|                           *
             *     (StartA <= EndB) and (EndA >= StartB)      *
             *------------------------------------------------*/
            const rentals = await Rental.find({
                $and: [{boat: boatId}, {fromDate: {$lte: to}}, {toDate: {$gte: from}}]
                })

            if (rentals.length > 0) {return {rentBoatProblem: "Already rented for these dates."}}

            const rental = new Rental({
                customer: req.userId,
                boat: boatId,
                totalAmount,
                fromDate: new Date(from),
                toDate: new Date(to)
            })

            const result = await rental.save();
            return { rentBoatData: transformRental(result._doc) };
        } catch (err) { throw new Error(`Can't rent boat. ${err}`) }
    })
}
