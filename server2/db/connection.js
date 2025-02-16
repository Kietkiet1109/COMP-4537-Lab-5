const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "34.173.164.211" || "localhost",
    user: "root" || "Kiet",
    password: "" || "YeuHoangKimTu5Tuoi@",
    database: "lab5" || "sys"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;
