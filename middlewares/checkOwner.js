// Middleware to check if the token contains an isOwner verifcation

const { UnauthorizedError } = require("../expressError");

function checkOwner(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && user.isOwner)) {
            throw new UnauthorizedError("Unauthorized. User must be an owner");
        }
        return next();
    } catch(e) {
        return next(e);
    }
}

module.exports = { checkOwner };