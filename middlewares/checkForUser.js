/* 
    Middleware to check if the request contains a user verified by the JWT 
*/

const { UnauthorizedError } = require("../expressError");


function checkForUser(req, res, next) {
    try {
        const user = res.locals.user;
        if (!user) {
            throw new UnauthorizedError("Unauthorized user");
        }
        return next();
    } catch (e) {
        return next(e)
    }
}

module.exports = { checkForUser };