const Rental = require('../../models/rental');
const Boat = require("../../models/boat");
const {transformRental} = require("./merge");
const {boatNotFound, rentalNotFound, invalidRange, alreadyRented, selectedRentDatesTooClose,
    isAlreadyStarted, yourBoat, rentalNotFinished
} = require("../../helpers/problemMessages");
const {authenticated, authorization} = require("../../auth/auth");
const {acquireLock, releaseLock} = require("../../helpers/lockHandlers")
const mongoose = require('mongoose');

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
            const rentals = await Rental.find({boat: boatId}).lean()
            return rentals.map(transformRental)
        } catch (err) { throw new Error(`Can't find boat rentals. ${err}`) }
    },
    rentalsByUser: authenticated(async (_, {req}) => {
        try {
            const rentals = await Rental.find({customer: req.userId}).lean()
            return rentals.map(transformRental)
        } catch (err) { throw new Error(`Can't find user rentals. ${err}`) }
    }),
    rentalsByShipowner: authenticated(authorization('shipowner')(async (_, {req}) => {
        try {
            const rentals = await Rental.aggregate([
                { $lookup: {
                    from: 'boats',
                    localField: 'boat',
                    foreignField: '_id',
                    as: 'boat'
                } },
                { $unwind: "$boat" },
                { $match: { "boat.shipowner": mongoose.Types.ObjectId(req.userId) }}
            ])
            return rentals.map(rental => transformRental({ ...rental, boat: rental.boat._id }))
        } catch (err) { throw new Error(`Can't find shipowner rentals. ${err}`) }
    })),
    rentBoat: authenticated(async (args, {req}) => {
        try {
            const {boatId} = args.inputRentBoat
            const from = new Date(args.inputRentBoat.from).setHours(0, 0, 0)
            const to = new Date(args.inputRentBoat.to).setHours(0, 0, 0)

            const boat = await Boat.findOne({_id: boatId}).lean()
            if (!boat) return { rentBoatProblem: boatNotFound }
            if (boat.shipowner.equals(req.userId)) return { rentBoatProblem: yourBoat }

            /* START SEMAPHORE */
            await acquireLock(boatId)

            const areInvalidSelectedDates = await validateRentDates(boatId, from, to)
            if (!areInvalidSelectedDates) {
                const rental = await Rental.create({
                    customer: req.userId,
                    boat: boatId,
                    dailyFee: boat.advertisement.dailyFee,
                    fixedFee: boat.advertisement.fixedFee,
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
    updateRental: authenticated(async (args, {req}) => {
        try {
            const {rentalId} = args.inputUpdateRental
            const from = new Date(args.inputUpdateRental.from).setHours(0, 0, 0)
            const to = new Date(args.inputUpdateRental.to).setHours(0, 0, 0)

            const rental = await Rental.findOne({
                $and: [
                    {_id: rentalId},
                    {customer: req.userId}
                ]
            }).populate('boat')
            if (!rental) return {updateRentalProblem: rentalNotFound}
            if (rental.from <= new Date()) return { updateRentalProblem: isAlreadyStarted }

            /* START SEMAPHORE */
            await acquireLock(rental.boat._id)

            const areInvalidSelectedDates = await validateRentDates(rental.boat._id, from, to)
            if (!areInvalidSelectedDates) {
                rental.fromDate = from;
                rental.toDate = to;
                rental.dailyFee = rental.boat.advertisement.dailyFee;
                rental.fixedFee = rental.boat.advertisement.fixedFee;

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
    recordBoatReturn: authenticated(authorization('shipowner')(async ({rentalId}, {req}) => {
        try {
            const rental = await Rental.findOne({
                $and: [
                    {_id: rentalId},
                    {customer: req.userId}
                ]
            });
            if (!rental) return {recordBoatReturnProblem: rentalNotFound}
            if (rental.toDate > new Date()) return {recordBoatReturnProblem: rentalNotFinished}

            /* TODO: Penalties */

            rental.redeliveryDate = new Date().setHours(0,0,0)
            await rental.save()

            return { recordBoatReturnData: transformRental(rental) }
        } catch (err) { throw new Error(`Can't close rental.`)}
    })),
    deleteRental: authenticated(async ({rentalId}, {req}) => {
        try {
            const rental = await Rental.findOne({
                $and: [
                    {_id: rentalId},
                    {customer: req.userId}
                ]
            }).lean()
            if (!rental) return { deleteRentalProblem: rentalNotFound }
            if (rental.fromDate <= new Date()) return { deleteRentalProblem: isAlreadyStarted }
            await Rental.deleteOne({_id: rental._id})
            return { deletedRentalId: rental._id }
        } catch (err) { throw new Error(`Can't delete rental. ${err}`)}
    }),
}
