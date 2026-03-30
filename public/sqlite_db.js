const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

class SQLiteDB {
  constructor() {
    this.dbPath = path.join(__dirname, 'ecovera.db');
    this.db = null;
    this.init();
  }

  init() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error('Error opening database:', err.message);
          reject(err);
        } else {
          console.log('Connected to SQLite database');
          this.createTables().then(resolve).catch(reject);
        }
      });
    });
  }

  createTables() {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mobile VARCHAR(15) UNIQUE NOT NULL,
          firebase_uid VARCHAR(128) UNIQUE,
          name VARCHAR(100),
          email VARCHAR(100),
          pin VARCHAR(10),
          state VARCHAR(50),
          city VARCHAR(50),
          landmark VARCHAR(200),
          hno VARCHAR(200),
          role VARCHAR(20) DEFAULT 'seller',
          business_name VARCHAR(100),
          business_type VARCHAR(50),
          pincode VARCHAR(10),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS otps (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mobile VARCHAR(15) NOT NULL,
          otp VARCHAR(6) NOT NULL,
          expires_at DATETIME NOT NULL,
          verification_status VARCHAR(20) DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          waste_type VARCHAR(50) NOT NULL,
          quantity DECIMAL(10,2) NOT NULL,
          estimated_price DECIMAL(10,2),
          trees_saved DECIMAL(10,2),
          status VARCHAR(20) DEFAULT 'pending',
          address TEXT,
          recycler_id INTEGER,
          latitude DECIMAL(10, 8),
          longitude DECIMAL(11, 8),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS categories (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS events (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          description TEXT,
          date DATETIME,
          location TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS recycler_orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          recycler_id INTEGER NOT NULL,
          order_id INTEGER NOT NULL,
          status VARCHAR(20) DEFAULT 'assigned',
          assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (recycler_id) REFERENCES users(id),
          FOREIGN KEY (order_id) REFERENCES orders(id)
        );
      `;

      this.db.exec(sql, (err) => {
        if (err) {
          console.error('Error creating tables:', err.message);
          reject(err);
        } else {
          console.log('Tables created successfully');
          this.migrateDatabase().then(() => {
            this.initializeSampleData().then(resolve).catch(reject);
          }).catch(reject);
        }
      });
    });
  }

  migrateDatabase() {
    return new Promise((resolve, reject) => {
      // Check if migration columns exist, if not add them
      const migrations = [
        'ALTER TABLE users ADD COLUMN business_name VARCHAR(100)',
        'ALTER TABLE users ADD COLUMN business_type VARCHAR(50)',
        'ALTER TABLE users ADD COLUMN pincode VARCHAR(10)',
        'ALTER TABLE orders ADD COLUMN latitude DECIMAL(10, 8)',
        'ALTER TABLE orders ADD COLUMN longitude DECIMAL(11, 8)',
        'ALTER TABLE orders ADD COLUMN recycler_id INTEGER'
      ];

      const runMigrations = async () => {
        for (const migration of migrations) {
          try {
            await new Promise((res, rej) => {
              this.db.run(migration, (err) => {
                if (err && !err.message.includes('duplicate column name')) {
                  console.error('Migration error:', err.message);
                  rej(err);
                } else {
                  res();
                }
              });
            });
          } catch (error) {
            // Column might already exist, continue
            console.log('Migration skipped (column may already exist):', migration);
          }
        }
        console.log('Database migrations completed');
        resolve();
      };

      runMigrations().catch(reject);
    });
  }

  async deleteOTP(mobile) {
    try {
      await new Promise((resolve, reject) => {
        this.db.run('DELETE FROM otps WHERE mobile = ?', [mobile], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      return { success: true };
    } catch (error) {
      console.error('Failed to delete OTP:', error);
      return { success: false, error: error.message };
    }
  }

  initializeSampleData() {
    return new Promise((resolve, reject) => {
      // Insert sample categories
      const categories = [
        { id: 'paper', name: 'Paper', description: 'Cardboard, Books, Newspaper' },
        { id: 'metal', name: 'Metal', description: 'Iron, Copper, Steel' },
        { id: 'plastic', name: 'Plastic', description: 'Bottles, Dairy Packets' },
        { id: 'glass', name: 'Glass', description: 'Glass Bottles' }
      ];

      const insertCategory = (category) => {
        return new Promise((res, rej) => {
          this.db.run(
            'INSERT OR IGNORE INTO categories (id, name, description) VALUES (?, ?, ?)',
            [category.id, category.name, category.description],
            function(err) {
              if (err) rej(err);
              else res();
            }
          );
        });
      };

      // Insert sample events
      const events = [
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

      const insertEvent = (event) => {
        return new Promise((res, rej) => {
          this.db.run(
            'INSERT OR IGNORE INTO events (id, title, description, date, location) VALUES (?, ?, ?, ?, ?)',
            [event.id, event.title, event.description, event.date, event.location],
            function(err) {
              if (err) rej(err);
              else res();
            }
          );
        });
      };

      // Execute all insertions
      Promise.all([
        ...categories.map(insertCategory),
        ...events.map(insertEvent)
      ]).then(() => {
        console.log('Sample data initialized successfully');
        resolve();
      }).catch(reject);
    });
  }

  // User operations
  async createUser(userData) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO users (mobile, firebase_uid, name, email, pin, state, city, landmark, hno, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        userData.mobile,
        userData.firebaseUid || null,
        userData.name || null,
        userData.email || null,
        userData.pin || null,
        userData.state || null,
        userData.city || null,
        userData.landmark || null,
        userData.hno || null,
        userData.role || 'seller'
      ];

      this.db.run(sql, values, function(err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            resolve({ success: false, error: 'User already exists' });
          } else {
            console.error('Error creating user:', err.message);
            resolve({ success: false, error: err.message });
          }
        } else {
          resolve({ success: true, id: this.lastID });
        }
      });
    });
  }

  async getUser(mobile) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE mobile = ?', [mobile], (err, row) => {
        if (err) {
          console.error('Error getting user:', err.message);
          resolve({ success: false, error: err.message });
        } else if (row) {
          resolve({ success: true, data: row });
        } else {
          resolve({ success: false, error: 'User not found' });
        }
      });
    });
  }

  async getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
          console.error('Error getting user by email:', err.message);
          resolve({ success: false, error: err.message });
        } else if (row) {
          resolve({ success: true, data: row });
        } else {
          resolve({ success: false, error: 'User not found' });
        }
      });
    });
  }

  async updateUser(mobile, updateData) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];

      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });

      if (fields.length === 0) {
        resolve({ success: false, error: 'No fields to update' });
        return;
      }

      values.push(mobile);

      const sql = `UPDATE users SET ${fields.join(', ')} WHERE mobile = ?`;

      this.db.run(sql, values, function(err) {
        if (err) {
          console.error('Error updating user:', err.message);
          resolve({ success: false, error: err.message });
        } else if (this.changes === 0) {
          resolve({ success: false, error: 'User not found' });
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  // OTP operations
  async storeOTP(mobile, otp, expiresAt) {
    return new Promise((resolve, reject) => {
      // First delete any existing OTP for this mobile
      this.db.run('DELETE FROM otps WHERE mobile = ?', [mobile], (err) => {
        if (err) {
          console.error('Error deleting existing OTP:', err.message);
          resolve({ success: false, error: err.message });
          return;
        }

        // Insert new verification attempt
        const sql = 'INSERT INTO otps (mobile, otp, expires_at, verification_status) VALUES (?, ?, ?, ?)';
        this.db.run(sql, [mobile, otp, expiresAt.toISOString(), 'pending'], function(err) {
          if (err) {
            console.error('Error storing verification attempt:', err.message);
            resolve({ success: false, error: err.message });
          } else {
            resolve({ success: true });
          }
        });
      });
    });
  }

  async getOTP(mobile) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM otps WHERE mobile = ?', [mobile], (err, row) => {
        if (err) {
          console.error('Error getting verification:', err.message);
          resolve({ success: false, error: err.message });
        } else if (row) {
          resolve({ success: true, data: { ...row, expiresAt: new Date(row.expires_at) } });
        } else {
          resolve({ success: false, error: 'Verification not found' });
        }
      });
    });
  }

  async updateOTPStatus(mobile, status) {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE otps SET verification_status = ? WHERE mobile = ?',
        [status, mobile],
        function(err) {
          if (err) {
            console.error('Error updating verification status:', err.message);
            resolve({ success: false, error: err.message });
          } else {
            resolve({ success: true });
          }
        }
      );
    });
  }

  // Order operations
  async createOrder(orderData) {
    return new Promise(async (resolve, reject) => {
      // Get user by email to get the user id
      const userEmail = orderData.userId;
      let userResult = await this.getUserByEmail(userEmail);

      // If user doesn't exist, create a basic user record
      if (!userResult.success) {
        const userData = {
          mobile: `9${crypto.randomBytes(5).toString('hex').toUpperCase().slice(0,9)}`, // Generate unique 10-digit mobile for email-only users
          firebaseUid: `email-user-${Date.now()}`,
          email: userEmail,
          name: userEmail.split('@')[0], // Use part before @ as name
          role: 'seller'
        };
        const createResult = await this.createUser(userData);
        if (!createResult.success) {
          resolve({ success: false, error: 'Failed to create user for order' });
          return;
        }
        // Get the newly created user
        userResult = await this.getUserByEmail(userEmail);
        if (!userResult.success) {
          resolve({ success: false, error: 'Failed to retrieve created user' });
          return;
        }
      }

      const userId = userResult.data.id;

      const sql = `
        INSERT INTO orders (user_id, waste_type, quantity, estimated_price, trees_saved, status, address, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        userId,
        orderData.wasteType,
        orderData.quantity,
        orderData.estimatedPrice || null,
        orderData.treesSaved || null,
        orderData.status || 'pending',
        orderData.address || null,
        orderData.latitude || null,
        orderData.longitude || null
      ];

      this.db.run(sql, values, function(err) {
        if (err) {
          console.error('Error creating order:', err.message);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, id: this.lastID });
        }
      });
    });
  }

  async getUserOrders(userId) {
    return new Promise(async (resolve, reject) => {
      // If userId is an email, get the user id first
      let actualUserId = userId;
      if (isNaN(userId)) {
        const userResult = await this.getUserByEmail(userId);
        if (!userResult.success) {
          // If user doesn't exist, return empty orders instead of error
          resolve({ success: true, data: [] });
          return;
        }
        actualUserId = userResult.data.id;
      }

      const sql = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
      this.db.all(sql, [actualUserId], (err, rows) => {
        if (err) {
          console.error('Error getting user orders:', err.message);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, data: rows });
        }
      });
    });
  }

  async getOrderById(orderId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM orders WHERE id = ?';
      this.db.get(sql, [orderId], (err, row) => {
        if (err) {
          console.error('Error getting order by id:', err.message);
          resolve({ success: false, error: err.message });
        } else if (row) {
          resolve({ success: true, data: row });
        } else {
          resolve({ success: false, error: 'Order not found' });
        }
      });
    });
  }

  async getAllOrders() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM orders ORDER BY created_at DESC';
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          console.error('Error getting all orders:', err.message);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, data: rows });
        }
      });
    });
  }

  async updateOrder(orderId, updateData) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];

      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });

      if (fields.length === 0) {
        resolve({ success: false, error: 'No fields to update' });
        return;
      }

      values.push(orderId);

      const sql = `UPDATE orders SET ${fields.join(', ')} WHERE id = ?`;

      this.db.run(sql, values, function(err) {
        if (err) {
          console.error('Error updating order:', err.message);
          resolve({ success: false, error: err.message });
        } else if (this.changes === 0) {
          resolve({ success: false, error: 'Order not found' });
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  // Categories
  async getCategories() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM categories ORDER BY name', [], (err, rows) => {
        if (err) {
          console.error('Error getting categories:', err.message);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, data: rows });
        }
      });
    });
  }

  // Events
  async getEvents() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM events ORDER BY date ASC', [], (err, rows) => {
        if (err) {
          console.error('Error getting events:', err.message);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, data: rows });
        }
      });
    });
  }

  // Recycler operations
  async getRecyclers() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE role = ? ORDER BY created_at DESC';
      this.db.all(sql, ['buyer'], (err, rows) => {
        if (err) {
          console.error('Error getting recyclers:', err.message);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, recyclers: rows });
        }
      });
    });
  }

  // Recycler order operations
  async assignOrderToRecycler(recyclerId, orderId) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO recycler_orders (recycler_id, order_id, status, assigned_at)
        VALUES (?, ?, 'assigned', CURRENT_TIMESTAMP)
      `;
      this.db.run(sql, [recyclerId, orderId], function(err) {
        if (err) {
          console.error('Error assigning order to recycler:', err.message);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, id: this.lastID });
        }
      });
    });
  }

  async getRecyclerOrders(recyclerId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT ro.*, o.waste_type, o.quantity, o.estimated_price, o.trees_saved, o.status as order_status, o.address, o.created_at as order_created_at
        FROM recycler_orders ro
        JOIN orders o ON ro.order_id = o.id
        WHERE ro.recycler_id = ?
        ORDER BY ro.assigned_at DESC
      `;
      this.db.all(sql, [recyclerId], (err, rows) => {
        if (err) {
          console.error('Error getting recycler orders:', err.message);
          resolve({ success: false, error: err.message });
        } else {
          resolve({ success: true, orders: rows });
        }
      });
    });
  }

  // Close database connection
  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database connection closed');
        }
      });
    }
  }
}

module.exports = new SQLiteDB();