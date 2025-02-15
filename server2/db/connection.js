const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "Kiet",
    password: "YeuHoangKimTu5Tuoi@",
    database: "sys"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;

