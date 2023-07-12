
const { Client } = require("pg");
const { getDatabaseURI } = require("./config.js");
const { get } = require(".");

let db;

if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseURI(),
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    db = new Client({
        connectionString: getDatabaseURI()
    });
}

db.connect();

module.exports = db;
