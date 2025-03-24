const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fallback greetings if SQLite fails
const fallbackGreetings = [
    'Hello, %s!',
    'Greetings, %s!',
    'Hi there, %s!',
    'Welcome, %s!',
    'Hey, %s!'
];

// Initialize SQLite database
let db;
try {
    db = new sqlite3.Database('greetings.db', (err) => {
        if (err) {
            console.error('Failed to connect to SQLite database:', err.message);
            console.log('Falling back to in-memory greetings.');
            return;
        }
        console.log('Connected to SQLite database.');

        // Create greetings table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS greetings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
                return;
            }

            // Check if the table is empty
            db.get('SELECT COUNT(*) as count FROM greetings', (err, row) => {
                if (err) {
                    console.error('Error checking table:', err.message);
                    return;
                }
                if (row.count === 0) {
                    // Insert sample greetings
                    const insertStmt = db.prepare('INSERT INTO greetings (message) VALUES (?)');
                    const greetings = [
                        'Hello, %s!',
                        'Greetings, %s!',
                        'Hi there, %s!',
                        'Welcome, %s!',
                        'Hey, %s!'
                    ];
                    greetings.forEach((greeting) => {
                        insertStmt.run(greeting);
                    });
                    insertStmt.finalize();
                    console.log('Sample greetings inserted.');
                }
            });
        });
    });
} catch (err) {
    console.error('SQLite initialization failed:', err.message);
    console.log('Falling back to in-memory greetings.');
}

// Function to get a random greeting
const getRandomGreeting = (name, greetings) => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    const greeting = greetings[randomIndex];
    return greeting.replace('%s', name);
};

// Greet endpoint
app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';

  if (db) {
      db.all('SELECT message FROM greetings', (err, rows) => {
          if (err) {
              console.error('Error fetching greetings:', err.message);
              const greeting = getRandomGreeting(name, fallbackGreetings);
              res.json({ greeting });
          } else if (rows.length === 0) {
              const greeting = getRandomGreeting(name, fallbackGreetings);
              res.json({ greeting });
          } else {
              const greetings = rows.map(row => row.message);
              const greeting = getRandomGreeting(name, greetings);
              res.json({ greeting });
          }
      });
  } else {
      const greeting = getRandomGreeting(name, fallbackGreetings);
      res.json({ greeting });
  }
});

// Add this to handle Vercel's /api/greet route locally
app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'Guest';

  if (db) {
      db.all('SELECT message FROM greetings', (err, rows) => {
          if (err) {
              console.error('Error fetching greetings:', err.message);
              const greeting = getRandomGreeting(name, fallbackGreetings);
              res.json({ greeting });
          } else if (rows.length === 0) {
              const greeting = getRandomGreeting(name, fallbackGreetings);
              res.json({ greeting });
          } else {
              const greetings = rows.map(row => row.message);
              const greeting = getRandomGreeting(name, greetings);
              res.json({ greeting });
          }
      });
  } else {
      const greeting = getRandomGreeting(name, fallbackGreetings);
      res.json({ greeting });
  }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});