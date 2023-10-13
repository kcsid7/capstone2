/* 
    Middleware to check if the user 
*/

const { UnauthorizedError } = require("../expressError");


function checkCorrectUser(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && user.username === req.params.username)) {
            throw new UnauthorizedError("Unauthorized user");
        }
        return next();
    } catch (e) {
        return next(e)
    }
}

module.exports = { checkCorrectUser };