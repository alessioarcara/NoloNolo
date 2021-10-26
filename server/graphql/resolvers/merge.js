const {dateToString} = require("../../helpers/date");

const transformBoat = boat => {
    return {
        ...boat,
        hasAdvertisement: {
            ...boat.advertisement,
            dailyFee: parseFloat(boat.advertisement.dailyFee),
            fixedFee: parseFloat(boat.advertisement.fixedFee)
        },
        isDocked: boat.location,
        totalCount: boat.totalCount,
        minPrice: parseFloat(boat.minPrice),
        maxPrice: parseFloat(boat.maxPrice)
    }
}

const transformRental = rental => {
    return {
        ...rental._doc,
        from: dateToString(rental._doc.fromDate),
        to: dateToString(rental._doc.toDate)
    }
}

exports.transformBoat = transformBoat;
exports.transformRental = transformRental;
