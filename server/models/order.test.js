const Order = require("../models/order.js");

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

describe("Getting Orders", function() {


    test("Error - Get invalid order", async function() {
        try {
            const order = await Order.getOrder("1WERT")
        } catch(e) {
            expect(e.message).toBe("Order [1WERT] not found");
            expect(e.status).toBe(404);
        }   
    })


    test("Get order", async function() {
        const order = await Order.getOrder("1WE");
        expect(order).toEqual({
            "customer": 
                {"address": "13St St, CA, MA1", 
                "customerId": "cus2", 
                "customerName": "Cus2", 
                "email": "cus@cus2.com", 
                "phone": "123445666"}, 
                "items": [
                    {"id": expect.any(Number), 
                    "itemDescription": "Test Item Description", 
                    "itemId": 4, 
                    "itemName": "Test Item Name", 
                    "itemNotes": null, 
                    "itemPrice": 20, 
                    "itemTotal": 100, 
                    "quantity": 3}, 
                    {"id": expect.any(Number), 
                    "itemDescription": "Test Item Description", 
                    "itemId": 3, 
                    "itemName": "Test Item Name", 
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
                "totalPrice": 74.99,
                "tax": null,
                "tip": null
            });
    })

})



describe("Create an order", function() {

    test("Add an order to the database", async function() {
        const newOrder = {
            orderNumber: "NEWORDER",
            orderDate: "9/12/2023",
            totalPrice: 140,
            tax: 10,
            tip: 90,
            customerId: "cus1",
            customerName: "Jane Doe",
            customerEmail: "jane@doe.com",
            customerPhone: 81231245,
            customerAddress: "1 Main St, MA, 1231",
            orderTime: "10:01",
            items: [
                {
                    itemId: 1,
                    quantity: 2,
                    itemName: "Eggs",
                    itemDescription: "Scrambled Eggs",
                    itemPrice: 20,
                    itemTotal: 40,
                    itemNotes: "Extra cheese"
                }
            ]
        }

        const newO = await Order.createOrder(newOrder, 1);
        expect(newO.order_number).toEqual("NEWORDER");


    })
})


describe("Update Order", function() {

    test("Update an order by the order number", async function() {
        const order = await Order.getOrder("1WE");
        const newOrder = {
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

        const updatedOrder = await order.updateOrder(newOrder);
        expect(updatedOrder.message).toBe("Order updated!");


    })


})



describe("Delete order", function () {

    test("Remove order", async function() {
        const order = await Order.getOrder("1WE");
        const deleted = await order.deleteOrder();
        expect(deleted.message).toBe("Removed order from database");
    })
})


