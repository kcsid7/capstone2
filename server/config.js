
require("dotenv").config();
require("colors");

const PORT = +process.env.PORT || 5000;

const BCRYPT_WORK_FACTOR = 12;

const SECRET_KEY = process.env.SECRET_KEY || "sNeSPbeRBLzRvAbX"

const getDatabaseURI = () => {
    if (process.env.NODE_ENV === "test") {
        console.log("Using Test Database")
        return "postgresql:///res_manager_test"
    } else {
        return process.env.DATABASE_URL || "postgresql:///res_manager"
    }
}

console.log("Database:".yellow, getDatabaseURI());


module.exports = {
    PORT,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    getDatabaseURI
}