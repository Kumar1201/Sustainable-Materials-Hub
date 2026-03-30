const sqliteDB = require('./public/sqlite_db.js');

(async () => {
  try {
    console.log('Testing order creation...');
    // Wait for database initialization to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await sqliteDB.createOrder({
      userId: 'test@example.com',
      wasteType: 'paper',
      quantity: 5,
      address: 'Test Address'
    });
    console.log('Order creation result:', result);

    // Test creating another order with different email
    const result2 = await sqliteDB.createOrder({
      userId: 'test2@example.com',
      wasteType: 'plastic',
      quantity: 3,
      address: 'Another Address'
    });
    console.log('Second order creation result:', result2);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the database connection
    sqliteDB.close();
  }
})();
