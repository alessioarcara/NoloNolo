const authResolver = require('./auth');
const boatResolver = require('./boat');

const rootResolver =  {
    ...authResolver,
    ...boatResolver
}

module.exports = rootResolver
