const request = require("supertest");

const app = require("../index.js");

const {
    CommonAfterAll,
    CommonBeforeAll,
    CommonAfterEach,
    CommonBeforeEach,
    customerToken,
    ownerToken
} = require("./_testCommon.js");

beforeAll(CommonBeforeAll);
beforeEach(CommonBeforeEach);
afterEach(CommonAfterEach);
afterAll(CommonAfterAll);


describe("GET /owner/:username", function() {

    test("Unauthorized Error - No Token", async function() {
        const resp = await request(app)
            .get("/owner/owner1");

        expect(resp.statusCode).toEqual(401);
    } )

    test("GET valid owner info with token", async function() {
        const resp = await request(app)
            .get("/owner/owner1")
            .set("authtoken", `${ownerToken}`);

        expect(resp.statusCode).toEqual(200);
    } )
})


describe("PATCH /owner/:username", function() {

    test("Updating owner info", async function() {
        const updatedOwnerInfo = {
            firstName: "Updated",
            lastName: "Owner",
            username: "owner1",
            password: "password123",
            email: "newowner@cust.com",
            phone: 9999999,
            address: "1 St St",
            city: "New City",
            state: "CA",
            zipcode: 12345,
            license: "UPDTLISC"
        }
        const resp = await request(app).patch("/owner/owner1")
                                .send(updatedOwnerInfo)
                                .set("authtoken", `${ownerToken}`);
                    
    })
})


describe("Authentication Routes - Registering and Logging In", function() {


    test ("Success - Register new owner", async function() {
        const newOwn = {
            firstName: "New",
            lastName: "Owner",
            username: "newowner",
            password: "password123",
            email: "newowner@cust.com",
            phone: 12345667,
            address: "1 St St",
            city: "New City",
            state: "CA",
            zipcode: 12345,
            license: "AVVADF"
        }
        const resp = await request(app)
                            .post("/owner/register")
                            .send(newOwn);

        expect(resp.statusCode).toBe(201);

    })


    test("Error - Invalid authentication", async function() {
        const resp = await request(app)
                            .post("/owner/login")
                            .send({
                                username: "owner1",
                                password: "Invalid Password"
                            })

        expect(resp.statusCode).toEqual(401);
    })

    test("Error - Valid authentication", async function() {
        const resp = await request(app)
                            .post("/owner/login")
                            .send({
                                username: "owner1",
                                password: "password1"
                            })

        expect(resp.statusCode).toEqual(200);
    })

})