

const express = require("express");

const Restaurant = require("../models/restaurant.js");
const Order = require("../models/order.js");
 

const router = new express.Router();

// Get Order Details
// GET: /:orderNumber 
router.get("/:oNum", async (req, res, next) => {
    try {
        const order = await Order.getOrder(req.params.oNum);
        return res.status(201).json(order);
    } catch(e) {
        return next(e);
    }
})

// Delete Order
// DELETE: /:orderNumber
router.delete("/:oNum", async (req, res, next) => {
    try {
        const order = await Order.getOrder(req.params.oNum);
        const removed = await order.deleteOrder();
        return res.json(removed);
    } catch(e) {
        return next(e);
    }
})


// Update an order
/* 
Patch Object: {
    orderDate,
    totalPrice,
    cusomter: {
        customerId: 
    },
    items: [

    ]
}
*/

router.patch("/:oNum", async (req, res, next) => {
    try {
        const order = await Order.getOrder(req.params.oNum);
        // order.orderDate = req.body.orderDate;
        // order.totalPrice = req.body.totalPrice;
        // order.customer.customerId = req.body.customerId;
        // order.newItems = req.body.items;
        await order.updateOrder(req.body);
        return res.json({message: `Order ${req.params.oNum} Updated!`, orderNumber: req.params.oNum});
    } catch(e) {
        return next(e);
    }
})


module.exports = router;
