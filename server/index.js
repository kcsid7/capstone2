const express = require("express");
const cors = require("cors");


// Errors
const { ExpressError, NotFoundError } = require("./expressError.js");

// Middlewares
const { verifyJWT } = require("./middlewares/verifyJWT.js");

// Routes
const restaurantRoutes = require("./routes/restaurant.js");
const orderRoutes = require("./routes/order.js");
const customerRoutes = require("./routes/customer.js");
const ownerRoutes = require("./routes/owner.js");
const menuItemRoutes = require("./routes/menuItem.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyJWT); // Verify JWT middleware, checks for authToken

app.use("/res", restaurantRoutes);
app.use("/order", orderRoutes);
app.use("/customer", customerRoutes);
app.use("/owner", ownerRoutes);
app.use("/menuitem", menuItemRoutes);


app.get("/", function(req, res, next) {
    res.status(200).json({
        message: "Hello World!"
    })
})


// 404 Errors
app.use(function(req, res, next) {
    return next(new NotFoundError());
})

// Generic Error Handler
app.use(function(err, req, res, next) {
    return res.status(err.status).json({
        type: "Error",
        message: err.message,
        status: err.status
    })
})

module.exports = app;

