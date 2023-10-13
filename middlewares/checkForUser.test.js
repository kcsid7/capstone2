const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");

const { checkForUser } = require("./checkForUser.js"); 


describe("Check for user verified by the JWT", function() {

    test("Unsuccessful Verification: No User provided", function() {
        const req = { params: {} };
        const res = { };
        const next = function(e) {
            expect(e).toBeTruthy();
        }
        checkForUser(req, res, next);
    });

    test("Successful Verification", function() {
        const req = { params: {} };
        const res = { locals: {user: {username: "testuser"}}};
        const next = function(e) {
            expect(e).toBeFalsy();
        }
        checkForUser(req, res, next);
    });

});