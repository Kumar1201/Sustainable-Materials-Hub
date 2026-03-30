const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'public', 'ecovera.db');
const db = new sqlite3.Database(dbPath);

console.log('Starting database migration...');

// Add firebase_uid column to users table if it doesn't exist
db.run(`ALTER TABLE users ADD COLUMN firebase_uid VARCHAR(128) UNIQUE`, (err) => {
  if (err) {
    if (err.message.includes('duplicate column name')) {
      console.log('firebase_uid column already exists');
    } else {
      console.error('Error adding firebase_uid column:', err.message);
    }
  } else {
    console.log('Added firebase_uid column to users table');
  }

  // Close the database
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database migration completed successfully');
    }
  });
});
