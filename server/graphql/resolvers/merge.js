const DataLoader = require('dataloader');

const User = require('../../models/user');
const {dateToString} = require("../../helpers/date");

const userLoader = new DataLoader(userIds => {
    return User.find({_id: {$in: userIds}});
});

const user = async userId => {
    try {
        return await userLoader.load(userId.toString());
    } catch (err) {
        throw err
    }
}

const transformBoat = boat => {
    return {
        ...boat,
        owner: user.bind(this, boat.shipowner),
        hasAdvertisement: {
            ...boat.advertisement,
            dailyFee: parseFloat(boat.advertisement.dailyFee),
            fixedFee: parseFloat(boat.advertisement.fixedFee),
            reviews: boat.advertisement.reviews.map(review => {
                return {
                    ...review,
                    creator: user.bind(this, review.customer),
                }
            })
        },
        isDocked: {
            ...boat.location,
            coordinates: boat.location.geometry.coordinates
        },
        totalCount: boat.totalCount,
        minPrice: parseFloat(boat.minPrice),
        maxPrice: parseFloat(boat.maxPrice)
    }
}

const transformRental = rental => {
    return {
        ...rental,
        customer: user.bind(this, rental),
        from: dateToString(rental.fromDate),
        to: dateToString(rental.toDate),
        bill: parseFloat(rental.bill)
    }
}

// customer: User!
//     boat: Boat!


exports.transformBoat = transformBoat;
exports.transformRental = transformRental;
