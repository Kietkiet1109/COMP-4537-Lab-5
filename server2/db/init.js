const mysql = require('mysql');
const dbConfig = require('./connection');

// Create connection without specifying the database
const tempConnection = mysql.createConnection({
    host: dbConfig.config.host,
    user: dbConfig.config.user,
    password: dbConfig.config.password
});

// Create the database if it doesn’t exist
tempConnection.query('CREATE DATABASE IF NOT EXISTS lab5_db', (err) => {
    if (err) throw err;
    console.log('Database "lab5_db" is ready.');
});

// Use the actual database connection
dbConfig.query(`
    CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        birth_date DATE NOT NULL
    ) ENGINE=InnoDB;
`, (err) => {
    if (err) throw err;
    console.log('Table "patients" is ready.');
});

// Close temporary connection
tempConnection.end();
