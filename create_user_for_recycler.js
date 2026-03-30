const sqliteDB = require('./public/sqlite_db.js');

async function createUserForRecycler() {
  // First, try to get the user
  const existingUser = await sqliteDB.getUser('1234567890');
  if (existingUser.success) {
    console.log('User already exists:', existingUser.data);
    return;
  }

  // Create the user
  const userData = {
    mobile: '1234567890',
    firebaseUid: 'test-uid-recycler',
    name: 'Test Recycler',
    role: 'seller' // initial role, will be updated to buyer during setup
  };

  const result = await sqliteDB.createUser(userData);
  console.log('Create user result:', result);
}

createUserForRecycler().then(() => {
  console.log('User creation for recycler completed');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
