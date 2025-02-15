const sqlQuery = document.getElementById('sql-query');
const result = document.getElementById('result');

// Function to insert multiple patients
// ChatGPT use as a references of this function
async function insert() {
    const patients = messages.patients;
    result.textContent = ""

    try {
        const response = await axios.post('https://goldfish-app-35546.ondigitalocean.app/insert', patients);
        result.innerHTML = `${messages.serverResponse} ${response.data.message}`;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        result.innerHTML = messages.insertError;
    }
}

// Function to execute SELECT or INSERT queries from the textarea
// ChatGPT use as a references of this function
async function execute() {
    const query = sqlQuery.value.trim();

    if (query) {
        try {
            const response = await axios.post('https://goldfish-app-35546.ondigitalocean.app/sql/', {
                query
            });
            result.innerHTML = `${messages.serverResponse} ${JSON.stringify(response.data)}`;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            result.innerHTML = messages.executeError;
        }
    } else {
        result.innerHTML = messages.SQLEmpty;
    }
}
