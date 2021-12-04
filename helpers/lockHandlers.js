const Lock = require("../models/lock");

exports.acquireLock = async (name) => {
    try {
        const now = new Date()
        // 1 minute timeout
        const expired = now - 60 * 1000

        await Lock.findOneAndUpdate(
            { name:name, timestamp: {$lt: expired} },
            { timestamp: now },
            { new: true, upsert: true, useFindAndModify: false })
    } catch (err) { throw new Error(`Failed to acquire lock: ${err}`) }
};
exports.releaseLock = async (name) => {
    try {
        await Lock.findOneAndRemove({name: name}, {useFindAndModify: false})
    } catch (err) { throw new Error(`Failed to release lock: ${err}`)}
};
