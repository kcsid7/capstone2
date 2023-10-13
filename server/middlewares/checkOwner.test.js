const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");

const { checkOwner } = require("./checkOwner.js"); 


describe("Check Owner Verification", function() {

    test("Unsuccessful Verification: No User Token", function() {
        const req = {};
        const res = {};
        const next = function(e) {
            expect(e).toBeTruthy();
        }
        checkOwner(req, res, next);
    });

    test("Unsuccessful Verification: Not an Owner", function() {
        const req = {};
        const res = { locals: {user: {username: "testuser", isOwner: false}}};
        const next = function(e) {
            expect(e).toBeTruthy();
        }
        checkOwner(req, res, next);
    });

    test("Successful Verification", function() {
        const req = {};
        const res = { locals: {user: {username: "testuser", isOwner: true}}};
        const next = function(e) {
            expect(e).toBeFalsy();
        }
        checkOwner(req, res, next);
    });

});