const DataLoader = require('dataloader')
const Boat = require("../../models/boat");

// const boats = new DataLoader(cities => {
//
// })


const transformBoat = boat => {
    return {
        ...boat,
        hasAdvertisement: {
            ...boat.advertisement,
            dailyFee: parseFloat(boat.advertisement.dailyFee),
            fixedFee: parseFloat(boat.advertisement.fixedFee)
        },
        isDocked: boat.location
    }
}

exports.transformBoat = transformBoat;
