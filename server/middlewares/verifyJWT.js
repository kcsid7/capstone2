/*
    Middleware verifyJWT
    Used in app.js for every request
    For every request, this function checks the header for an authToken
    If an authToken was provided, the authToken is verified and if the verification
        is true then the token payload (data) is stored on res.locals

    If an authToken was NOT provided, we move to the next middleware
*/

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");

function verifyJWT(req, res, next) {
    try {
        const authToken = req.headers && req.headers.authtoken
        if (authToken) {
            const data = jwt.verify(authToken, SECRET_KEY);
            res.locals.user = data;
        }
        return next();
    } catch (e) {
        next(e);
    }
}

module.exports = { verifyJWT };