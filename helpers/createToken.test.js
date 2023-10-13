const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");

const { createToken } = require("./createToken"); 

describe("Create Token Function", function() {

    // User Token Test
    test("Creates User Token", function() {
        const token = createToken({ username: "testuser"});
        const verify = jwt.verify(token, SECRET_KEY);
        expect(verify).toEqual({
            iat: expect.any(Number),
            username: "testuser"
        });
    });


});

