

const express = require("express");

const Restaurant = require("../models/restaurant.js");
const Order = require("../models/order.js");

const {checkForUser} = require("../middlewares/checkForUser.js");
const {checkOwner} = require("../middlewares/checkOwner.js");
 

const router = new express.Router();

// Get Order Details
// GET: /:orderNumber 
router.get("/:oNum", checkForUser, async (req, res, next) => {
    try {
        const order = await Order.getOrder(req.params.oNum);
        return res.status(200).json(order);
    } catch(e) {
        return next(e);
    }
})

// Delete Order
// DELETE: /:orderNumber
router.delete("/:oNum", checkOwner, async (req, res, next) => {
    try {
        const order = await Order.getOrder(req.params.oNum);
        const removed = await order.deleteOrder();
        return res.status(200).json(removed);
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

router.patch("/:oNum", checkOwner, async (req, res, next) => {
    try {
        const order = await Order.getOrder(req.params.oNum);
        // order.orderDate = req.body.orderDate;
        // order.totalPrice = req.body.totalPrice;
        // order.customer.customerId = req.body.customerId;
        // order.newItems = req.body.items;
        await order.updateOrder(req.body);
        return res.status(201).json({message: `Order ${req.params.oNum} Updated!`, orderNumber: req.params.oNum});
    } catch(e) {
        return next(e);
    }
})


module.exports = router;
