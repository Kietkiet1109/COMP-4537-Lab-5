const url = require('url');
const connection = require('../db/connection');
const messages = require('../lang/messages/en/en');

/**
 * Handles GET requests for SELECT SQL
 * ChatGPT use as a reference of this function
 */
function handleGetRequest(req, res, query) {

    // Create the database if it doesn’t exist
    connection.query(messages.database.createDatabase, (err) => {
        if (err) throw err;
        console.log(messages.database.databaseReady);
    });
    
    // Execute the SELECT query
    connection.query(query, (err, results) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: messages.query.getError }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
}

/**
 * Handles POST requests for INSERT SQL
 * ChatGPT use as a reference of this function
 */
function handlePostRequest(req, res, query) {

    // Create the database if it doesn’t exist
    connection.query(messages.database.createDatabase, (err) => {
        if (err) throw err;
        console.log(messages.database.databaseReady);
    });
    
    // Execute the INSERT query
    connection.query(query, (err, results) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: messages.query.postError }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: messages.query.insertSuccess, results } ));
    });
}

/**
 * Handles POST requests for INSERT button
 * ChatGPT use as a reference of this function
 */
function handleButtonRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    let body = '';

    // Gather data from the request
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        // Create the database if it doesn’t exist
        connection.query(messages.database.createDatabase, (err) => {
            if (err) throw err;
            console.log(messages.database.databaseReady);
        });
        
        let requestData;
        try {
            // Parse the incoming JSON data
            requestData = JSON.parse(body); 
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: messages.query.invalidJSON }));
            return;
        }

        // Validate that the correct endpoint is being accessed
        const pathname = parsedUrl.pathname.replace(/\/$/, '');
        if (pathname !== '/api/v1/insert') {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: messages.server.invalidURL }));
            return;
        }

        // Fetch the array of patients from the request data
        const { patients } = requestData;

        // Validate that patients is an array with at least one patient
        if (!Array.isArray(patients) || patients.length === 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: messages.query.noData }));
            return;
        }

        // Generate the SQL insert statement for multiple rows
        const values = patients.map(patient => {
            // Escape strings to prevent SQL injection
            const name = connection.escape(patient.name);
            const dateOfBirth = connection.escape(patient.dateOfBirth);
            return `(${name}, ${dateOfBirth})`;  // Format each patient as a row
        }).join(', ');  // Join all the rows with commas
        
        // Construct the SQL query to insert multiple rows at once
        const query = `${messages.query.insertQuery} ${values}`;

        // Execute the query
        connection.query(query, (err, results) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: messages.query.insertError }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: messages.query.insertSuccess, results }));
        });
    });
}

module.exports = { handleGetRequest, handlePostRequest, handleButtonRequest };
