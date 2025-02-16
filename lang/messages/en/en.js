module.exports = {
    server: {
        invalidSQL: 'Forbidden query type detected',
        invalidURL: 'Endpoint not found',
        serverStart: `Tommy and Kiet's SQL Server running at http://localhost:`
    },

    connection: {
        connectError: 'Connection failed with error:', 
        connectSuccess: 'Connected to MySQL database'
    },

    database: {
        createDatabase: 'CREATE DATABASE IF NOT EXISTS lab5',
        databaseReady: 'Database "lab5" is ready',
        createTable: `
                    CREATE TABLE IF NOT EXISTS patients (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        dateOfBirth DATE NOT NULL
                    ) ENGINE=InnoDB;
                    `,
        tableReady: 'Table "patients" is ready'
    },

    query: {
        getError: 'Get query failed',
        insertError: 'Data inserted failed',
        insertSuccess: 'Data inserted successfully',
        invalidJSON: 'Invalid JSON format', 
        noData: 'Patients data must be an array with at least one patient',
        insertQuery: 'INSERT INTO patients (name, dateOfBirth) VALUES',
    }
};
