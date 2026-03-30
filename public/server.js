const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const admin = require('firebase-admin');
const sqliteDB = require('./sqlite_db.js');

// Initialize Firebase Admin with service account from root directory
const serviceAccount = require('../firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const apiRouter = express.Router();

// Simple request logging (single middleware)
app.use((req, res, next) => {
  console.log('----------------------------------------');
  console.log('Request:', new Date().toISOString(), req.method, req.url);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('----------------------------------------');
  next();
});

// Global middleware
// --- FIX: Explicit CORS configuration to handle preflight OPTIONS requests ---
app.use(cors({
  origin: '*', // You can restrict this to 'http://localhost:5500'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API router
app.use('/api', apiRouter);

/* --- API ROUTES --- */

apiRouter.post('/auth/send-otp', async (req, res) => {
  try {
    console.log('Received OTP request:', req.body);
    let { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ success: false, error: 'Mobile number is required' });
    }

    // Clean the mobile number
    mobile = mobile.replace(/\D/g, '');
    if (mobile.length !== 10) {
      return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number required' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store pending verification
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const storeResult = await sqliteDB.storeOTP(mobile, otp, expiresAt);

    if (!storeResult.success) {
      return res.status(500).json({ success: false, error: 'Failed to store verification attempt' });
    }

    res.json({ success: true, message: 'Proceed with Firebase verification' });
  } catch (error) {
    console.error('Error in send-otp:', error);
    res.status(500).json({ success: false, error: 'Failed to initiate verification' });
  }
});

// Get user by numeric id (convenience endpoint)
apiRouter.get('/user/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userResult = await sqliteDB.getUserById(parseInt(id, 10));
    if (!userResult.success) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, user: userResult.data });
  } catch (error) {
    console.error('Error getting user by id:', error);
    res.status(500).json({ success: false, error: 'Failed to get user' });
  }
});
// --- This line has been removed ---
// apiRouter.options('/auth/send-otp', (req, res) => res.sendStatus(200));
// --- This line was conflicting with the cors() middleware ---

apiRouter.post('/auth/verify-otp', async (req, res) => {
  try {
    const { mobile, idToken } = req.body;

    if (!mobile || !idToken) {
      return res.status(400).json({ success: false, error: 'Mobile and ID token required' });
    }

    // In dev mode we skip Firebase verification; in production call admin.auth().verifyIdToken(idToken)
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    // const firebaseUid = decodedToken.uid;
    const firebaseUid = `dev-uid-${Date.now()}`;

    // Delete any stored verification attempts
    await sqliteDB.deleteOTP(mobile);

    // Ensure user exists
    let userResult = await sqliteDB.getUser(mobile);
    if (!userResult.success) {
      const creationResult = await sqliteDB.createUser({ mobile, firebaseUid });
      if (!creationResult.success) {
        return res.status(500).json({ success: false, error: 'Failed to create user' });
      }
      userResult = await sqliteDB.getUser(mobile);
      if (!userResult.success) {
        return res.status(500).json({ success: false, error: 'Failed to retrieve newly created user' });
      }
    }

    const sessionToken = `session-${crypto.randomBytes(16).toString('hex')}`;

    res.json({ success: true, user: userResult.data, token: sessionToken });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, error: 'Failed to verify OTP' });
  }
});

// Simple session token middleware
const verifySessionToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader !== 'string') {
    return res.status(401).json({ error: 'Invalid authorization header' });
  }
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split('Bearer ')[1];
  if (!token || !token.startsWith('session-')) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  // Production: verify token properly (JWT or server-side session)
  next();
};

