const authResolver = require('./auth');
const boatResolver = require('./boat');
const locationResolver = require('./location');
const reviewResolver = require('./review');
const rentalResolver = require('./rental')
const favoriteResolver = require('./favorite')

const rootResolver =  {
    ...authResolver,
    ...boatResolver,
    ...favoriteResolver,
    ...locationResolver,
    ...reviewResolver,
    ...rentalResolver
}

module.exports = rootResolver
