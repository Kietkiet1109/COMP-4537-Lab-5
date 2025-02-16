require('dotenv').config();
const mysql = require('mysql2');
const messages = require('../lang/messages/en/en');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    multipleStatements: process.env.DB_MULTIPLE_STATEMENTS === 'true',
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT, 10)
});

connection.connect(function(err) {
    if (err) {
        console.error(`${messages.connection.connectError} ${err}`);
        return;
    }
    console.log(messages.connection.connectSuccess);
});

module.exports = connection;
