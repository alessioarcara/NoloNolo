exports.authenticated = (next) => (args, {req, res}) => {
    if (!req.isAuth) { throw new Error("Unauthenticated.") }
    return next(args, {req, res});
};
