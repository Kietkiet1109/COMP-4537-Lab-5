module.exports = {
    database: {
        connectionSuccess: 'Connected to MySQL database.',
        connectionError: 'Database connection failed:',
        databaseReady: 'Database "lab5_db" is ready.',
        tableReady: 'Table "patients" is ready.'
    },
    server: {
        start: `Tommy and Kiet's SQL Server running at http://localhost:`,
        notFound: 'Endpoint not found'
    },
    query: {
        invalidJSON: 'Invalid JSON format',
        forbiddenQuery: 'Forbidden query type detected',
        onlySelectAllowed: 'Only SELECT queries are allowed via GET',
        onlyInsertAllowed: 'Only INSERT queries are allowed via POST',
        insertSuccess: 'Data inserted successfully',
        executionError: 'Error executing query'
    }
};

