const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./public/ecovera.db');

db.run('ALTER TABLE orders ADD COLUMN recycler_id INTEGER', (err) => {
  if (err) {
    console.error('Error adding recycler_id column:', err.message);
  } else {
    console.log('recycler_id column added successfully');
  }
  db.close();
});
