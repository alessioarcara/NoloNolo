const authResolver = require('./auth');
const boatResolver = require('./boat');
const locationResolver = require('./location');
const reviewResolver = require('./review');
const rentalResolver = require('./rental')

const rootResolver =  {
    ...authResolver,
    ...boatResolver,
    ...locationResolver,
    ...reviewResolver,
    ...rentalResolver
}

module.exports = rootResolver
