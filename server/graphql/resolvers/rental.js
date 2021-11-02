const Rental = require('../../models/rental');
const Boat = require("../../models/boat");
const {transformRental} = require("./merge");
const {dateToString} = require("../../helpers/date");
const {boatNotFound} = require("../../helpers/problemMessages");
const {Error} = require("mongoose");

module.exports = {
    boatRentals: async ({boatId}) => {
        try {
            const rentals = await Rental.find({boat: boatId})
            return rentals.map(transformRental)
        } catch (err) { throw new Error(`Can't find rentals. ${err}`) }
    },
    rentBoat: async (args, {req}) => {
        // if (!req.isAuth) { throw new Error("Unauthenticated.") }
        req.userId = "6101ba0e9edb920b862e8c46"
        const {boatId, from, to, bill} = args.inputRental

        try {
            const boat = await Boat.findOne({_id: "61095452d94d352989a19da0"})
            if (!boat) {
                return {rentBoatProblem: boatNotFound}
            }

            if (dateToString(from) > dateToString(to)) {
                return {rentBoatProblem: "End date must be greater than start date"}
            }

            /* *----------------------------------------------*
             *                      |-- Date Range B --|      *
             * |-- Date Range A --|                           *
             *     (StartA <= EndB) and (EndA >= StartB)      *
             *------------------------------------------------*/
            const rentals = await Rental.find({
                $and: [{boat: "61095452d94d352989a19da0"}, {fromDate: {$lte: to}}, {toDate: {$gte: from}}]
            })

            if (rentals.length > 0) {
                return {rentBoatProblem: "Already rented for these dates."}
            }

            const rental = new Rental({
                customer: req.userId,
                boat,
                bill,
                fromDate: new Date(from),
                toDate: new Date(to)
            })

            const result = await rental.save();
            return {rentBoatData: result};
        } catch (err) { throw new Error(`Can't rent boat. ${err}`) }
    }
}
