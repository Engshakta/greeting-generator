const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();

app.use(cors());
app.use(express.json());

// Add a root endpoint
app.get('/', (req, res) => {
  res.json({ message: "Greeting API is running" });
});

const fallbackGreetings = ["Hello, {name}!", "Greetings, {name}!", "Hi there, {name}!"];

// Support both /greet (for Vercel) and /api/greet (for local testing)
app.get(['/greet', '/api/greet'], (req, res) => {
  const name = req.query.name || 'Guest';
  const randomGreeting = fallbackGreetings[Math.floor(Math.random() * fallbackGreetings.length)];
  const greeting = randomGreeting.replace('{name}', name);
  res.json({ greeting });
});

module.exports.handler = serverless(app);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}