
const Customer = require("../models/customer.js");

const { NotFoundError, ExpressError, UnauthorizedError } = require("../expressError");



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



describe("Getting Customer Info", function() {

    test("Error - Invalid Customer Id", async function() {
        try {
            await Customer.getDetailedInfo("nocus1")
        } catch(e) {
            expect(e.status).toBe(404)
        }
    })


    test("Success - Valid Customer Id", async function() {
        const customer = await Customer.getDetailedInfo("cus1");
        expect(customer.firstName).toBe("Cus")
    })

    test("Success - Find All Customers", async function() {
        const customers = await Customer.findAll();
        expect(customers).toEqual([
            {
                "email": "cus1@cus.com",
                "first_name": "Cus",
                "last_name": "One",
                "phone": 123456789,
                "username": "cus1"
            }, 
            {
                "email": "cus2@cus.com",
                "first_name": "Cust",
                "last_name": "Two",
                "phone": 123456789,
                "username": "cus2"
            }
        ])
    })





    test("Success - Get Customer Orders", async function() {
        const customerOrders = await Customer.getCustomerOrders("cus1");
        expect(customerOrders).toEqual([
            {
              "customer_address": "111St St, CA, MA1",
              "customer_email": "cus@cus1.com",
              "customer_name": "Cus1",
              "customer_phone": "123445666",
              "name": "Test Res 1",
              "order_date": expect.any(Date),
              "order_number": "1DF",
              "order_time": null,
              "restaurant_id": 1,
              "total_price": 20,
            },
            {
              "customer_address": "15St St, CA, MA1",
              "customer_email": "cus1@cus1.com",
              "customer_name": "Cus1",
              "customer_phone": "123445666",
              "name": "Test Res 1",
              "order_date": expect.any(Date),
              "order_number": "1AB",
              "order_time": null,
              "restaurant_id": 1,
              "total_price": 100,
            },
     ]);
    })

})


describe("Authentication - Logging In", function() {

    test("Error - Invalid Login", async function() {
        try {
            const cust = await Customer.authenticate("cus1", "wrongpassword")
        } catch(e) {
            expect(e.status).toBe(401)
        }
    })

    test("Success - Valid Login", async function() {
        try {
            const cust = await Customer.authenticate("cus1", "password1")
            console.log(cust);
            expect(cust).toBe({
                "email": "cus1@cus.com",
                "first_name": "Cus",
                "last_name": "One",
                "phone": 123456789,
                "username": "cus1"
            })
            expect(cust.first_name).toBe("helo")
        } catch(e) {
            expect(e.status).toBe(401)
        }
    })
})


describe("Register New User", function() {

    let newCustomerInfo = {
        firstName: "New",
        lastName: "User",
        username: "newuser",
        password: "password1",
        email: "new@user.com",
        phone: 123445666,
        address: "1 St St",
        city: "New City",
        state: "CA",
        zipcode: 12345
    }

    test("Success - New User Added", async function() {
        const newCus = await Customer.register(newCustomerInfo);
        expect(newCus.first_name).toBe("New");
    })

    test("Error - Duplicate User", async function() {
        try {
            newCustomerInfo.username = "cus1";
            const newCus = await Customer.register(newCustomerInfo);

        } catch (e) {
            expect(e.status).toBe(400);
        }
    })
})





