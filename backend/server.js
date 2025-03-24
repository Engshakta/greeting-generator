const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('greetings.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // Create greetings table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS greetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Greetings table created or already exists.');
          // Check if the table is empty, and insert sample greetings
          db.get('SELECT COUNT(*) AS count FROM greetings', (err, row) => {
            if (err) {
              console.error('Error checking table:', err.message);
            } else if (row.count === 0) {
              const sampleGreetings = [
                'Hello, %s!',
                'Greetings, %s!',
                'Hi there, %s!',
                'Welcome, %s!',
                'Hey, %s!'
              ];
              const insertStmt = db.prepare('INSERT INTO greetings (message) VALUES (?)');
              sampleGreetings.forEach((greeting) => {
                insertStmt.run(greeting, (err) => {
                  if (err) {
                    console.error('Error inserting greeting:', err.message);
                  }
                });
              });
              insertStmt.finalize((err) => {
                if (err) {
                  console.error('Error finalizing statement:', err.message);
                } else {
                  console.log('Sample greetings inserted.');
                }
              });
            } else {
              console.log('Greetings already exist in the table.');
            }
          });
        }
      }
    );
  }
});

app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  // Get a random greeting from the database
  db.get('SELECT message FROM greetings ORDER BY RANDOM() LIMIT 1', (err, row) => {
    if (err) {
      console.error('Error fetching greeting:', err.message);
      res.status(500).send('Internal Server Error');
    } else if (row) {
      const greeting = row.message.replace('%s', name);
      res.send(greeting);
    } else {
      res.status(404).send('No greetings found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Close the database when the server stops
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});