const Rental = require('../../models/rental');
const Boat = require("../../models/boat");
const {transformRental} = require("./merge");
const {boatNotFound, rentalNotFound, invalidRange, alreadyRented, selectedRentDatesTooClose,
    isAlreadyStarted, itsYourBoat, rentalNotFinished
} = require("../../helpers/problemMessages");
const {authenticated, authorization} = require("../../auth/auth");
const {acquireLock, releaseLock} = require("../../helpers/lockHandlers")
const mongoose = require('mongoose');
const {startOfDay} = require("../../helpers/utils");

const validateRentDates = async (boatId, from, to, isUpdating) => {
    if (isUpdating && from <= new Date()) return selectedRentDatesTooClose;
    if (from >= to) return invalidRange;

    /* *----------------------------------------------*
     *                      |-- Date Range B --|      *
     * |-- Date Range A --|                           *
     *     (StartA <= EndB) and (EndA >= StartB)      *
     *------------------------------------------------*/
    const rentals = await Rental.find({
        $and: [{boat: boatId}, {fromDate: {$lte: to}}, {toDate: {$gte: from}}]
    }).lean()

    if (rentals.length > 0) return alreadyRented;
};
const rentalAtomicOperation = async (boatId, from, to, rentalWriteOperation, isUpdating = true) => {
    /* START SEMAPHORE */
    await acquireLock(boatId)
    /* READ */
    const areInvalidSelectedDates = await validateRentDates(boatId, from, to, isUpdating)

    if (!areInvalidSelectedDates) {
        /* WRITE */
        const rental = await rentalWriteOperation()
        /* END SEMAPHORE IF SUCCESSFUL */
        await releaseLock(boatId)
        return { rental };
    }

    /* END SEMAPHORE EVEN IF NOT SUCCESSFUL */
    await releaseLock(boatId)
    return {problem: areInvalidSelectedDates }
};


module.exports = {
    rentals: authenticated(authorization('admin')(async () => {
        try {
            const rentals = await Rental.find().lean()
            return rentals.map(transformRental)
        } catch (err) { throw new Error(`Can't find rentals. ${err}`)}
    })),
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
                { $match: { $and: [
                        {"boat.shipowner": mongoose.Types.ObjectId(req.userId)},
                        {"boat.advertisement": {$exists: true}}
                    ]
                } }
            ])
            return rentals.map(rental => transformRental({ ...rental, boat: rental.boat._id }))
        } catch (err) { throw new Error(`Can't find shipowner rentals. ${err}`) }
    })),
    rentBoat: authenticated(async (args, {req}) => {
        try {
            const {boatId} = args.inputRentBoat
            const from = startOfDay(args.inputRentBoat.from)
            const to = startOfDay(args.inputRentBoat.to)

            const boat = await Boat.findOne({_id: boatId}).lean()
            if (!boat) return { rentBoatProblem: boatNotFound }
            if (boat.shipowner.equals(req.userId)) return { rentBoatProblem: itsYourBoat }

            const {rental, problem} = await rentalAtomicOperation(boatId, from, to,() =>
                Rental.create({
                    customer: req.userId,
                    boat: boatId,
                    dailyFee: boat.advertisement.dailyFee,
                    fixedFee: boat.advertisement.fixedFee,
                    fromDate: from,
                    toDate: to
                })
            )

            return rental ?
                {rentBoatData: transformRental(rental._doc)} :
                { rentBoatProblem: problem }
        } catch (err) { throw new Error(`Can't rent boat. ${err}`) }
    }),
    updateRental: authenticated(async (args, {req}) => {
        try {
            const {rentalId} = args.inputUpdateRental
            const from = startOfDay(args.inputUpdateRental.from)
            const to = startOfDay(args.inputUpdateRental.to)

            const rental = await Rental.findOne({
                $and: [
                    {_id: rentalId},
                    {customer: req.userId}
                ]
            }).populate('boat')
            if (!rental) return { updateRentalProblem: rentalNotFound }
            if (rental.from <= new Date()) return { updateRentalProblem: isAlreadyStarted }

            const {problem} = await rentalAtomicOperation(rental.boat._id, from, to,() => {
                rental.fromDate = from;
                rental.toDate = to;
                rental.dailyFee = rental.boat.advertisement.dailyFee;
                rental.fixedFee = rental.boat.advertisement.fixedFee;
                rental.save();
            })

            return problem ?
                { updateRentalProblem: problem } :
                { updateRentalData: transformRental({...rental._doc, boat: rental.boat._id}) }
        } catch (err) { throw new Error(`Can't update rental. ${err}`)}
    }),
    backdateRental: authenticated(authorization('admin')(async (args) => {
        try {
            const {rentalId} = args.inputUpdateRental
            const from = startOfDay(args.inputUpdateRental.from)
            const to = startOfDay(args.inputUpdateRental.to)

            const rental = await Rental.findById(rentalId).populate('boat')
            if (!rental) return { backdateRentalProblem: rentalNotFound }

            const {problem} = await rentalAtomicOperation(rental.boat._id, from, to,() => {
                rental.fromDate = from;
                rental.toDate = to;
                rental.save();
            }, false)

            return problem ?
                { backdateRentalProblem: problem } :
                { backdateRentalData: transformRental({...rental._doc, boat: rental.boat._id}) }
        } catch(err)  { throw new Error(`Can't update rental. ${err}`)}
    })),
    recordBoatReturn: authenticated(authorization('shipowner')(async ({rentalId}) => {
        try {
            const rental = await Rental.findOne({
                $and: [
                    {_id: rentalId},
                    {redeliveryDate: {$exists: false}}
                ]
            });
            if (!rental) return {recordBoatReturnProblem: rentalNotFound}
            if (rental.toDate > new Date()) return {recordBoatReturnProblem: rentalNotFinished}

            rental.redeliveryDate = new Date().setUTCHours(0,0,0)
            await rental.save()

            return { recordBoatReturnData: transformRental(rental._doc) }
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
};
