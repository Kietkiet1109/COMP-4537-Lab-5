const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '34.173.164.211',
    user: "root",
    password: "kiet",
    database: "lab5",
    port: 3306,
    multipleStatements: false,
    connectTimeout: 15000
});

connection.connect(function(err) {
    if (err) {
        console.error("Connection failed with error: ", err);
        return;
    }
    console.log("Connected!");
});

module.exports = connection;