// User routes
apiRouter.get('/user/:mobile', async (req, res) => {
  try {
    const { mobile } = req.params;
    const result = await sqliteDB.getUser(mobile);
    if (!result.success) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user: result.data });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

apiRouter.put('/user/:mobile', async (req, res) => {
  try {
    const { mobile } = req.params;
    const updateData = req.body;
    const result = await sqliteDB.updateUser(mobile, updateData);
    if (!result.success) return res.status(500).json({ error: 'Failed to update user' });
    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Pricing data for waste types (matching the HTML data attributes)
const wastePricing = {
  'Cardboard': { pricePerKg: 12, treesPerKg: 0.017 },
  'Newspaper': { pricePerKg: 15, treesPerKg: 0.02 },
  'Books': { pricePerKg: 8, treesPerKg: 0.015 },
  'Mixed Paper': { pricePerKg: 6, treesPerKg: 0.01 },
  'Magazines': { pricePerKg: 10, treesPerKg: 0.015 },
  'Iron': { pricePerKg: 25, treesPerKg: 0.05 },
  'Copper': { pricePerKg: 450, treesPerKg: 0.08 },
  'Steel': { pricePerKg: 20, treesPerKg: 0.04 },
  'Mixed Plastics': { pricePerKg: 5, treesPerKg: 0.03 },
  'Plastic Bottles (PET)': { pricePerKg: 8, treesPerKg: 0.04 },
  'Dairy Packets (LDPE)': { pricePerKg: 15, treesPerKg: 0.02 },
  'Glass Bottles': { pricePerKg: 3, treesPerKg: 0.01 }
};

// Orders
apiRouter.post('/orders', async (req, res) => {
  try {
    const orderData = req.body;
    if (!orderData.userId || !orderData.wasteType || !orderData.quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate estimated price and trees saved based on waste type
    const pricing = wastePricing[orderData.wasteType];
    if (pricing) {
      orderData.estimatedPrice = orderData.quantity * pricing.pricePerKg;
      orderData.treesSaved = orderData.quantity * pricing.treesPerKg;
    } else {
      // Default values if waste type not found
      orderData.estimatedPrice = 0;
      orderData.treesSaved = 0;
    }

    // --- Geocoding Simulation ---
    // In a real app, you would use a geocoding service (like Google Maps Geocoding API or Nominatim)
    // to convert orderData.address into latitude and longitude.
    // For this demo, we'll generate random coordinates around a central point (e.g., Bangalore).
    orderData.latitude = 12.9716 + (Math.random() - 0.5) * 0.2; // Random latitude around Bangalore
    orderData.longitude = 77.5946 + (Math.random() - 0.5) * 0.2; // Random longitude around Bangalore
    // --- End Geocoding Simulation ---

    const result = await sqliteDB.createOrder(orderData);
    if (!result.success) return res.status(500).json({ error: 'Failed to create order' });
    res.json({ success: true, orderId: result.id, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

apiRouter.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await sqliteDB.getUserOrders(userId);
    if (!result.success) return res.status(500).json({ error: 'Failed to get orders' });
    res.json({ success: true, orders: result.data });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});

// Get single order by ID and include seller details
apiRouter.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderResult = await sqliteDB.getOrderById(parseInt(orderId, 10));
    if (!orderResult.success) return res.status(404).json({ success: false, error: 'Order not found' });
    const order = orderResult.data;
    // Attach user details if available
    let userDetails = null;
    if (order.user_id) {
      const u = await sqliteDB.getUserById(order.user_id);
      if (u.success) userDetails = u.data;
    }
    res.json({ success: true, order, user: userDetails });
  } catch (error) {
    console.error('Error fetching order by id:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch order' });
  }
});

apiRouter.get('/orders/all', async (req, res) => {
  try {
    const result = await sqliteDB.getAllOrders();
    if (!result.success) return res.status(500).json({ error: 'Failed to get orders' });
    res.json({ success: true, orders: result.data });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});

apiRouter.post('/orders/:orderId/purchase', async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await sqliteDB.updateOrder(parseInt(orderId, 10), { status: 'purchased' });
    if (!result.success) return res.status(400).json({ error: result.error });
    res.json({ success: true, message: 'Order purchased successfully' });
  } catch (error) {
    console.error('Error purchasing order:', error);
    res.status(500).json({ error: 'Failed to purchase order' });
  }
});

// Accept an order (for recyclers)
apiRouter.post('/orders/:orderId/accept', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { recyclerId } = req.body;
    if (!recyclerId) {
      return res.status(400).json({ success: false, error: 'Recycler ID is required.' });
    }
    const result = await sqliteDB.updateOrder(parseInt(orderId, 10), { status: 'accepted', recycler_id: recyclerId });
    if (!result.success) return res.status(400).json({ success: false, error: result.error });
    res.json({ success: true, message: 'Order accepted successfully' });
  } catch (error) {
    console.error('Error accepting order:', error);
    res.status(500).json({ success: false, error: 'Failed to accept order' });
  }
});

// Complete an order
apiRouter.post('/orders/:orderId/complete', async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await sqliteDB.updateOrder(parseInt(orderId, 10), { status: 'completed' });
    if (!result.success) return res.status(400).json({ success: false, error: result.error });
    res.json({ success: true, message: 'Order completed successfully' });
  } catch (error) {
    console.error('Error completing order:', error);
    res.status(500).json({ success: false, error: 'Failed to complete order' });
  }
});

