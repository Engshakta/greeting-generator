const express = require('express'); // Import Express
const app = express(); // Create an Express app

// Define a GET endpoint at the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello World'); // Send "Hello World" as the response
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});