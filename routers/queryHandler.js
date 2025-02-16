const connection = require('../db/connection');
const url = require('url');

/**
 * Function to validate queries and block dangerous SQL commands
 * Only allows SELECT and INSERT queries
 * Use ChatGPT to generate a list of dangerous SQL commands
 */
function isValidQuery(query) {
    const forbiddenCommands = ['UPDATE', 'DELETE', 'DROP', 'ALTER', 'TRUNCATE'];
    const upperQuery = (query || '').toUpperCase();
    
    return forbiddenCommands.every(cmd => !upperQuery.startsWith(cmd));
}

/**
 * Handles GET requests for SELECT queries
 */
function handleGetRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const urlParts = parsedUrl.split('/api/v1/sql/');
    const query = decodeURIComponent(urlParts[1]);
    
    // Only allow SELECT queries
    if (!query.toUpperCase().startsWith('SELECT')) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Only SELECT queries are allowed via GET' }));
        return;
    }

    // Block dangerous SQL commands
    if (!isValidQuery(query)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Forbidden query type detected' }));
        return;
    }

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
}

/**
 * Handles POST requests for INSERT queries
 */
function handlePostRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    let body = '';

    // Gather data from the request
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        let requestData;
        try {
            requestData = JSON.parse(body); // Parse the incoming JSON data
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
            return;
        }

        // Validate that the correct endpoint is being accessed
        const pathname = parsedUrl.pathname.replace(/\/$/, '');
        if (pathname !== '/api/v1/insert') {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Endpoint not found' }));
            return;
        }

        // Fetch the array of patients from the request data
        const { patients } = requestData;

        // Validate that patients is an array with at least one patient
        if (!Array.isArray(patients) || patients.length === 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patients data must be an array with at least one patient' }));
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
        const query = `INSERT INTO patients (name, birth_date) VALUES ${values}`;

        // Block dangerous SQL commands (to prevent SQL injection)
        if (!isValidQuery(query)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Forbidden query type detected' }));
            return;
        }

        // Execute the query
        connection.query(query, (err, results) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data inserted successfully', results }));
        });
    });
}

module.exports = { handleGetRequest, handlePostRequest };
