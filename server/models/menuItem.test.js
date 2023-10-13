const MenuItem = require("../models/menuItem.js")

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


describe("Getting Menu Item", function() {

    test("Get Menu Item By Id", async function() {
        const item = await MenuItem.getById(1);
        expect(item.name).toBe("Eggs");
        expect(item.description).toBe("Eggs Cooked");
    })

    test("Query Menu Item By Name", async function() {
        const items = await MenuItem.queryItem({name: "Eggs"});
        expect(items).toEqual([
            {
                "description": "Eggs Cooked",
                "id": 1,
                "image": null,
                "name": "Eggs",
                "price": 5.5,
                "restaurant_id": 1,
                "type": "Breakfast",
            }, 
            {
                "description": "Eggs Bendict",
                "id": 2,
                "image": null,
                "name": "Eggs",
                "price": 19.5,
                "restaurant_id": 2,
                "type": "Breakfast",
            }
        ]);
    })
})


describe("Creating Menu Item", function() {

    test("Creating a menu item", async function() {
        const newMenuItem = {
            name: "New Item", 
            description: "New Menu Item", 
            type: "Lunch", 
            price: 10, 
            restaruantId: 1, 
            image: null
        }
        const newItem = await MenuItem.createMenuItem(newMenuItem);
        expect(newItem.name).toBe("New Item");
        expect(newItem.type).toBe("Lunch");
        expect(newItem.price).toBe(10);
    })
})


describe("Updating Menu Item", function() {

    test("Updating a menu item", async function() {
        const menuItem = await MenuItem.getById(1);
        menuItem.name = "Scrambled Eggs";
        menuItem.price = 20;
        
        const updatedItem = await menuItem.updateItem();
        expect(updatedItem.name).toBe("Scrambled Eggs");
        expect(updatedItem.price).toBe(20);
        
    })
})



describe("Deleting Menu Item", function() {

    test("Removing a menu item", async function() {
        const menuItem = await MenuItem.getById(1);
        
        const deletedItem = await menuItem.removeItem();
        expect(deletedItem.name).toBe("Eggs");
        expect(deletedItem.message).toBe("Removed menu-item from database");
        
    })
})


