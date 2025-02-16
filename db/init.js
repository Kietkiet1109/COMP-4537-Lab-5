const mysql = require('mysql2');
const dbConfig = require('./connection');
const messages = require('../lang/messages/en/en');

// Create connection without specifying the database
const tempConnection = mysql.createConnection({
    host: dbConfig.config.host,
    user: dbConfig.config.user,
    password: dbConfig.config.password
});

// Create the database if it doesn’t exist
tempConnection.query(messages.database.createDatabase, (err) => {
    if (err) throw err;
    console.log(messages.database.databaseReady);
});

// Use the actual database connection
dbConfig.query(messages.database.createTable, (err) => {
    if (err) throw err;
    console.log(messages.database.tableReady);
});

// Close temporary connection
tempConnection.end();
