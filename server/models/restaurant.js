const db = require("../db");

const { NotFoundError, ExpressError, BadRequestError } = require("../expressError");


const MenuItem = require("./menuItem.js");
const Order = require("./order.js")

const { sqlPartialUpdate } = require("../helpers/sqlPartialUpdate.js");


class Restaurant {

    constructor(id, name, streetAddress, city, state, phone, email, zipcode) {
        this.id = id;
        this.name = name;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phone = phone;
        this.email = email;
        this.menu = [];
    }

    // Returns the basic restaurant information
    getRestaurantInfo() {
        return {
            name: this.name,
            streetAddress: this.streetAddress,
            city: this.city,
            state: this.state,
            zipcode: this.zipcode,
            phone: this.phone,
            email: this.email,
            id: this.id
        }
    }

    // Get All Restaurants Information
    static async getAllInfo() {
        const result = await db.query(
            `SELECT * FROM restaurants`
        )
        const restaurants = result.rows
                    .map(r => new Restaurant(r.id, r.name, r.street_address, r.city, r.state, r.phone, r.email, r.zipcode))
                    .map(r => r.getRestaurantInfo());
        
        return restaurants;
    }


    // Update Restaurant Info
    static async updateRestaurant(data, resId) {
        const {cols, values} = sqlPartialUpdate(data, {
            streetAddress: "street_address"
        });
        const resIdIdx = `$${values.length + 1}`;

        const queryStr = ` UPDATE restaurants 
                            SET ${cols}
                            WHERE id=${resIdIdx}
                            RETURNING id, name, street_address, city,
                            state, phone, email, zipcode`

        const result = await db.query(queryStr, [...values, resId]);
        const restaurant = result.rows[0];

        if (!restaurant) throw new NotFoundError();

        return restaurant
    }



    // Create new restaurant (dataObj) and link it to the owner
    // dataObj = { owner, name, street_address, city, state, phone, email }
    static async createNew(dataObj) {
        try {
            // add new restaurant to the restaurants table

            if (!dataObj.owner) throw new BadRequestError();

            const newRes = await db.query(
                `INSERT INTO restaurants 
                (name, street_address, city, state, zipcode, phone, email) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, name`, 
                [
                    dataObj.name,
                    dataObj.streetAddress,
                    dataObj.city,
                    dataObj.state,
                    dataObj.zipcode,
                    dataObj.phone,
                    dataObj.email
                ]
            )
            const newRestaurant = newRes.rows[0];

            // add new owner-restaurant link in the owners_restaurants table
            const resLink = await db.query(
                `INSERT INTO owners_restaurants
                (owner_id, restaurant_id)
                VALUES ($1, $2) 
                RETURNING id AS resLinkId, owner_id`,
                [dataObj.owner, newRestaurant.id]
            )

            const newResLink = resLink.rows[0];

            return {newRestaurant, newResLink}
        } catch(e) {
            console.log(e);
            throw new BadRequestError();
        }

    }


    // Deletes the restaurant
    async deleteRestaurant() {
        await db.query(`DELETE FROM restaurants WHERE id = $1 RETURNING *`, [this.id]);
        return ({
            message: "Removed restaurant from database",
            id: this.id,
            name: this.name,
            address: `${this.streetAddress}, ${this.city}, ${this.state}, ${this.zipcode}`,
            phone: this.phone,
            email: this.email
        })
    }


    // Gets info about a restaurant based on their restaurant ID
    // Gets all the restaurant info from the restaurants table
    // Gets all the menu_items associated with the restaurant
    // Combines them into a single restaurant object containing the menu

    static async get(restId) {

        const resResult = await db.query(
            `SELECT r.*, owr.owner_id FROM restaurants r 
            JOIN owners_restaurants owr ON r.id = owr.restaurant_id
            WHERE r.id = $1`,
            [restId]
        )
        
        // If no restaurant is found then throw a not found error 
        if (resResult.rows.length === 0) throw new NotFoundError("Restaurant Not Found!");

        const {id, name, street_address: streetAddress, city, state, phone, email, zipcode} = resResult.rows[0];

        const menuResult = await db.query(
            `SELECT mi.id, mi.name, mi.description, mi.type, mi.price, mi.image FROM menu_items mi
            WHERE mi.restaurant_id = $1`,
            [restId]
        );

        const restaurant = new Restaurant(id, name, streetAddress, city, state, phone, email, zipcode);
        
        restaurant.menu = menuResult.rows;
        restaurant.owners = resResult.rows.map(i => i.owner_id);

        return restaurant;
    }

    // Create a new menu item for the restaurant
    // POST: /:restaurant-id//menu/add
    async createNewMenuItem(newItem) {
        const {name, description, type, price, image} = newItem;
        const newMenuItem = await MenuItem.createMenuItem({
            name, description, type, price, restaruantId: this.id, image
        })
        return newMenuItem;
    }


    // Gets all orders from the current restaurant
    // GET: /:restaurant-id/orders
    async getAllOrders() {
        const result = await db.query(`
            SELECT o.* FROM orders o
            WHERE o.restaurant_id = $1
        `, [this.id]);

        return result.rows
    } 


    // Gets the order details based on an order number from a restaurant
    // GET: /:restaurant-id/order/:order-number
    async getOrderDetails(oNum) {
        const order = Order.getOrder(oNum);
        return order;
    }


    // Orders from a restaurant
    // TO insert into the orders Table you need a customer_id, an order number, restaurant_id, total, and date
    // Each order number contains menu items that are added to the orders_menuitems Table
    /*
    ORDER: {   order_number, order_date, total, customer_id, items: menuItems  }
    menuItems: [{ menu_item_id, quantity, menu_item_name, menu_item_description, menu_item_price, menu_item_total}]
    */
    async placeOrder(orderObj) { 
        try {
            const order = await Order.createOrder(orderObj, this.id); 
            return order
        } catch(e) {
            console.log(e);
            throw new ExpressError(e.detail, e.code); 
        }

    }

}

module.exports = Restaurant;