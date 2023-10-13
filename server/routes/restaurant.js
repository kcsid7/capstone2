
const express = require("express");

const Restaurant = require("../models/restaurant.js");

const MenuItem = require("../models/menuItem.js");

const { checkOwner } = require("../middlewares/checkOwner.js");


const router = new express.Router();

// Gets info about all restaurants in the database
// GET: res/
router.get("/", async (req, res, next) => {
    try {
        const restaurants = await Restaurant.getAllInfo();
        return res.status(200).json(restaurants);
    } catch (e) {
        return next(e);
    }
})

// Adds new restaurant 
/*
req.body = {
    "name": "Dumpling Place",
    "streetAddress": "20 Common Pl",
    "city": "Los Angeles",
    "state": "California",
    "phone": 128768711,
    "email": "momo@momo.com",
    "owner": "owner1"
}
*/
router.post("/new", checkOwner, async (req, res, next) => {
    try {
        const newRestaurant = await Restaurant.createNew(req.body);
        return res.status(201).json(newRestaurant);
    } catch (e) {
        return next(e);
    }
})


// Get restaurant info by restaurant id
// GET: /:restaurant-id
router.get("/:id", async(req, res, next) => {
    try {
        const restaurant = await Restaurant.get(req.params.id)
        return res.status(200).json(restaurant);

    } catch(e) {
        return next(e)
    }
})


// Delete Restaurant From Database
// DELETE: /:restaurant-id/delete
router.delete("/:id/delete", checkOwner, async(req, res, next) => {
    try {
        const restaurant = await Restaurant.get(req.params.id);
        const removed = await restaurant.deleteRestaurant();
        return res.status(200).json(removed);
    } catch (e) {
        return next(e);
    }
})


// Update Restaurant
// PATCH /:restaurant-id/update
router.patch("/:id/update", checkOwner, async(req, res, next) => {
    try {
        const restaurant = await Restaurant.updateRestaurant(req.body, req.params.id)
        console.log(restaurant);
        return res.status(200).json(restaurant)
    } catch(e) {
        return next(e);
    }
})



// Add a new menu item to the restaurant
// POST: /:restaurant-id/menu/add
// Req.body takes an object with {name, description, type, price, image}
router.post("/:id/menu/add", checkOwner, async (req, res, next) => {
    try {
        const restaurant = await Restaurant.get(req.params.id);
        const newItem = await restaurant.createNewMenuItem(req.body);
        res.status(201).json(newItem);
    } catch(e) {
        return next(e);
    }
})


// Delete a menu item by ID
// DELETE: /:restaurant-id/menu/:menuId/delete
router.delete("/:id/menu/:menuId/delete", checkOwner, async (req, res, next) => {
    try {
        const menuItem = await MenuItem.getById(req.params.menuId);
        const removed = await menuItem.removeItem();
        return res.status(200).json(removed);
    } catch(e) {
        return next(e);
    }
})


// Update Menu Item
// PATCH: /:restaurant-id/menu/:menuId/update
router.patch("/:id/menu/:menuId/update", checkOwner, async (req, res, next) => {
    try {
        const menuItem = await MenuItem.getById(req.params.menuId);
        menuItem.name = req.body.name;
        menuItem.description = req.body.description;
        menuItem.type = req.body.type;
        menuItem.price = req.body.price;
        menuItem.image = req.body.image;
        const newItem = await menuItem.updateItem();
        return res.status(200).json(newItem);
    } catch(e) {
        return next(e);
    }
})


// Get all restaurant orders
// GET: /:restaurant-id/orders
router.get("/:id/orders", checkOwner, async(req, res, next) => {
    try {
        const restaurant = await Restaurant.get(req.params.id);
        const orders = await restaurant.getAllOrders();
        return res.status(200).json(orders);

    } catch(e) {
        return next(e)
    }
})

// Order From Restaurant
// POST: /:restaurant-id/order
/*
req.body.orderObj: {   order_number, order_date, total, customer_id, items: menuItems  }
menuItems: [{ menu_item, quantity }, { menu_item, quantity }]
*/
router.post("/:id/order", async(req, res, next) => {
    try {
        const restaurant = await Restaurant.get(req.params.id);
        const order = await restaurant.placeOrder(req.body); 

        res.status(201).json({
            message: "Order Placed!",
            orderNumber: order.order_number,
            customer: order.customer_name,
            restaurant: order.restaurant_id
        });

        // res.redirect(`/${req.params.id}/order/${order.order_number}`)

    } catch (e) {
        return next(e);
    }
})

// Get additional details about an order using the order number
// GET: /:restaurant-id/order/:order-number
router.get("/:id/order/:oNum", async(req, res, next) => {
    try {
        const restaurant = await Restaurant.get(req.params.id);
        const order = await restaurant.getOrderDetails(req.params.oNum);
        return res.status(200).json(order);
    } catch(e) {
        return next(e);
    }
})


module.exports = router;