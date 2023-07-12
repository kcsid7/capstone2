const bcrypt = require("bcrypt");
const db = require("../db");

const { NotFoundError, ExpressError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Customer {
    constructor(firstName, lastName, username, email, phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = {};
        this.orders = [];
    }

    // Finds all customers
    static async findAll() {
        const result = await db.query(
            `SELECT first_name, last_name, username, email, phone FROM customers`
        )
        return result.rows;
    }


    // Get detailed information about a customer
    static async getDetailedInfo(cusUsername) {
        const dbCustomer = await db.query(
            `SELECT first_name, last_name, username, email, phone, 
                address, city, state, zipcode FROM customers
                WHERE username = $1`, [cusUsername]
        )

        // If no customer is found throw an error
        if (dbCustomer.rows.length === 0) throw new NotFoundError("User not found!");
        
        const { first_name:firstName, last_name:lastName, username, email, 
                phone, address, city, state, zipcode } = dbCustomer.rows[0];

        const cusOrders = await db.query(
            `SELECT o.order_number, o.order_date, o.order_time, o.total_price,
                    o.customer_name, o.customer_email, o.customer_phone, o.customer_full_address AS customer_address,
                    r.name, r.id AS restaurant_id
                FROM orders o
                JOIN restaurants r ON o.restaurant_id = r.id
                WHERE o.customer_id = $1`,
            [cusUsername]
        )

        const customer = new Customer(firstName, lastName, username, email, phone);
        customer.address.streetAddress = address;
        customer.address.city = city;
        customer.address.state = state;
        customer.address.zipcode = zipcode;
        customer.orders = cusOrders.rows;

        return customer;
    }



    // Register a new customer
    static async register(customerInfo) {

        // Get the required info from the form request
        const {firstName, lastName, username, password, email, phone, 
                address, city, state, zipcode} = customerInfo;

        const duplicate = await db.query(
            `SELECT username FROM customers WHERE username = $1`, 
            [username]);
        
        if (duplicate.rows[0]) throw new ExpressError("Duplicate user", 400);

        const hashedPW = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO customers 
            (first_name, last_name, email, phone, username, password, address, city, state, zipcode)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING username, first_name, last_name, email, phone, address, city, state, zipcode`,
            [firstName, lastName, email, phone, username, hashedPW, address, city, state, zipcode]
        )

        return result.rows[0];
    }


    // Login (Authenticate) Customer
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT * FROM customers WHERE username = $1`, [username]
        )
        const customer = result.rows[0];

        if (customer) {
            const passwordCheck = await bcrypt.compare(password, customer.password);
            if (passwordCheck === true) {
                delete customer.password;
                return customer
            }
        }
        
        throw new UnauthorizedError("Invalid username/password");
    }
    

    // Get Customer Orders
    static async getCustomerOrders(username) {
        const dbCustomer = await db.query(
            `SELECT first_name, last_name, username, email, phone, 
                address, city, state, zipcode FROM customers
                WHERE username = $1`, [username]
        )

        // If no customer is found throw an error
        if (dbCustomer.rows.length === 0) throw new NotFoundError("Customer not found!");


        const cusOrders = await db.query(
            `SELECT o.order_number, o.order_date, o.order_time, o.total_price,
                    o.customer_name, o.customer_email, o.customer_phone, o.customer_full_address AS customer_address,
                    r.name, r.id AS restaurant_id
                FROM orders o
                JOIN restaurants r ON o.restaurant_id = r.id
                WHERE o.customer_id = $1`,
            [username]
        )
        return cusOrders.rows
    }


}

module.exports = Customer;