const Rental = require('../../models/rental');
const Boat = require("../../models/boat");
const {transformRental} = require("./merge");
const {rangeDate} = require("../../helpers/utils");
const {boatNotFound, rentalNotFound, invalidRange, alreadyRented, selectedRentDatesTooClose, isAlreadyStarted} = require("../../helpers/problemMessages");
const {authenticated} = require("../../helpers/authenticated-guard");
const {acquireLock, releaseLock} = require("../../helpers/lockHandlers")

const validateRentDates = async (boatId, from, to) => {
    if (from <= new Date()) return selectedRentDatesTooClose;
    if (from >= to) return invalidRange;

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
            const rentals = await Rental.find({boat: boatId})
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
            const from = new Date(args.inputRentBoat.from).setHours(0, 0, 0)
            const to = new Date(args.inputRentBoat.to).setHours(0, 0, 0)

            const boat = await Boat.findOne({_id: boatId})
            if (!boat) return { rentBoatProblem: boatNotFound }

            /* START SEMAPHORE */
            await acquireLock(boatId)

            const areInvalidSelectedDates = await validateRentDates(boatId, from, to)
            if (!areInvalidSelectedDates) {
                const rental = await Rental.create({
                    customer: req.userId,
                    boat: boatId,
                    totalAmount:
                        parseFloat(boat.advertisement.dailyFee) * rangeDate(from, to)
                        + parseFloat(boat.advertisement.fixedFee),
                    fromDate: from,
                    toDate: to
                })

                /* END SEMAPHORE IF SUCCESSFUL */
                await releaseLock(boatId)
                return { rentBoatData: transformRental(rental._doc) };
            }

            /* END SEMAPHORE EVEN IF NOT SUCCESSFUL */
            await releaseLock(boatId)
            return { rentBoatProblem: areInvalidSelectedDates}

        } catch (err) { throw new Error(`Can't rent boat. ${err}`) }
    }),
    updateRental: authenticated(async (args) => {
        try {
            const {rentalId} = args.inputUpdateRental
            const from = new Date(args.inputUpdateRental.from).setHours(0, 0, 0)
            const to = new Date(args.inputUpdateRental.to).setHours(0, 0, 0)

            const rental = await Rental.findById(rentalId).populate('boat')
            if (!rental) return {updateRentalProblem: rentalNotFound}
            if (rental.from <= new Date()) return { updateRentalProblem: isAlreadyStarted }

            /* START SEMAPHORE */
            await acquireLock(rental.boat._id)

            const areInvalidSelectedDates = await validateRentDates(rental.boat._id, from, to)
            if (!areInvalidSelectedDates) {
                rental.fromDate = from;
                rental.toDate = to
                rental.totalAmount = parseFloat(rental.boat.advertisement.dailyFee) * rangeDate(from, to)
                    + parseFloat(rental.boat.advertisement.fixedFee)

                await rental.save();

                /* END SEMAPHORE IF SUCCESSFUL */
                await releaseLock(rental.boat._id)
                return { updateRentalData: transformRental({...rental._doc, boat: rental.boat._id})};
            }

            /* END SEMAPHORE EVEN IF NOT SUCCESSFUL */
            await releaseLock(rental.boat._id)
            return { updateRentalProblem: areInvalidSelectedDates }
        } catch (err) { throw new Error(`Can't update rental. ${err}`)}
    }),
    deleteRental: authenticated(async ({rentalId}) => {
        try {
            const rental = await Rental.findById(rentalId)
            if (!rental) return { deleteRentalProblem: rentalNotFound }
            if (rental.from <= new Date()) return { deleteRentalProblem: isAlreadyStarted }
            await Rental.deleteOne({_id: rental._id})
            return { deletedRentalId: rental._id }
        } catch (err) { throw new Error(`Can't delete rental. ${err}`)}
    }),
}
