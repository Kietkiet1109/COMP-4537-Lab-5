const http = require('http');
const { handleGetRequest, handlePostRequest } = require('./routers/queryHandler');
const initDB = require('./db/init');

// Initialize database and table on startup
initDB;

const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': 'https://comp4537labs5.netlify.app',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end();
        return;
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://comp4537labs5.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    
    if (req.method === 'GET' && req.url.startsWith('/api/v1/sql/')) {
        handleGetRequest(req, res);
    } else if (req.method === 'POST' && req.url === '/api/v1/insert') {
        handlePostRequest(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Tommy and Kiet SQL Server running at http://localhost:${PORT}/`);
});
