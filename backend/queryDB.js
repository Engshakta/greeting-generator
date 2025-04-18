const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('greetings.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to SQLite database.');

  // List tables
  db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
    if (err) {
      console.error('Error listing tables:', err.message);
      return;
    }
    console.log('Tables:', tables);

    // Count greetings
    db.get('SELECT COUNT(*) AS count FROM greetings', (err, row) => {
      if (err) {
        console.error('Error counting greetings:', err.message);
        return;
      }
      console.log('Number of greetings:', row.count);

      // List all greetings
      db.all('SELECT * FROM greetings', (err, rows) => {
        if (err) {
          console.error('Error fetching greetings:', err.message);
          return;
        }
        console.log('Greetings:', rows);

        // Close the database
        db.close((err) => {
          if (err) {
            console.error('Error closing database:', err.message);
          }
          console.log('Database connection closed.');
        });
      });
    });
  });
});