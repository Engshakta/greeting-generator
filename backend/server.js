const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/greet', (req, res) => {
  const name = req.query.name || 'Stranger';
  const greetings = [
    `Hello, ${name}!`,
    `Hi there, ${name}!`,
    `Greetings, ${name}!`,
    `Hey, ${name}!`
  ];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  res.send(randomGreeting);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});