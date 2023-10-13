const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config.js");


function createToken(user) {

    const data = {
        username: user.username
    };

    return jwt.sign(data, SECRET_KEY);
}

module.exports = { createToken };