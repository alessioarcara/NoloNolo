const DataLoader = require('dataloader');

const User = require('../../models/user');
const Boat = require('../../models/boat');
const {dateToString} = require("../../helpers/utils");


const userLoader = new DataLoader(userIds => {
    return User.find({_id: {$in: userIds}}).lean();
});

const boatLoader = new DataLoader(boatIds => {
    return Boat.find({_id: {$in: boatIds}}).lean();
});

const boat = async boatsId => {
    try {
        const boat = await boatLoader.load(boatsId.toString())
        boatLoader.clear(boatsId.toString())
        return transformBoat(boat);
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
    console.log(boat)
    return {
        ...boat,
        owner: user.bind(this, boat.shipowner),
        reviews: boat.reviews.map(transformReview),
        hasAdvertisement: boat.advertisement && {
            ...boat.advertisement,
            dailyFee: parseFloat(boat.advertisement.dailyFee),
            fixedFee: parseFloat(boat.advertisement.fixedFee),
        },
        isDocked: boat.location && {
            region: boat.location.region,
            city: boat.location.city,
            harbour: boat.location.harbour,
            coordinates: boat.location.geometry.coordinates
        },
        reviews: boat.reviews.map(transformReview),
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
        dailyFee: parseFloat(rental.dailyFee),
        fixedFee: parseFloat(rental.fixedFee),
        boat: boat.bind(this, rental.boat),
        createdAt: dateToString(rental.createdAt),
        updatedAt: dateToString(rental.updatedAt)
    }
}

const transformReview = review => {
    return {
        ...review,
        creator: user.bind(this, review.customer)
    }
}

exports.transformUser = transformUser;
exports.transformBoat = transformBoat;
exports.transformRental = transformRental;
exports.transformReview = transformReview;
