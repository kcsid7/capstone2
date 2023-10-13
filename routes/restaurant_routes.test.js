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


describe("Get Restaurant Info", function() {

    test("GET /res - Gets info all the restaurants in the database", async function() {
        const resp = await request(app).get("/res");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([
            {
              name: 'Test Res 1',
              streetAddress: '1 Street St',
              city: 'New York',
              state: 'NY',
              zipcode: 12345,
              phone: 123456789,
              email: 'morn@sunshine.com',
              id: 1
            },
            {
              name: 'Test Res 2',
              streetAddress: '2 Street St',
              city: 'New York',
              state: 'NY',
              zipcode: 12345,
              phone: 123456789,
              email: 'even@sunshine.com',
              id: 2
            }
        ]);
    })

    test("GET /res/:id - Get info about a specific restaurant", async function() {
        const resp = await request(app).get("/res/1");
        expect(resp.statusCode).toBe(200);
        expect(resp.body.name).toBe("Test Res 1");
    })


    test("GET /res/:id/orders - Get all restaurant orders", async function() {
        const resp = await request(app).get("/res/1/orders")
                        .set("authtoken", `${ownerToken}`);
        expect(resp.statusCode).toBe(200);

    })

    test("Error - No Owner Token - GET /res/:id/orders - Get all restaurant orders", async function() {
        const resp = await request(app).get("/res/1/orders");
        expect(resp.statusCode).toBe(401);

    })

})


describe("Order from a restaurant", function() {
    
    test("/POST /res/:id/order", async function() {
        const newOrder = {
            "orderNumber": "5WEWE",
            "orderDate": "12/30/2023",
            "orderTime": "16:45:30",
            "totalPrice": 200,
            "customerName": "Jim Customer",
            "customerId": "cus1",
            "customerEmail": "cus1@cus.com",
            "customerPhone": 987654321,
            "customerAddress": "20 Sandy Lane, San City, VA, 12345",
            "items": [
                {
                    "itemId": 1,
                    "quantity": 4,
                    "itemName": "Steamed Bun",
                    "itemDescription": "Steamed Bun Filled With Pork",
                    "itemPrice": 25.95,
                    "itemTotal": 100,
                    "itemNote": "Extra sauce"
                },
                {
                    "itemId": 2,
                    "quantity": 2,
                    "itemName": "Lobster",
                    "itemDescription": "Steamed Lobster",
                    "itemPrice": 49.95,
                    "itemTotal": 100,
                    "itemNote": "Extra sauce"
                }
            ]
        }

        const resp = await request(app).post("/res/1/order")
                                .send(newOrder);

        expect(resp.statusCode).toBe(201);
    })
})


describe("Add a new restaurant", function() {

    test("POST /res/new - Adds a new restaurant", async function() {
        const newResInfo = {
            "name": "Dumpling Place",
            "streetAddress": "20 Common Pl",
            "city": "Los Angeles",
            "state": "California",
            "phone": 128768711,
            "email": "momo@momo.com",
            "owner": "owner1"
        }
        const resp = await request(app).post("/res/new")
                            .send(newResInfo)
                            .set("authtoken", `${ownerToken}`)
        expect(resp.statusCode).toBe(201);
        
    })

    test("Error No Owner Token - POST /res/new - Adds a new restaurant", async function() {
        const newResInfo = {
            "name": "Dumpling Place",
            "streetAddress": "20 Common Pl",
            "city": "Los Angeles",
            "state": "California",
            "phone": 128768711,
            "email": "momo@momo.com",
            "owner": "owner1"
        }
        const resp = await request(app).post("/res/new")
                            .send(newResInfo);
        expect(resp.statusCode).toBe(401);
        
    })
})


describe("Delete a restaurant", function() {

    test("Error - No Owner Token - DELETE /res/:id/delete", async function() {
        const resp = await request(app).delete("/res/1/delete");
        expect(resp.statusCode).toBe(401); // 401 Unauthorized
    });

    test("DELETE /res/:id/delete", async function() {
        const resp = await request(app).delete("/res/1/delete")
                                .set("authtoken", `${ownerToken}`);
        expect(resp.statusCode).toBe(200);
    })
})


describe("Update a restaurant", function() {

    test("PATCH /res/:id/update", async function() {
        const updateInfo = {
            "name": "Dumpling Place",
            "streetAddress": "20 Common Pl",
            "city": "Los Angeles",
            "state": "California",
            "phone": 128768711,
            "email": "momo@momo.com",
            "owner": "owner1"
        }
        const resp = await request(app).patch("/res/1/update")
                                .send(updateInfo)
                                .set("authtoken", `${ownerToken}`);
        expect(resp.statusCode).toBe(200);

    })

    test("Error - No Owner Token - PATCH /res/:id/update", async function() {
        const updateInfo = {
            "name": "Dumpling Place",
            "streetAddress": "20 Common Pl",
            "city": "Los Angeles",
            "state": "California",
            "phone": 128768711,
            "email": "momo@momo.com",
            "owner": "owner1"
        }
        const resp = await request(app).patch("/res/1/update")
                                .send(updateInfo)
        expect(resp.statusCode).toBe(401);

    })
})



describe("Restaurant Menu Items", function() {

    
    test("Error - No Owner Token - Adding Menu Item", async function() {
        const newMenuItem = {
            name: "Burrito",
            description: "Carnitas burrito with chips",
            type: "Lunch",
            price: 20,
            image: null
        }
        const resp = await request(app).post("/res/1/menu/add")
                            .send(newMenuItem);
        expect(resp.statusCode).toBe(401);
    })

    test("Adding Menu Item", async function() {
        const newMenuItem = {
            name: "Burrito",
            description: "Carnitas burrito with chips",
            type: "Lunch",
            price: 20,
            image: null
        }
        const resp = await request(app).post("/res/1/menu/add")
                            .send(newMenuItem)
                            .set("authtoken", `${ownerToken}`);
        expect(resp.statusCode).toBe(201);
    })


    test("Error - No Owner Token - Updating Menu Item", async function() {
        const updatedItem = {
            name: "Burrito",
            description: "Carnitas burrito with chips",
            type: "Lunch",
            price: 20,
            image: null
        }
        const resp = await request(app).patch("/res/1/menu/1/update")
                            .send(updatedItem)
        expect(resp.statusCode).toBe(401);
    })

    test("Updating Menu Item", async function() {
        const updatedItem = {
            name: "Burrito",
            description: "Carnitas burrito with chips",
            type: "Lunch",
            price: 20,
            image: null
        }
        const resp = await request(app).patch("/res/1/menu/1/update")
                            .send(updatedItem)
                            .set("authtoken", `${ownerToken}`);
        expect(resp.statusCode).toBe(200);
    })

    test("Error - No Owner Token - Deleting Menu Item", async function() {
        const resp = await request(app).delete("/res/1/menu/3/delete");
        expect(resp.statusCode).toBe(401);
    })

    test("Deleting Menu Item", async function() {
        const resp = await request(app).delete("/res/1/menu/3/delete")
                                .set("authtoken", `${ownerToken}`);
        expect(resp.statusCode).toBe(200);
    })
})



