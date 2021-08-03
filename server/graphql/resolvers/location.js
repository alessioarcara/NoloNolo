const Boat = require('../../models/boat');
const {transformBoat} = require("./merge");
const DataLoader = require("dataloader");

const boatsLoader = new DataLoader((cities) => {
    console.log(cities)
    return Boat.find({"location.city": {$in: cities} });
});

const boats = async cities => {
    try {
        // const boats = await boatsLoader.load(() => cities)
        const boats = await Boat.find({"location.city": {$in: cities} });
        return boats.map(transformBoat)

    } catch (err) { throw err; }
};

module.exports = {
    listAllLocations: async args => {
        const {contains, take} = args.filter
        try {
            const locations = await Boat
                .aggregate([
                    {$match: {"location.region": {$regex: contains, $options: "i"}}},
                    {$group: {"_id": {"region": "$location.region"}}},
                    {$unionWith: {
                            coll: "boats", pipeline: [
                                {$match: {"location.city": {$regex: contains, $options: "i"}}},
                                {$group: {"_id": {"region": "$location.region", "city": "$location.city"}}}
                            ]
                        }
                    }
                ])
                .limit(take)

            return locations.map(location => {
                return {
                    city: location._id.city,
                    region: location._id.region,
                    boats: boats.bind(this, location._id.city)
                }
            })
        } catch (err) { `Can't find locations. ${err}` }
    }
}

// {"_id": "$location._id", "region": "$location.region", "city": "$location.city"}
