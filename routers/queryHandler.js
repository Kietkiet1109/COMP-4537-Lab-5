const connection = require('../db/connection');
const url = require('url');

/**
 * Function to validate queries and block dangerous SQL commands
 * Only allows SELECT and INSERT queries
 * Use ChatGPT to generate a list of dangerous SQL commands
 */
function isValidQuery(query) {
    const forbiddenCommands = ['UPDATE', 'DELETE', 'DROP', 'ALTER', 'TRUNCATE'];
    const upperQuery = query.toUpperCase();

    return forbiddenCommands.every(cmd => !upperQuery.startsWith(cmd));
}

/**
 * Handles GET requests for SELECT queries
 */
function handleGetRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const query = decodeURIComponent(parsedUrl.pathname.replace('/lab5/api/v1/sql/', ''));

    // Only allow SELECT queries
    if (!query.startsWith('SELECT')) {
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
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        let requestData;
        try {
            requestData = JSON.parse(body);
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
            return;
        }

        const { query } = requestData;

        // Only allow INSERT queries
        if (!query || !query.startsWith('INSERT')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Only INSERT queries are allowed via POST' }));
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
            res.end(JSON.stringify({ message: 'Data inserted successfully', results }));
        });
    });
}

module.exports = { handleGetRequest, handlePostRequest };
