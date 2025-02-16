const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'lab5-do-user-18795572-0.l.db.ondigitalocean.com',
    user: "doadmin",
    password: "AVNS_kNzd4GNmLiuIHPAcw9F",
    database: "defaultdb",
    port: 25060,
});

connection.connect(function(err) {
    if (err) {
        console.error("Connection failed with error: ", err);
        return;
    }
    console.log("Connected!");
});

module.exports = connection;
