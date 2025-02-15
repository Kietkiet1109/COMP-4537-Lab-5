// at command prompt switch to the current directory of this file
// enter>npm install mysql
const mysql = require("mysql2");

// Create connection
const con = mysql. createConnection({
    host: "localhost",
    user: "Kiet",
    password: "YeuHoangKimTu5Tuoi@",
    database: "sys"
});

// Connect to MySQL to run SQL query
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
