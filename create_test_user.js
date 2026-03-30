const sqliteDB = require('./public/sqlite_db.js');

async function createTestUser() {
  const userData = {
    mobile: '1234567890',
    firebaseUid: 'test-uid-123',
    name: 'Test User',
    role: 'seller' // initial role
  };

  const result = await sqliteDB.createUser(userData);
  console.log('Create user result:', result);
}

createTestUser().then(() => {
  console.log('Test user creation completed');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
