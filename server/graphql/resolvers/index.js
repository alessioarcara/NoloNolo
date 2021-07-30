const authResolver = require('./auth');
const boatResolver = require('./boat');
const reviewResolver = require('./review');

const rootResolver =  {
    ...authResolver,
    ...boatResolver,
    ...reviewResolver,
}

module.exports = rootResolver
