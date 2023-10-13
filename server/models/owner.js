const bcrypt = require("bcrypt");
const db = require("../db");

const { NotFoundError, ExpressError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

const { sqlPartialUpdate } = require("../helpers/sqlPartialUpdate.js");

class Owner {
    //constructor
    constructor(firstName, lastName, username, email, phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = {};
        this.restaurants = [];
    }

    //GET all owners
    static async getAll() {
        const result = await db.query(
            `SELECT first_name, last_name, username, email, phone FROM owners`
        )
        return result.rows;
    }

    // Register a new owner
    static async register(ownerInfo) {
        // Get the required info from the form request
        const {firstName, lastName, license, username, password, email, phone, 
                address, city, state, zipcode} = ownerInfo;

        const duplicate = await db.query(
            `SELECT username FROM owners WHERE username = $1`, 
            [username]);
        
        if (duplicate.rows[0]) throw new ExpressError("Duplicate user", 400);

        const hashedPW = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO owners 
            (first_name, last_name, email, phone, username, password, address, city, state, zipcode, license)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING username, first_name, last_name, email, phone, address, city, state, zipcode, license`,
            [firstName, lastName, email, phone, username, hashedPW, address, city, state, zipcode, license]
        )

        return result.rows[0];
    }


    // Login (Authenticate) Owner
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT * FROM owners WHERE username = $1`, [username]
        )
        const owner = result.rows[0];

        if (owner) {
            const passwordCheck = await bcrypt.compare(password, owner.password);
            if (passwordCheck === true) {
                delete owner.password;
                return owner
            }
        }
        
        throw new UnauthorizedError("Invalid username/password");
    }


    // Get Detailed Info
    static async getDetailedInfo(user) {
        const dbUser = await db.query(
            `SELECT first_name, last_name, username, email, phone, 
                address, city, state, zipcode FROM owners
                WHERE username = $1`, [user]
        )

        // If no customer is found throw an error
        if (dbUser.rows.length === 0) throw new NotFoundError("User not found!");

        const { first_name:firstName, last_name:lastName, username, email, 
            phone, address, city, state, zipcode } = dbUser.rows[0];

        
        const dbRes = await db.query(
            `SELECT owr.id, owr.restaurant_id AS restaurantId, r.name, r.street_address AS streetAddress, 
                r.city, r.state, r.phone, r.email
                FROM owners_restaurants owr
                JOIN restaurants r ON owr.restaurant_id = r.id
                WHERE owr.owner_id = $1`, [user]
        )

        const owner = new Owner(firstName, lastName, username, email, phone)
        owner.address.streetAddress = address;
        owner.address.city = city;
        owner.address.state = state;
        owner.address.zipcode = zipcode;
        owner.restaurants = dbRes.rows;

        return owner;
    }


    // Update Owner
    static async updateOwner(data, ownerId) {
        try {
            const {cols, values} = sqlPartialUpdate(data, {
                firstName: "first_name",
                lastName: "last_name"
            });

            const ownIdIdx = `$${values.length + 1}`;

            const queryStr = `UPDATE owners
                                SET ${cols}
                                WHERE username=${ownIdIdx}
                                RETURNING first_name, last_name, username,
                                email, phone, address, city, state, zipcode`
            const result = await db.query(queryStr, [...values, ownerId]);
            const owner = result.rows[0];

            if (!owner) throw new NotFoundError();

            return owner;

        } catch(e) {
            console.log(e);
            throw new ExpressError(e.detail, e.code); 
        }
    }





} //Owner


module.exports = Owner;
