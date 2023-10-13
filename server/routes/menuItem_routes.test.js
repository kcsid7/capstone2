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



describe("Food Search", function() {

    test("Query food items from menu", async function() {
        const resp = await request(app)
                        .get("/menuitem")
                        .query({
                            name: "Egg"
                        })
        expect(resp.statusCode).toBe(200);
    })
})