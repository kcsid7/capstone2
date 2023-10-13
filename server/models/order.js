const db = require("../db.js");
const format = require("pg-format");


const { NotFoundError, ExpressError } = require("../expressError.js");


class Order {

    constructor(restaurantId, restaurantName, orderNumber, orderDate, totalPrice, customerId, orderTime, tip, tax) {
        this.restaurantId = restaurantId,
        this.restaurantName = restaurantName,
        this.orderNumber = orderNumber,
        this.orderDate = orderDate,
        this.orderTime = orderTime,
        this.totalPrice = totalPrice,
        this.tip = tip,
        this.tax = tax,
        this.customer = {
            customerId
        },
        this.items = []; 
    }

    // Creates a new order object
    // Takes an orderObject and a restaurant ID and adds to the orders Table and orders_menuitems Table
    /*
    orderObject: {   order_number, order_date, total, customer_id, items: menuItems  }
    menuItems: [{ menu_item_id, quantity, menu_item_name, menu_item_description, menu_item_price, menu_item_total}]
    */
    static async createOrder(orderObj, restaurantId) { 
        const resOrder = await db.query(`
            INSERT INTO orders (order_number, order_date, total_price, customer_id, restaurant_id, 
                                customer_name, customer_email, customer_phone, customer_full_address, order_time, tip, tax) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING order_number, restaurant_id, customer_name, order_date, order_time
            `, [orderObj.orderNumber, orderObj.orderDate, orderObj.totalPrice, orderObj.customerId, restaurantId,
                orderObj.customerName, orderObj.customerEmail, orderObj.customerPhone, orderObj.customerAddress,
                orderObj.orderTime, orderObj.tip, orderObj.tax]);

        const menuItemsValues =  orderObj.items.map( i => [orderObj.orderNumber, i.itemId, 
                                                            i.quantity, i.itemName, i.itemDescription,
                                                            i.itemPrice, i.itemTotal, i.itemNotes]);
        
        const menuQuery = format(`INSERT INTO orders_menuitems (order_number, item_id, quantity, 
                                    item_name, item_description, item_price, item_total, notes) VALUES %L`, 
                                    menuItemsValues);
        await db.query(menuQuery);

        return resOrder.rows[0]
    } 
 

    static async getOrder(oNum) {

        const result = await db.query(`
        SELECT om.id AS orderId, om.quantity, om.item_name, om.item_id,
                om.item_price, om.item_total, om.item_description, om.notes,
                o.order_date AS orderdate, o.order_time as ordertime, o.total_price AS totalprice, o.tip, o.tax,
                o.order_number AS ordernumber, o.restaurant_id AS restaurantId, o.customer_id AS customerId,
                o.customer_name AS customer_name, o.customer_phone AS phone, o.customer_email AS email,
                o.customer_full_address AS address, r.name AS restaurant_name
        FROM orders o 
        LEFT JOIN orders_menuitems om ON o.order_number = om.order_number 
        LEFT JOIN restaurants r ON o.restaurant_id = r.id
        WHERE o.order_number = $1;
        `, [oNum])

        if (result.rows.length === 0) throw new NotFoundError(`Order [${oNum}] not found`, 404);

        const { orderdate, 
                ordertime,
                totalprice, 
                tip,
                tax,
                customerid, 
                restaurantid, 
                restaurant_name,
                ordernumber, 
                customer_name,  
                phone, 
                email,
                address } = result.rows[0];

        const order = new Order(restaurantid, restaurant_name, ordernumber, 
                        new Date(orderdate).toLocaleDateString(), totalprice, customerid, ordertime, tip, tax);

        if ((result.rows[0].orderid !== null)) {
            order.items = result.rows.map( o => ({
                id: o.orderid,
                quantity: o.quantity,
                itemId: o.item_id,
                itemName: o.item_name, 
                itemDescription: o.item_description,
                itemNotes: o.notes,
                itemPrice: o.item_price, 
                itemTotal: o.item_total
            }))
        }

        order.customer = {
            ...order.customer,
            customerName: customer_name,
            address: address,
            phone: phone,
            email: email
        }

        return order;

    }


    async deleteOrder() {
        await db.query(`
            DELETE from orders WHERE order_number = $1
        `, [this.orderNumber]);

        return ({
            message: "Removed order from database",
            orderNumber: this.orderNumber
        })
    }


    async updateOrder(newOrder) {
        // Update values in the order table
        const updatedOrder = await db.query(`
            UPDATE orders 
            SET order_date = $1, total_price = $2, customer_id = $3, customer_name = $4, 
                customer_phone = $5, customer_email = $6, customer_full_address = $7, order_time = $8, tip = $9, tax = $10
            WHERE order_number = $11
            RETURNING *
        `, [newOrder.orderDate, newOrder.totalPrice, newOrder.customerId, newOrder.customerName, 
            newOrder.customerPhone, newOrder.customerEmail, newOrder.customerAddress, newOrder.orderTime, newOrder.tip, newOrder.tax, 
            this.orderNumber])

        // Update values in the orders_menuitems table

        const existingItemsId = []; // used to check against 

        // newOrder.items contains the patched order items
        newOrder.items.forEach(async i => {
            // check each item: 
            // if the order item does not have an id, then it must be a new addition so add to the orders_menuitems
            // if the order item contains an id, then it references an existing entry in orders_menuitems
            // So update the existing entry and log the id to verify against the old entry
            if (!("id" in i)) {
                await db.query(`
                    INSERT INTO orders_menuitems 
                        (order_number, item_id, quantity,
                        item_name, item_description, item_price, item_total, notes) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [this.orderNumber, i.itemId, i.quantity, i.itemName, i.itemDescription, i.itemPrice, i.itemTotal, i.itemNotes])

            } else {
                existingItemsId.push(i.id);
                await db.query(`
                    UPDATE orders_menuitems 
                    SET item_id = $1, quantity = $2, item_name = $3, item_description = $4, 
                        item_price = $5, item_total = $6, notes = $7 
                    WHERE id = $8
                `, [i.itemId, i.quantity, i.itemName, i.itemDescription, i.itemPrice, i.itemTotal, i.itemNote, i.id]);

            }
        });

        // this.items contains the old items list
        // existingItemsId contains the itemIds for entries that are part of the patch
        // For each item in the old items list, if the itemId does not appear in the existingItemsId
        // Then we delete that entry as it was not part of the patch
        this.items.forEach(async i => {
            if (!(existingItemsId.includes(i.id))) {
                await db.query(`
                    DELETE FROM orders_menuitems WHERE id = $1
                `, [i.id]);
            }
        });

        return ({
            message: "Order updated!",
            orderNumber: this.orderNumber
        })
    }



}

module.exports = Order;