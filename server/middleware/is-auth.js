const jwt = require('jsonwebtoken')

/*
 * middleware just checks if we got valid access token or not,
 * never throw an error, but just set extra data for api check
*/

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization') // [Authorization]: Bearer token
    if (!authHeader) {
        req.isAuth = false;
        return next()
    }
    const token = authHeader.split(' ')[1]; // Bearer token
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
    } catch (err) {
        req.isAuth = false;
        return next()
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next()
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.userRole;
    next();
}
