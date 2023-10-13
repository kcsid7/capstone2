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


describe("GET /customer/:username", function() {

    test("Unauthorized Error - No Token", async function() {
        const resp = await request(app)
            .get("/customer/cus1");

        expect(resp.statusCode).toEqual(401);
    } )

    test("GET valid customer info with token", async function() {
        const resp = await request(app)
            .get("/customer/cus1")
            .set("authtoken", `${customerToken}`);

        expect(resp.statusCode).toEqual(200);
    } )
})


describe("GET /customer/:username/orders", function() {

    test("Unauthorized Error - No Token", async function() {
        const resp = await request(app)
            .get("/customer/cus1/orders");

        expect(resp.statusCode).toEqual(401);
    } )

    test("GET valid order info with token", async function() {
        const resp = await request(app)
            .get("/customer/cus1/orders")
            .set("authtoken", `${customerToken}`);

        expect(resp.statusCode).toEqual(200);
    } )
})


describe("Authentication Routes - Registering and Logging In", function() {


    test ("Success - Register new customer", async function() {
        const newCus = {
            firstName: "New",
            lastName: "Customer",
            username: "newcust",
            password: "password123",
            email: "newcust@cust.com",
            phone: 12345667,
            address: "1 St St",
            city: "New City",
            state: "CA",
            zipcode: 12345
        }
        const resp = await request(app)
                            .post("/customer/register")
                            .send(newCus);

        expect(resp.statusCode).toBe(201);

    })


    test("Error - Invalid authentication", async function() {
        const resp = await request(app)
                            .post("/customer/login")
                            .send({
                                username: "cus1",
                                password: "Invalid Password"
                            })

        expect(resp.statusCode).toEqual(401);
    })

    test("Error - Valid authentication", async function() {
        const resp = await request(app)
                            .post("/customer/login")
                            .send({
                                username: "cus1",
                                password: "password1"
                            })

        expect(resp.statusCode).toEqual(200);
    })

})