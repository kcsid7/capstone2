const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");

const { createOwnerToken } = require("./createOwnerToken.js"); 

describe("Create Owner Token Function", function() {

    // Owner Token Test
    test("Creates Owner Token", function() {
        const token = createOwnerToken({ username: "testowner"});
        const verify = jwt.verify(token, SECRET_KEY);
        expect(verify).toEqual({
            iat: expect.any(Number),
            username: "testowner",
            isOwner: true
        });
    });

});

