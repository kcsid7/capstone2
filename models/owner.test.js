const Owner = require("../models/owner.js");

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


describe("Getting Owner Info", function() {

    test("Error - Invalid Owner Id", async function() {
        try {
            await Owner.getDetailedInfo("noown1")
        } catch(e) {
            expect(e.status).toBe(404)
        }
    })


    test("Success - Valid Customer Id", async function() {
        const owner = await Owner.getDetailedInfo("owner1");
        expect(owner.firstName).toBe("John")
    })

    test("Success - Find All Customers", async function() {
        const owners = await Owner.getAll();
        expect(owners).toEqual([
            {
                "email": "owner1@owner.com",
                "first_name": "John",
                "last_name": "Owner",
                "phone": 123456789,
                "username": "owner1"
            }, 
            {
                "email": "owner2@owner.com",
                "first_name": "Jane",
                "last_name": "Doe",
                "phone": 123456789,
                "username": "owner2"
            }
        ])
    })

})


describe("Authentication & Registration", function() {

    let newOwnerInfo = {
        firstName: "New",
        lastName: "Owner",
        username: "newowner",
        license: 'asdfasdf',
        password: "password1",
        email: "new@owner.com",
        phone: 123445666,
        address: "1 St St",
        city: "New City",
        state: "CA",
        zipcode: 12345
    }

    test("Success - New Owner Added", async function() {
        const newOwner = await Owner.register(newOwnerInfo);
        expect(newOwner.first_name).toBe("New");

        const authenticateOwner = await Owner.authenticate("newowner", "password1");
        expect(authenticateOwner.first_name).toBe("New");

    })

    test("Error - Duplicate User", async function() {
        try {
            newOwnerInfo.username = "owner1";
            const newOwner = await Owner.register(newOwnerInfo);
        } catch (e) {
            expect(e.status).toBe(400);
        }
    })

    test("Error - Invalid Login", async function() {
        try {
            const owner = await Owner.authenticate("owner1", "wrongpassword")
        } catch(e) {
            expect(e.status).toBe(401)
        }
    })
})