// Recycler setup
apiRouter.post('/recycler/setup', async (req, res) => {
  try {
    const { business_name, business_type, pincode, city, state, mobile } = req.body;

    if (!business_name || !business_type || !pincode || !city || !state || !mobile) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // Since login is removed, we need to ensure the user exists before updating.
    let userResult = await sqliteDB.getUser(mobile);
    if (!userResult.success) {
      // If user doesn't exist, create one.
      const creationResult = await sqliteDB.createUser({ mobile, firebaseUid: `dev-uid-${Date.now()}` });
      if (!creationResult.success) {
        return res.status(500).json({ success: false, error: 'Failed to create user for recycler' });
      }
    }

    const updateData = {
      business_name,
      business_type,
      pincode,
      city,
      state,
      role: 'buyer' // Update role to buyer for recyclers
    };

    const result = await sqliteDB.updateUser(mobile, updateData);

    if (!result.success) {
      return res.status(500).json({ success: false, error: 'Failed to save recycler setup' });
    }

    res.json({ success: true, message: 'Recycler setup completed successfully' });
  } catch (error) {
    console.error('Error in recycler setup:', error);
    res.status(500).json({ success: false, error: 'Failed to save recycler setup' });
  }
});

// Recycler routes
apiRouter.get('/recyclers', async (req, res) => {
  try {
    const result = await sqliteDB.getRecyclers();
    if (!result.success) return res.status(500).json({ error: 'Failed to get recyclers' });
    res.json({ success: true, recyclers: result.recyclers });
  } catch (error) {
    console.error('Error getting recyclers:', error);
    res.status(500).json({ error: 'Failed to get recyclers' });
  }
});

apiRouter.post('/recycler/orders', async (req, res) => {
  try {
    const { recyclerId, orderId } = req.body;

    if (!recyclerId || !orderId) {
      return res.status(400).json({ error: 'recyclerId and orderId are required' });
    }

    const result = await sqliteDB.assignOrderToRecycler(recyclerId, orderId);
    if (!result.success) return res.status(500).json({ error: result.error });
    res.json({ success: true, message: 'Order assigned to recycler successfully' });
  } catch (error) {
    console.error('Error assigning order to recycler:', error);
    res.status(500).json({ error: 'Failed to assign order to recycler' });
  }
});

apiRouter.get('/recycler/orders/:recyclerId', async (req, res) => {
  try {
    const { recyclerId } = req.params;
    const result = await sqliteDB.getRecyclerOrders(recyclerId);
    if (!result.success) return res.status(500).json({ error: 'Failed to get recycler orders' });
    res.json({ success: true, orders: result.orders });
  } catch (error) {
    console.error('Error getting recycler orders:', error);
    res.status(500).json({ error: 'Failed to get recycler orders' });
  }
});

// Public routes
apiRouter.get('/categories', async (req, res) => {
  try {
    const result = await sqliteDB.getCategories();
    if (!result.success) return res.status(500).json({ error: 'Failed to get categories' });
    res.json({ success: true, categories: result.data });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

apiRouter.get('/events', async (req, res) => {
  try {
    const result = await sqliteDB.getEvents();
    if (!result.success) return res.status(500).json({ error: 'Failed to get events' });
    res.json({ success: true, events: result.data });
  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({ error: 'Failed to get events' });
  }
});

/* --- Static File Serving --- */
// Serve static files (HTML, CSS, JS) from the current directory
app.use(express.static(path.join(__dirname), {
  index: 'index.html',
  extensions: ['html']
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server (single place)
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
