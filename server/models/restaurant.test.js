const Restaurant = require("../models/restaurant.js");

const { BadRequestError, NotFoundError } = require("../expressError.js");


const {
    CommonAfterAll,
    CommonBeforeAll,
    CommonAfterEach,
    CommonBeforeEach
} = require("./_testCommon.js");


beforeAll(CommonBeforeAll);
beforeEach(CommonBeforeEach);
afterEach(CommonAfterEach);
afterAll(CommonAfterAll);



describe("Getting Restaurant Information", function() {

    test("Error - Invalid Restaurant Id", async function() {
        try {
            await Restaurant.get(123);
        } catch(e) {
            expect(e.message).toBe("Restaurant Not Found!");
            expect(e.status).toBe(404);
        }

    })


    test("Get All Restaurant Info", async function() {
        const res = await Restaurant.getAllInfo();
        expect(res).toEqual([
            {"city": "New York", 
            "email": "morn@sunshine.com", 
            "id": expect.any(Number), 
            "name": "Test Res 1", 
            "phone": 123456789, "state": "NY", 
            "streetAddress": "1 Street St", 
            "zipcode": 12345}, 
            {"city": "New York", 
            "email": "even@sunshine.com", 
            "id": expect.any(Number), 
            "name": "Test Res 2", 
            "phone": 123456789, "state": "NY", 
            "streetAddress": "2 Street St", 
            "zipcode": 12345}
        ])
    });

    test("Get Restaurant Info By Id", async function() {
        const res = await Restaurant.get(1);
        expect(res).toEqual(
            {
                "city": "New York", 
                "email": "morn@sunshine.com", 
                "id": 1, 
                "name": "Test Res 1", 
                "owners": ["owner1"], 
                "phone": 123456789, 
                "state": "NY", 
                "streetAddress": "1 Street St", 
                "zipcode": 12345,
                "menu": [
                    {"description": "Eggs Cooked", 
                    "id": 1, 
                    "image": null, 
                    "name": "Eggs", 
                    "price": 5.5, 
                    "type": "Breakfast"}, 
                    {"description": "Carnitas", 
                    "id": 4, 
                    "image": null, 
                    "name": "Burrito", 
                    "price": 14.5, 
                    "type": "Lunch"}, 
                    {"description": "Lobster Steamed", 
                    "id": 5, 
                    "image": null, 
                    "name": "Lobster", 
                    "price": 49.99, 
                    "type": "Dinner"}, 
                    {"description": "Spaghetti", 
                    "id": 7, 
                    "image": null, 
                    "name": "Pasta", 
                    "price": 29.99, 
                    "type": "Dinner"}]
            });
    });
});


describe("Updating Restaurant Info", function() {

    test("Updating restaurant information - name & city", async function() {
        const updatedData = { name: "Updated Res 1", city: "NYC"}
        const res = await Restaurant.updateRestaurant(updatedData, 1);
        expect(res).toEqual(    
            {   
                "city": "NYC",
                "email": "morn@sunshine.com",
                "id": 1,
                "name": "Updated Res 1",
                "phone": 123456789,
                "state": "NY",
                "street_address": "1 Street St",
                "zipcode": 12345
            });
    })


    test("Error - Updating restaurant information - Invalid Restaurant", async function() {
        try {
            const updatedData = { name: "Updated Res 1", city: "NYC"}
            await Restaurant.updateRestaurant(updatedData, 123);
        } catch(e) {
            expect(e.message).toBe("Not Found!");
            expect(e.status).toBe(404);
        }
    })
})



describe("Creating A Restaurant", function() {

    test("Create a new restaurant", async function() {
        const newResObj = {
            owner: "owner1",
            name: "New Restaurant",
            streetAddress: "340 A Ave",
            city: "Capital City",
            state: "CA",
            zipcode: 12345,
            phone: 123455677,
            email: "newres@email.com"
        }
        const res = await Restaurant.createNew(newResObj);

        expect(res).toEqual({
            newResLink: expect.any(Object),
            newRestaurant: expect.any(Object)
        });

    })

    describe("Creating Restaurant Errors", function() {
        
        test("No Owner Passed", async function() {
            try {
                const newResObj = {
                    name: "New Restaurant",
                    streetAddress: "340 A Ave",
                    city: "Capital City",
                    state: "CA",
                    zipcode: 12345,
                    phone: 123455677,
                    email: "newres@email.com"
                }
                await Restaurant.createNew(newResObj);
            } catch(e) {
                expect(e.message).toBe("Need an owner");
                expect(e.status).toBe(400);
            }
        })


        test("Invalid Owner Passed", async function() {
            try {
                const newResObj = {
                    owner: "invalidOwner",
                    name: "New Restaurant",
                    streetAddress: "340 A Ave",
                    city: "Capital City",
                    state: "CA",
                    zipcode: 12345,
                    phone: 123455677,
                    email: "newres@email.com"
                }
                await Restaurant.createNew(newResObj);
            } catch(e) {
                expect(e.message).toBe("Owner not found!");
                expect(e.status).toBe(400);
            }
        })

        test("Missing Restaurant Info", async function() {
            try {
                const newResObj = {
                    owner: "owner1",
                    streetAddress: "340 A Ave",
                    city: "Capital City",
                    state: "CA",
                    zipcode: 12345,
                    phone: 123455677,
                    email: "newres@email.com"
                }
                await Restaurant.createNew(newResObj);
            } catch(e) {
                expect(e.message).toContain("not-null");
                expect(e.status).toBe(400);
            }
        })

    })

})


describe("Deleting a restaurant", function() {

    test("Delete a restaurant", async function() {
        try {
            const res = await Restaurant.get(1);
            const deleteRes = res.deleteRestaurant();

            expect(deleteRes.message).toContain("Removed")
        } catch(e) {

        }
    });

    test("Error - Restaurant Not Found", async function() {
        try {
            const res = await Restaurant.get(123);
            const deleteRes = res.deleteRestaurant();
        } catch(e) {
            expect(e.message).toBe("Restaurant Not Found!");
            expect(e.status).toBe(404);
        }
    });
})





