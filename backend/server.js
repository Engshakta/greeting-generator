const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http'); // Add this dependency
const app = express();

app.use(cors());
app.use(express.json());

const fallbackGreetings = ["Hello, {name}!", "Greetings, {name}!", "Hi there, {name}!"];
app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  const randomGreeting = fallbackGreetings[Math.floor(Math.random() * fallbackGreetings.length)];
  const greeting = randomGreeting.replace('{name}', name);
  res.json({ greeting });
});

module.exports.handler = serverless(app); // Export for Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));