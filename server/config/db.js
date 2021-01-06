const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "details"
});

module.exports = db;