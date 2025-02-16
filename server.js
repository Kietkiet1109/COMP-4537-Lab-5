const http = require('http');
const { handleGetRequest, handlePostRequest } = require('./routers/queryHandler');
const initDB = require('./db/init');

// Initialize database and table on startup
initDB;

const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/lab5/api/v1/sql/')) {
        handleGetRequest(req, res);
    } else if (req.method === 'POST' && req.url === '/lab5/api/v1/sql') {
        handlePostRequest(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Tommy and Kiet SQL Server running at http://localhost:${PORT}/`);
});

