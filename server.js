const http = require('http');
const url = require('url');
const { handleGetRequest, handlePostRequest, handleButtonRequest } = require('./routers/queryHandler');
const initDB = require('./db/init');
const messages = require('./lang/messages/en/en');

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for your Netlify frontend
app.use(cors({
    origin: 'https://comp4537labs5.netlify.app',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

// Initialize database and table on startup
initDB;

const PORT = 8080;

const server = http.createServer((req, res) => {

    // // Set CORS headers
    // if (req.method === 'OPTIONS') {
    //     res.setHeader('Access-Control-Allow-Origin', 'https://comp4537labs5.netlify.app');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //     res.writeHead(204);
    //     return res.end();
    // }

    // Execute button
    if (req.method === 'GET' && req.url.startsWith('/api/v1/sql/')) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const urlParts = pathname.split('/api/v1/sql/');
        const query = decodeURIComponent(urlParts[1]);

        // Select through SQL
        if (query.toUpperCase().startsWith('SELECT')) {
            handleGetRequest(req, res, query);
        }

        // Insert through SQL
        else if (query.toUpperCase().startsWith('INSERT')) {
            handlePostRequest(req, res, query);
        }

        // Non Select or Insert
        else {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: messages.server.invalidSQL }));
        }
    } 

    // Insert button
    else if (req.method === 'POST' && req.url === '/api/v1/insert') {
        handleButtonRequest(req, res);
    } 

    // Invalid URL
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: messages.server.invalidURL }));
    }
});

server.listen(PORT, () => {
    console.log(`${messages.server.serverStart}${PORT}`);
});
