const mysql = require('mysql2');

const connection = mysql.createConnection({
    socketPath: "/cloudsql/sharp-imprint-451101-e6:us-central1:comp4537labs5",
    user: "root",
    password: "kiet",
    database: "sys",
    port: 3306,
});

connection.connect(function(err) {
    if (err) {
        console.error("Connection failed with error: ", err);
        return;
    }
    console.log("Connected!");
});

module.exports = connection;
