exports.authenticated = (next) => (args, {req, res}) => {
    if (!req.isAuth) {
        res.status(401)
        throw new Error("Unauthenticated.")
    }
    return next(args, {req, res});
};
exports.authorization = (...roles) => (next) => (args, {req, res}) => {
    if (!roles.includes(req.userRole)){
        res.status(403)
        throw new Error("Unauthorized.")
    }
    return next(args, {req, res});
};
