const advertisementResolver = require('./advertisement');
const authResolver = require('./auth');
const boatResolver = require('./boat');
const locationResolver = require('./location');
const reviewResolver = require('./review');
const rentalResolver = require('./rental')
const favoriteResolver = require('./favorite')
const imageResolver = require('./image')
const {GraphQLUpload} = require("graphql-upload");

const rootResolver =  {
    Upload: GraphQLUpload,
    ...advertisementResolver,
    ...authResolver,
    ...boatResolver,
    ...favoriteResolver,
    ...locationResolver,
    ...reviewResolver,
    ...rentalResolver,
    ...imageResolver
}

module.exports = rootResolver
