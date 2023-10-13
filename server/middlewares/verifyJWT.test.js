const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");

const { verifyJWT } = require("./verifyJWT.js"); 


describe("verifyJWT Test", function() {

    const goodToken = jwt.sign({username: "testuser", isOwner: true}, SECRET_KEY);
    const badToken = jwt.sign({username: "testuser", isOwner: true}, "asdfkl;jasdf;ha;kasdf");

    // No Auth Token Provided in header
    test("No AuthToken provided", function() {
        const req = {};
        const res = { locals: {} }
        const next = function(e) {
            expect(e).toBeFalsy();
        }
        verifyJWT(req, res, next);
        expect(res.locals).toEqual({});

    })

    // Invalid Token
    test("Unsuccessful verification: Invalid Token", function() {
        const req = { headers: {authtoken: badToken}};
        const res = { locals: {} }
        const next = function(e) {
            expect(e).toBeTruthy();
        }
        verifyJWT(req, res, next);
        expect(res.locals).toEqual({});

    })

    // Valid Token
    test("Successful verification: Valid Token", function() {
        const req = { headers: {authtoken: goodToken}};
        const res = { locals: {} }
        const next = function(e) {
            expect(e).toBeFalsy();
        }
        verifyJWT(req, res, next);
        expect(res.locals.user).toEqual({iat: expect.any(Number), username: "testuser", isOwner: true});

    })

});

