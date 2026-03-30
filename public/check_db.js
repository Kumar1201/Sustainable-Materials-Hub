const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ecovera.db');

db.all('SELECT sql FROM sqlite_master WHERE type="table" AND name="otps"', [], (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log('OTPs table schema:');
    console.log(rows[0].sql);
  }
  db.close();
});
