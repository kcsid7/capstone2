const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");

const { checkCorrectUser } = require("./checkCorrectUser.js"); 


describe("Check Correct User in Params", function() {

    test("Unsuccessful Verification: No User Params", function() {
        const req = { params: {} };
        const res = { locals: {user: {username: "testuser"}}};
        const next = function(e) {
            expect(e).toBeTruthy();
        }
        checkCorrectUser(req, res, next);
    });

    test("Unsuccessful Verification: Incorrect User Param", function() {
        const req = { params: {username: "baduser"} };
        const res = { locals: {user: {username: "testuser"}}};
        const next = function(e) {
            expect(e).toBeTruthy();
        }
        checkCorrectUser(req, res, next);
    });

    test("Successful Verification", function() {
        const req = { params: {username: "testuser"} };
        const res = { locals: {user: {username: "testuser"}}};
        const next = function(e) {
            expect(e).toBeFalsy();
        }
        checkCorrectUser(req, res, next);
    });

});