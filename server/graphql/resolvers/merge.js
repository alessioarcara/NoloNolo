const DataLoader = require('dataloader');

const User = require('../../models/user');
const Boat = require('../../models/boat');
const {dateToString} = require("../../helpers/utils");


const userLoader = new DataLoader(userIds => {
    return User.find({_id: {$in: userIds}});
});

const boatLoader = new DataLoader(boatIds => {
    return Boat.find({_id: {$in: boatIds}})
});

const boat = async boatsId => {
    try {
        const boat = await boatLoader.load(boatsId.toString())
        return transformBoat(boat._doc);
    } catch (err) {throw err}
}

const user = async userId => {
    try {
        return await userLoader.load(userId.toString());
    } catch (err) {
        throw err
    }
}

const transformUser = user => {
    return {
        ...user,
        email: user.email,
        userType: user.userType,
        address: {
            ...user.address
        },
        avatar: user.avatar,
        createdAt: dateToString(user.createdAt)
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
            region: boat.location.region,
            city: boat.location.city,
            harbour: boat.location.harbour,
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
        customer: user.bind(this, rental.customer),
        from: dateToString(rental.fromDate),
        to: dateToString(rental.toDate),
        totalAmount: parseFloat(rental.totalAmount),
        boat: boat.bind(this, rental.boat),
        createdAt: dateToString(rental.createdAt),
        updatedAt: dateToString(rental.updatedAt)
    }
}

exports.transformUser = transformUser;
exports.transformBoat = transformBoat;
exports.transformRental = transformRental;
