const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from localhost:5173

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = 5000; // Use 5000 for now
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});