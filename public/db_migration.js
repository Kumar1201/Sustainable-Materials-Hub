const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function migrateDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Create tables
    const createTables = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mobile VARCHAR(15) UNIQUE NOT NULL,
        name VARCHAR(100),
        email VARCHAR(100),
        pin VARCHAR(10),
        state VARCHAR(50),
        city VARCHAR(50),
        landmark VARCHAR(200),
        hno VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS otps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mobile VARCHAR(15) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        waste_type VARCHAR(50) NOT NULL,
        quantity DECIMAL(10,2) NOT NULL,
        estimated_price DECIMAL(10,2),
        trees_saved DECIMAL(10,2),
        status VARCHAR(20) DEFAULT 'pending',
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        date TIMESTAMP,
        location TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(createTables);
    console.log('Tables created successfully');

    // Insert sample data
    const sampleCategories = [
      { id: 'paper', name: 'Paper', description: 'Cardboard, Books, Newspaper' },
      { id: 'metal', name: 'Metal', description: 'Iron, Copper, Steel' },
      { id: 'plastic', name: 'Plastic', description: 'Bottles, Dairy Packets' },
      { id: 'glass', name: 'Glass', description: 'Glass Bottles' }
    ];

    for (const cat of sampleCategories) {
      await client.query(
        'INSERT INTO categories (id, name, description) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
        [cat.id, cat.name, cat.description]
      );
    }

    const sampleEvents = [
      {
        id: 'event1',
        title: 'Tree Planting Drive',
        description: 'Join us for a community tree planting event',
        date: '2024-02-15T10:00:00Z',
        location: 'Central Park, Bangalore'
      },
      {
        id: 'event2',
        title: 'Waste Collection Workshop',
        description: 'Learn about proper waste segregation',
        date: '2024-02-20T14:00:00Z',
        location: 'Community Center, Delhi'
      }
    ];

    for (const event of sampleEvents) {
      await client.query(
        'INSERT INTO events (id, title, description, date, location) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING',
        [event.id, event.title, event.description, event.date, event.location]
      );
    }

    console.log('Sample data inserted successfully');
    console.log('Database migration completed!');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateDatabase();
}

module.exports = { migrateDatabase };
