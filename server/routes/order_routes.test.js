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


describe("Getting an order", function() {

    test("GET - Get an order by its order number", async function() {

        const resp = await request(app).get("/order/1WE").set("authtoken", `${customerToken}`);
        expect(resp.statusCode).toBe(200);
    })
})

describe("Updating an order", function() {

    test("PATCH - Updating an order by its order number", async function() {
        const updatedOrder = {
            "address": "13St St, CA, MA1", 
            "customerId": "cus2", 
            "customerName": "Cus2", 
            "email": "cus@cus2.com", 
            "phone": "123445666", 
            "items": [
                {
                "itemDescription": "Updated Item Description", 
                "itemId": 4, 
                "itemName": "Updated Item Name", 
                "itemNotes": null, 
                "itemPrice": 20, 
                "itemTotal": 100, 
                "quantity": 3}, 
                { 
                "itemDescription": "Updated Item Description", 
                "itemId": 3, 
                "itemName": "Updated Item Name", 
                "itemNotes": null, 
                "itemPrice": 20, 
                "itemTotal": 100, 
                "quantity": 3}
            ], 
            "orderDate": "5/2/2023", 
            "orderNumber": "1WE", 
            "orderTime": null, 
            "restaurantId": 2, 
            "restaurantName": "Test Res 2", 
            "totalPrice": 74.99
        }
        const resp = await request(app)
            .patch("/order/1WE")
            .send(updatedOrder)
        expect(resp.statusCode).toBe(201);
    })
})


describe("Deleting an order", function() {

    test("DELETE - Delete an order by its order number", async function() {

        const resp = await request(app).delete("/order/1WE")
        expect(resp.statusCode).toBe(200);
    })
})