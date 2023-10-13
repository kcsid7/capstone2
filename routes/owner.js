const express = require("express");

const jwt = require("jsonwebtoken");

// Middlewares
const { createOwnerToken } = require("../helpers/createOwnerToken.js");
const { checkOwner } = require("../middlewares/checkOwner.js");
const { checkCorrectUser } = require("../middlewares/checkCorrectUser.js");


const Owner = require("../models/owner.js");

const router = express.Router();


// Register a new owner 
// POST: /owner/register
router.post("/register", async (req, res, next) => {
    try  {  
        const newOwner = await Owner.register(req.body);
        const authToken = createOwnerToken(newOwner)
        return res.status(201).json({newOwner, authToken});
    
    } catch(e) {
        console.log(e);
        return next(e);
    }
})


// Login owner 
// POST: /owner/login
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const owner = await Owner.authenticate(username, password);
        const authToken = createOwnerToken(owner);

        return res.status(200).json({owner, authToken});

    } catch (e) {
        console.log(e);
        return next(e);
    }
})


// USER or ADMIN ONLY
// GET detailed info about an owner by their username
// GET: /owner/:username
router.get("/:username", checkOwner, checkCorrectUser, async (req, res, next) => {
    try {
        const owner = await Owner.getDetailedInfo(req.params.username);
        return res.status(200).json(owner);
    } catch(e) {
        return next(e);
    }
})


// PATCH owner (Update)
// PATCH: /owner/:username
router.patch("/:username", checkOwner, checkCorrectUser, async (req, res, next) => {
    try {
        console.log("PATCH /owner/")
        const updatedOwner = await Owner.updateOwner(req.body, req.params.username)
        return res.status(200).json(updatedOwner)
    } catch (e) {
        return next(e);
    }
})






module.exports = router;
