const authResolver = require('./auth');
const boatResolver = require('./boat');
const locationResolver = require('./location');
const reviewResolver = require('./review');

const rootResolver =  {
    ...authResolver,
    ...boatResolver,
    ...locationResolver,
    ...reviewResolver,
}

module.exports = rootResolver
