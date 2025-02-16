const executeButton = document.getElementById('execute-button');
const insertButton = document.getElementById('insert-button');
const sqlQuery = document.getElementById('sql-query');
const result = document.getElementById('result');

/**
 * Function to insert multiple patients
 */
insertButton.addEventListener('click', async () => {
    const patients = messages.patients;
    result.textContent = "";

    try {
        const response = await axios.post('https://comp-4537-labs-5-tb866.ondigitalocean.app/COMP4537/labs/5/api/v1/insert', {
            patients
        });

        // Handle JSON response and display formatted output
        result.innerHTML = `<strong>${messages.serverResponse}:</strong> <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        result.innerHTML = `<strong>${messages.insertError}:</strong> <pre>${JSON.stringify(error.response?.data || error.message, null, 2)}</pre>`;
    }
});

/**
 * Function to execute SELECT queries from the textarea
 */
executeButton.addEventListener('click', async () => {
    const query = sqlQuery.value;

    if (!query) {
        result.innerHTML = `<strong>${messages.SQLEmpty}</strong>`;
        return;
    }

    try {
        // API URL for GET request to fetch data
        const apiUrl = 'https://comp-4537-labs-5-tb866.ondigitalocean.app/COMP4537/labs/5/api/v1/sql/' + encodeURIComponent(query);

        const response = await axios.get(apiUrl);

        // Display the response data in formatted JSON
        result.innerHTML = `<strong>${messages.serverResponse}:</strong> <pre>${JSON.stringify(response.data, null, 2)}</pre>`;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        result.innerHTML = `<strong>${messages.executeError}:</strong> <pre>${JSON.stringify(error.response?.data || error.message, null, 2)}</pre>`;
    }
});
