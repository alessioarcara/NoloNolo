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
