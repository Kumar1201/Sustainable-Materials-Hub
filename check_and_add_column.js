const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./public/ecovera.db');

db.all("PRAGMA table_info(orders)", [], (err, rows) => {
  if (err) {
    console.error('Error getting table info:', err);
    db.close();
    return;
  }

  const columns = rows.map(row => row.name);
  console.log('Current columns in orders table:', columns);

  if (columns.includes('recycler_id')) {
    console.log('recycler_id column already exists');
    db.close();
  } else {
    console.log('recycler_id column missing, adding it...');
    db.run('ALTER TABLE orders ADD COLUMN recycler_id INTEGER', (err) => {
      if (err) {
        console.error('Error adding recycler_id column:', err.message);
      } else {
        console.log('recycler_id column added successfully');
      }
      db.close();
    });
  }
});
