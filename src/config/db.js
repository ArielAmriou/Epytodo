/* init sql */
var mysql = require('mysql2');

/* init dotenv */
const host = process.env.MYSQL_HOST;
const password = process.env.MYSQL_ROOT_PASSWORD;
const database = process.env.MYSQL_DATABASE;

var con = mysql.createConnection({
    host: host,
    user: "root",
    password: password,
    database: database,
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

module.exports = con;
