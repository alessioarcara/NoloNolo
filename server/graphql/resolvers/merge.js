const DataLoader = require('dataloader')
const Boat = require("../../models/boat");

// const boats = new DataLoader(cities => {
//
// })


const transformBoat = boat => {
    return {
        ...boat._doc,
        hasAdvertisement: {
            ...boat._doc.advertisement._doc,
            dailyFee: parseFloat(boat.advertisement.dailyFee),
            fixedFee: parseFloat(boat.advertisement.fixedFee)
        },
        isDocked: boat.location
    }
}

exports.transformBoat = transformBoat;
