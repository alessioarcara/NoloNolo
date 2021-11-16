const Rental = require('../../models/rental');
const Boat = require("../../models/boat");
const {transformRental} = require("./merge");
const {rangeDate} = require("../../helpers/utils");
const {boatNotFound, rentalNotFound} = require("../../helpers/problemMessages");
const {Error} = require("mongoose");
const {authenticated} = require("../../helpers/authenticated-guard");

module.exports = {
    boatRentals: async ({boatId}) => {
        try {
            console.log(boatId)
            const rentals = await Rental.find({boat: boatId})
            console.log(rentals)
            return rentals.map(transformRental)
        } catch (err) { throw new Error(`Can't find boat rentals. ${err}`) }
    },
    rentalsByUser: authenticated(async (_, {req}) => {
        try {
            const rentals = await Rental.find({customer: req.userId}).lean()
            return rentals.map(transformRental)
        } catch (err) { throw new Error(`Can't find user rentals. ${err}`) }
    }),
    rentBoat: authenticated(async (args, {req}) => {
        try {
            const {boatId} = args.inputRental
            const from = new Date(args.inputRental.from)
            const to = new Date(args.inputRental.to)

            const boat = await Boat.findOne({_id: boatId})
            if (!boat) return { rentBoatProblem: boatNotFound }
            if (from < new Date() ) return { rentBoatProblem: "You can't rent something in the past"}
            if (from > to) return {rentBoatProblem: "End date must be greater than start date"}

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
                totalAmount:
                    parseFloat(boat.advertisement.dailyFee) * rangeDate(from, to)
                    + parseFloat(boat.advertisement.fixedFee),
                fromDate: from,
                toDate: to
            })

            const result = await rental.save();
            return { rentBoatData: transformRental(result._doc) };
        } catch (err) { throw new Error(`Can't rent boat. ${err}`) }

    }),
    updateRental: authenticated(async (args, {req}) => {
        try {
            //TODO: SOLO SE FUTURO FINO AL GIORNO PRIMA
            const {rentalId, from, to} = args.inputRental
            const rental = await Rental.findById(rentalId)
        } catch (err) { throw new Error(`Can't update rental. ${err}`)}
    }),
    deleteRental: authenticated(async ({rentalId}) => {
        try {
            const rental = await Rental.findById(rentalId)
            if (!rental) return { deleteRentalProblem: rentalNotFound }
            if (new Date() >= rental.from) return { deleteRentalProblem: "Can't delete past rentals!" }
            await Rental.deleteOne({_id: rental})
            return { deleteRentalStatus: true }
        } catch (err) { throw new Error(`Can't delete rental. ${err}`)}
    }),
}
