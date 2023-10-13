const express = require("express");

const jwt = require("jsonwebtoken");

// Middlewares
const { createToken } = require("../helpers/createToken.js");
const { checkCorrectUser } = require("../middlewares/checkCorrectUser.js");

const Customer = require("../models/customer.js");

// Router : /customer
const router = express.Router();

// ADMIN ONLY
// Get All Customers 
// GET: /customer/all
router.get("/all", async (req, res, next) => {
    try {
        const customer = await Customer.findAll();
        return res.status(201).json(customer);
    } catch(e) {
        return next(e);
    }
})


// USER or ADMIN ONLY
// GET a customer by their username
// GET: /customer/:username
// checkCorrectUser Middleware verifies the correct user token
router.get("/:username", checkCorrectUser, async (req, res, next) => {
    try {
        const customer = await Customer.getDetailedInfo(req.params.username);
        return res.status(200).json(customer);
    } catch(e) {
        return next(e);
    }
})


// Get customer orders
// GET: /customer/:username/orders
router.get("/:username/orders", checkCorrectUser, async (req, res, next) => {
    try {
        const orders = await Customer.getCustomerOrders(req.params.username);
        return res.status(200).json(orders);
    } catch(e) {
        return next(e);
    }
})


// Register a new customer 
// POST: /customer/register
router.post("/register", async (req, res, next) => {
    try  {  
        const newCustomer = await Customer.register(req.body);
        const authToken = createToken(newCustomer)
        return res.status(201).json({newCustomer, authToken});
    
    } catch(e) {
        console.log("Register Owner", e);
        return next(e);
    }
})

// Login customer 
// POST: /customer/login
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const customer = await Customer.authenticate(username, password);
        const authToken = createToken(customer);

        return res.status(200).json({customer, authToken});

    } catch (e) {
        console.log(e);
        return next(e);
    }
})


// PATCH customer (Update)
// PATCH: /customer/:username
router.patch("/:username", async (req, res, next) => {
    try {
        console.log("PATCH /customer/")
        const updatedCustomer = await Customer.updateCustomer(req.body, req.params.username)
        return res.status(200).json(updatedCustomer)
    } catch (e) {
        return next(e);
    }
})









module.exports = router;
