
const bcrypt = require("bcrypt");
const db = require("../db.js");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

const { createToken } = require("../helpers/createToken.js");
const { createOwnerToken } = require("../helpers/createOwnerToken.js");

async function CommonBeforeAll() {

    await db.query("DELETE FROM restaurants");
    await db.query("DELETE FROM customers");
    await db.query("DELETE FROM owners");
    await db.query("DELETE FROM owners_restaurants");
    await db.query("DELETE FROM menu_items");
    await db.query("DELETE FROM orders");
    await db.query("DELETE FROM orders_menuitems");
   
    await db.query(`
    INSERT INTO restaurants (id, name, street_address, city, state, phone, email, zipcode) VALUES 
    (1, 'Test Res 1', '1 Street St', 'New York', 'NY', 123456789, 'morn@sunshine.com', 12345),
    (2, 'Test Res 2', '2 Street St', 'New York', 'NY', 123456789, 'even@sunshine.com', 12345)
    `)

    await db.query(`
    INSERT INTO customers (first_name, last_name, username, email, password, phone, address, city, state, zipcode) VALUES 
    ('Cus', 'One', 'cus1', 'cus1@cus.com', $1, 123456789, '12 St St', 'Capital City', 'CA', 90210),
    ('Cust', 'Two', 'cus2', 'cus2@cus.com', $2, 123456789, '12 St St', 'Capital City', 'CA', 90210)
    `, 
    [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)
    ])

    await db.query(`
    INSERT INTO owners (first_name, last_name, username, email, password, phone, license, address, city, state, zipcode) VALUES 
    ('John', 'Owner', 'owner1', 'owner1@owner.com', $1, 123456789, 'ABBAAAB', '123 Ave St', 'Capital City', 'CA', 90210),
    ('Jane', 'Doe', 'owner2', 'owner2@owner.com', $2, 123456789, 'ABBAAAB', '1232 S St', 'Capital City', 'CA', 90210)
    `,
    [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)
    ])

    await db.query(`
    INSERT INTO owners_restaurants (id, owner_id, restaurant_id) VALUES 
    (1, 'owner1', 1),
    (2, 'owner1', 2),
    (3, 'owner2', 2)
    `);

    await db.query(`
    INSERT INTO menu_items (id, name, description, type, price, restaurant_id) VALUES 
    (1, 'Eggs', 'Eggs Cooked', 'Breakfast', 5.50, 1),
    (2, 'Eggs', 'Eggs Bendict', 'Breakfast', 19.50, 2),
    (3, 'Sandwich', 'Turkey Club', 'Lunch', 9.50, 2),
    (4, 'Burrito', 'Carnitas', 'Lunch', 14.50, 1),
    (5, 'Lobster', 'Lobster Steamed', 'Dinner', 49.99, 1),
    (6, 'Burger', 'Hamburger and fries', 'Lunch', 19.99, 2),
    (7, 'Pasta', 'Spaghetti', 'Dinner', 29.99, 1)
    `);


    await db.query(`
    INSERT INTO orders (order_number, order_date, total_price, customer_id, restaurant_id, customer_name, customer_email, customer_phone, customer_full_address) VALUES 
    ('1DF', '05/06/2023', 20, 'cus1', 1, 'Cus1', 'cus@cus1.com', 123445666, '111St St, CA, MA1'),
    ('1WE', '05/02/2023', 74.99, 'cus2', 2, 'Cus2', 'cus@cus2.com', 123445666, '13St St, CA, MA1'),
    ('1AB', '05/04/2023', 100, 'cus1', 1, 'Cus1', 'cus1@cus1.com', 123445666, '15St St, CA, MA1'),
    ('1BC', '05/01/2023', 50, 'cus2', 2, 'Cus2', 'cus@cus1.com', 123445666, '11St St, CA, MA1')
    `);

    await db.query(`
    INSERT INTO orders_menuitems (order_number, item_id, quantity, item_name, item_description, item_price, item_total) VALUES 
    ('1DF', 1, 3, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1AB', 2, 2, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1AB', 3, 5, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1AB', 5, 1, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 7, 1, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 5, 2, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1DF', 6, 2, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1DF', 3, 3, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 2, 5, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 1, 4, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1BC', 2, 2, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1WE', 4, 3, 'Test Item Name', 'Test Item Description', 20, 100),
    ('1WE', 3, 3, 'Test Item Name', 'Test Item Description', 20, 100)
    `);
}

async function CommonAfterAll() {
    await db.end()
}


async function CommonBeforeEach() {
    await db.query("BEGIN");
}

async function CommonAfterEach() {
    await db.query("ROLLBACK");
}

const customerToken = createToken({username: "cus1"});
const ownerToken = createOwnerToken({username: "owner1"});


module.exports = {
    CommonAfterAll,
    CommonBeforeAll,
    CommonAfterEach,
    CommonBeforeEach,
    customerToken,
    ownerToken
}