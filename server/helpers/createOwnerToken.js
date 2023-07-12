const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config.js");


function createOwnerToken(user) {

    const data = {
        username: user.username,
        isOwner: true
    };

    return jwt.sign(data, SECRET_KEY);
}

module.exports = { createOwnerToken };