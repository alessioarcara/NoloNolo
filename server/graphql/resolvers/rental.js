const Rental = require('../../models/rental');
const Boat = require("../../models/boat");
const {transformRental} = require("./merge");
const {rangeDate} = require("../../helpers/utils");
const {boatNotFound, rentalNotFound, invalidRange, alreadyRented, SelectedRentDatesTooClose} = require("../../helpers/problemMessages");
const {authenticated} = require("../../helpers/authenticated-guard");

const checkRentDates = async (boatId, from, to) => {
    if (from <= new Date()) return SelectedRentDatesTooClose;
    if (from > to) return invalidRange;

    /* *----------------------------------------------*
     *                      |-- Date Range B --|      *
     * |-- Date Range A --|                           *
     *     (StartA <= EndB) and (EndA >= StartB)      *
     *------------------------------------------------*/
    const rentals = await Rental.find({
        $and: [{boat: boatId}, {fromDate: {$lte: to}}, {toDate: {$gte: from}}]
    })
    if (rentals.length > 0) return alreadyRented;
}

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
            const {boatId} = args.inputRentBoat
            const from = new Date(args.inputRentBoat.from)
            const to = new Date(args.inputRentBoat.to)

            const boat = await Boat.findOne({_id: boatId})
            if (!boat) return { rentBoatProblem: boatNotFound }

            const isInvalidRentDates = await checkRentDates(boatId, from, to)
            if (isInvalidRentDates) return { rentBoatProblem: isInvalidRentDates }

            const rental = new Rental({
                customer: req.userId,
                boat: boatId,
                totalAmount:
                    parseFloat(boat.advertisement.dailyFee) * rangeDate(from, to)
                    + parseFloat(boat.advertisement.fixedFee),
                fromDate: from,
                toDate: to
            })

            await rental.save();
            return { rentBoatData: transformRental(rental._doc) };
        } catch (err) { throw new Error(`Can't rent boat. ${err}`) }

    }),
    updateRental: authenticated(async (args) => {
        try {
            const {rentalId} = args.inputUpdateRental
            const from = new Date(args.inputUpdateRental.from)
            const to = new Date(args.inputUpdateRental.to)
            const rental = await Rental.findById(rentalId).populate('boat')
            if (!rental) return {updateRentalProblem: rentalNotFound}
            if (rental.from <= new Date()) return { updateRentalProblem: "Can't update started rentals!" }

            const isInvalidRentDates = checkRentDates(rental.boat._id, from, to)
            if (isInvalidRentDates) return { updateRentalProblem: isInvalidRentDates }

            rental.from = from;
            rental.to = to
            rental.totalAmount = parseFloat(rental.boat.advertisement.dailyFee) * rangeDate(from, to)
                + parseFloat(rental.boat.advertisement.fixedFee)

            await rental.save();
            return { rentBoatData: transformRental(rental._doc) };
        } catch (err) { throw new Error(`Can't update rental. ${err}`)}
    }),
    deleteRental: authenticated(async ({rentalId}) => {
        try {
            const rental = await Rental.findById(rentalId)
            if (!rental) return { deleteRentalProblem: rentalNotFound }
            if (rental.from <= new Date()) return { deleteRentalProblem: "Can't delete started rentals!" }
            await Rental.deleteOne({_id: rental})
            return { deleteRentalStatus: true }
        } catch (err) { throw new Error(`Can't delete rental. ${err}`)}
    }),
}
