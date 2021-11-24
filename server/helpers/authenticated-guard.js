exports.authenticated = (next) => (args, {req, res}) => {
    if (!req.isAuth) {
        res.status(401)
        throw new Error("Unauthenticated.")
    }
    return next(args, {req, res});
};
