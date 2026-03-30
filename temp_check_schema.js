const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./public/ecovera.db');

db.all('SELECT sql FROM sqlite_master WHERE type="table" AND name="users"', [], (err, rows) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Users table schema:', rows[0].sql);
  }
  db.close();
});
