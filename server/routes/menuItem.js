const express = require("express");

const MenuItem = require("../models/menuItem.js");

const router = new express.Router();



// Get Food Items Search
router.get("/", async (req, res, next) => {
    const queryP = req.query;
    if (queryP.maxPrice !== undefined) queryP.maxPrice = +queryP.maxPrice;
    try {
        const menuItem = await MenuItem.queryItem(queryP);
        return res.json(menuItem);
    } catch (e) {
        
    }
})

module.exports = router;