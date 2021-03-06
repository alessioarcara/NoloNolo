const Boat = require('../../models/boat');

module.exports = {
    listAllLocations: async args => {
        const {contains, take} = args.filter
        try {
            const locations = await Boat
                .aggregate([
                    {
                        $match: {
                            $and: [
                                {"location.region": {$regex: `^${contains}`, $options: "i"}},
                                {"advertisement": {$exists: true}}
                            ]
                        }
                    },
                    {$group: {"_id": {"region": "$location.region"}}},
                    {
                        $unionWith: {
                            coll: "boats", pipeline: [
                                {
                                    $match: {
                                        $and: [
                                            {"location.city": {$regex: `^${contains}`, $options: "i"}},
                                            {"advertisement": {$exists: true}},
                                        ]
                                    }
                                },
                                {$group: {"_id": {"region": "$location.region", "city": "$location.city"}}}
                            ]
                        }
                    }
                ])
                .limit(take)

            return locations.map(location => {
                return {city: location._id.city, region: location._id.region}
            })
        } catch (err) {
            throw new Error(`Can't find locations. ${err}`)
        }
    }
}
