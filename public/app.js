/* app.js - shared behaviours */
document.addEventListener("DOMContentLoaded", () => {
  // API Base URL - Update for production
  const API_BASE = window.location.hostname === 'your-production-url.com' ? 'https://your-production-url.com' : window.location.origin;

  // Auth token storage
  let authToken = sessionStorage.getItem('authToken');

  // Helper function to make API calls
  async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (authToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(url, config);

      // read raw text first to handle empty or non-json responses
      const text = await response.text();

      // if empty body
      if (!text) {
        if (!response.ok) throw new Error(`HTTP ${response.status} (empty response)`);
        return {};
      }

      // try parse JSON
      let data;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json') || text.trim().startsWith('{') || text.trim().startsWith('[')) {
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          console.error('Failed to parse JSON response from', url, 'text:', text);
          throw new Error('Invalid JSON response from server');
        }
      } else {
        // non-JSON response
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${text}`);
        return text;
      }

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Environmental impact calculations
  const wasteImpact = {
    calculatePrice: (quantity, pricePerKg) => quantity * pricePerKg,
    calculateTreesSaved: (quantity, treesPerKg) => quantity * treesPerKg,
    calculateTotalStats: orders => {
      return orders.reduce((stats, order) => {
        stats.totalEarnings += order.estimated_price || 0;
        stats.totalWaste += order.quantity || 0;
        stats.treesSaved += order.trees_saved || 0;
        return stats;
      }, {
        totalEarnings: 0,
        totalWaste: 0,
        treesSaved: 0
      });
    }
  };

  async function getOrders() {
    try {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      if (!user.email) return [];

      const result = await apiCall(`/api/orders/${user.email}`);
      return result.success ? result.orders : [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  async function updateDashboardStats() {
    const orders = await getOrders();
    const stats = wasteImpact.calculateTotalStats(orders);

    // Update stats display
    const earningsEl = document.querySelector('[data-detail="earnings"] .num');
    const wasteEl = document.querySelector('[data-detail="waste-list"] .num');
    const pickupsEl = document.querySelector('[data-detail="pickups-status"] .num');
    const treesEl = document.querySelector('[data-detail="trees-saved"] .num');

    if (earningsEl) earningsEl.textContent = `₹${stats.totalEarnings.toFixed(2)}`;
    if (wasteEl) wasteEl.textContent = `${stats.totalWaste.toFixed(1)} kg`;
    if (pickupsEl) pickupsEl.textContent = orders.length;
    if (treesEl) treesEl.textContent = stats.treesSaved.toFixed(1);
  }

  // Handle quantity input and price estimation
  document.querySelectorAll('.waste-quantity').forEach(input => {
    input.addEventListener('input', (e) => {
      const quantity = parseFloat(e.target.value) || 0;
      const card = e.target.closest('.list-card');
      if (!card) return;

      const pricePerKg = parseFloat(card.dataset.price) || 0;
      const treesPerKg = parseFloat(card.dataset.trees) || 0;

      const estimatedPrice = wasteImpact.calculatePrice(quantity, pricePerKg);
      const treesSaved = wasteImpact.calculateTreesSaved(quantity, treesPerKg);

      const priceDisplay = card.querySelector('.estimated-price');
      if (priceDisplay) {
        if (quantity > 0) {
          priceDisplay.textContent = `Estimated: ₹${estimatedPrice.toFixed(2)} | 🌳 ${treesSaved.toFixed(2)} trees saved`;
        } else {
          priceDisplay.textContent = '';
        }
      }
    });
  });

  // Update orders display function
  async function updateOrders() {
    const orders = await getOrders();
    const ordersContainer = document.getElementById('ordersContainer');
    const noOrders = document.getElementById('noOrders');

    if (!ordersContainer) return;

    // Remove duplicates based on order id
    const uniqueOrders = orders.filter((order, index, self) =>
      index === self.findIndex(o => o.id === order.id)
    );

    if (uniqueOrders.length === 0) {
      if (noOrders) noOrders.style.display = 'block';
      ordersContainer.innerHTML = '';
      return;
    }

    if (noOrders) noOrders.style.display = 'none';

    // Group orders by date
    const groupedOrders = uniqueOrders.reduce((groups, order) => {
      const date = new Date(order.created_at).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(order);
      return groups;
    }, {});

    ordersContainer.innerHTML = Object.entries(groupedOrders)
      .map(([date, dayOrders]) => `
        <div class="field-label" style="margin-top:6px">${date}</div>
        ${dayOrders.map(order => `
          <div class="list-card order-card">
            <div style="display:flex;gap:12px;align-items:start">
              <div style="width:52px;height:52px;border-radius:12px;background:rgba(47,168,79,0.06);display:flex;align-items:center;justify-content:center">📦</div>
              <div style="flex:1">
                <div class="item-title">${order.waste_type}</div>
                <div class="meta">${order.quantity} kg</div>
                <div style="margin-top:8px;font-size:14px;">
                  <strong>Address:</strong> ${order.address}<br>
                  <strong>Status:</strong> <span style="color:${order.status === 'pending' ? 'var(--green)' : '#666'}">${order.status}</span>
                </div>
              </div>
            </div>
            <div style="height:12px"></div>
            <button class="action-btn" style="background:var(--meta-color); border-radius:12px;">View Details</button>
          </div>
        `).join('')}
      `).join('');
  }

  // Dashboard section management
  function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update bottom nav active state
    document.querySelectorAll('.nav-item').forEach(nav => {
      nav.classList.remove('active');
    });
    const activeNav = document.querySelector(`[data-target="${sectionId}"]`);
    if (activeNav) activeNav.classList.add('active');
  }

  // Function to update estimated price in upload-waste-1
  function updateEstimatedPrice() {
    const quantityEl = document.getElementById('upload-waste-quantity');
    const quantity = parseFloat(quantityEl ? quantityEl.value : 0) || 0;
    const wasteTypeInput = document.getElementById('upload-waste-type');
    const wasteType = wasteTypeInput.getAttribute('data-original-type') || wasteTypeInput.value;
    const card = document.querySelector(`.list-card[data-waste-type="${wasteType}"]`);
    if (card) {
      const pricePerKg = parseFloat(card.getAttribute('data-price')) || 0;
      const estimatedPrice = quantity * pricePerKg;
      const priceEl = document.getElementById('upload-estimated-price');
      if (priceEl) priceEl.value = `₹${estimatedPrice.toFixed(2)}`;
    }
  }

  // Add listener for automatic price calculation
  const quantityInput = document.getElementById('upload-waste-quantity');
  if (quantityInput) {
    quantityInput.addEventListener('input', updateEstimatedPrice);
  }

  // Initialize dashboard
  if (window.location.pathname.includes('home.html')) {
    updateDashboardStats();
    updateOrders();
  }

  // Bottom navigation
  document.querySelectorAll('.nav-item').forEach(nav => {
    nav.addEventListener('click', (e) => {
      e.preventDefault();
      const target = nav.getAttribute('data-target');
      if (target) {
        showSection(target);
        if (target === 'orders') {
          updateOrders();
        }
      }
    });
  });

  // Language modal functionality
  const languageModal = document.getElementById('language-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const languageBtn = document.getElementById('language-btn');

  if (languageBtn && languageModal) {
    languageBtn.addEventListener('click', () => {
      languageModal.style.display = 'flex';
    });
  }

  if (closeModalBtn && languageModal) {
    closeModalBtn.addEventListener('click', () => {
      languageModal.style.display = 'none';
    });
  }

  if (languageModal) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        applyTranslations(lang);
        // Update dynamic elements after language change
        updateGreeting();
        updateLocationDisplay();
        languageModal.style.display = 'none';
      });
    });
  }

  // Profile menu functionality
  const profileBtn = document.getElementById('profile-btn');
  const profileMenu = document.getElementById('profile-menu');

  if (profileBtn && profileMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
      profileMenu.classList.remove('active');
    });
  }

  // General data-flow handler for navigation and actions
  document.addEventListener('click', async (e) => {
    const flowElement = e.target.closest('[data-flow]');
    if (!flowElement) return;

    e.preventDefault();
    const flow = flowElement.getAttribute('data-flow');

    if (flow === 'sell-details-paper') {
      showSection('sell-details');
      document.querySelectorAll('.waste-type').forEach(el => el.classList.remove('active'));
      document.querySelector('.waste-type[data-category="paper"]').classList.add('active');
    } else if (flow === 'sell-details-metal') {
      showSection('sell-details');
      document.querySelectorAll('.waste-type').forEach(el => el.classList.remove('active'));
      document.querySelector('.waste-type[data-category="metal"]').classList.add('active');
    } else if (flow === 'sell-details-plastic') {
      showSection('sell-details');
      document.querySelectorAll('.waste-type').forEach(el => el.classList.remove('active'));
      document.querySelector('.waste-type[data-category="plastic"]').classList.add('active');
    } else if (flow === 'sell-details-glass') {
      showSection('sell-details');
      document.querySelectorAll('.waste-type').forEach(el => el.classList.remove('active'));
      document.querySelector('.waste-type[data-category="glass"]').classList.add('active');
    } else if (flow === 'upload-waste-1') {
      const card = e.target.closest('.list-card');
      const wasteType = card.getAttribute('data-waste-type');
      const quantity = card.querySelector('.waste-quantity').value;
      const pricePerKg = parseFloat(card.getAttribute('data-price'));
      const estimatedPrice = parseFloat(quantity) * pricePerKg;
      const wasteTypeInput = document.getElementById('upload-waste-type');
      wasteTypeInput.value = translate(wasteType.toLowerCase());
      wasteTypeInput.setAttribute('data-original-type', wasteType);
      document.getElementById('upload-waste-quantity').value = quantity;
      document.getElementById('upload-estimated-price').value = `₹${estimatedPrice.toFixed(2)}`;
      showSection('upload-waste-1');
    } else if (flow === 'upload-waste-2') {
      showSection('upload-waste-2');
      // Populate address from user location
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      const addressEl = document.getElementById('pickup-address');
      if (user.location) {
        const { hno, landmark, city, state, pin } = user.location;
        const addressParts = [user.name, hno, landmark, city, state].filter(Boolean);
        addressEl.textContent = addressParts.join(', ') + (pin ? `, ${pin}` : '');
      } else {
        addressEl.textContent = 'Location not set';
      }
    } else if (flow === 'sell') {
      showSection('sell');
    } else if (flow === 'saved-address') {
      showSection('saved-address');
      populateSavedAddress();
    } else if (flow === 'edit-address') {
      window.location.href = 'location.html?edit=true';
    } else if (flow === 'language-change') {
      if (languageModal) languageModal.style.display = 'flex';
    } else if (flow === 'edit-profile') {
      showSection('edit-profile');
      populateEditProfile();
    } else if (flow === 'save-profile') {
      // Handle save profile
      const name = document.getElementById('edit-name').value.trim();
      const email = document.getElementById('edit-email').value.trim();
      const mobile = document.getElementById('edit-mobile').value.trim();

      if (!name || !email) {
        alert('Please fill in all required fields');
        return;
      }

      try {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        user.name = name;
        user.email = email;
        user.mobile = mobile;
        sessionStorage.setItem('user', JSON.stringify(user));

        // Update display
        loadUserData();

        alert('Profile updated successfully!');
        showSection('overview');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    } else if (flow === 'delete-account') {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        // Implement account deletion logic here
        alert('Account deletion is not implemented yet.');
      }
    } else if (flow === 'add-new-address') {
      showSection('add-new-address');
    } else if (flow === 'overview') {
      showSection('overview');
    } else if (flow === 'save-address-submit') {
      // Collect form data
      const pin = document.getElementById('new-pin').value.trim();
      const state = document.getElementById('new-state').value.trim();
      const city = document.getElementById('new-city').value.trim();
      const landmark = document.getElementById('new-landmark').value.trim();
      const hno = document.getElementById('new-hno').value.trim();
      const setDefault = document.getElementById('set-default').checked;

      if (!pin || !state || !city || !hno) {
        alert('Please fill in all required fields');
        return;
      }

      try {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        user.location = {
          pin: pin,
          state: state,
          city: city,
          landmark: landmark,
          hno: hno
        };
        sessionStorage.setItem('user', JSON.stringify(user));

        // Update display
        populateSavedAddress();
        updateLocationDisplay();

        alert('Address saved successfully!');
        showSection('saved-address');
      } catch (error) {
        console.error('Error saving address:', error);
        alert('Failed to save address. Please try again.');
      }
    } else if (flow === 'submit-waste') {
      // Collect order data
      const wasteType = document.getElementById('upload-waste-type').getAttribute('data-original-type');
      const quantity = parseFloat(document.getElementById('upload-waste-quantity').value);
      const address = document.getElementById('pickup-address').textContent;

      console.log('Submit waste data:', { wasteType, quantity, address });

      if (!wasteType || !quantity || !address || address === 'Location not set') {
        alert('Please fill in all fields and ensure your location is set');
        return;
      }

      try {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        console.log('User data:', user);

        if (!user.email) {
          alert('User email not found. Please log in again.');
          return;
        }

        const orderData = {
          userId: user.email,
          wasteType: wasteType,
          quantity: quantity,
          address: address,
          status: 'pending'
        };

        console.log('Sending order data:', orderData);

        const result = await apiCall('/api/orders', {
          method: 'POST',
          body: JSON.stringify(orderData)
        });

        console.log('API response:', result);

        if (result.success) {
          alert('Pickup request submitted successfully!');
          // Send order to matching recyclers
          await sendOrderToRecyclers();
          // Update dashboard
          updateDashboardStats();
          updateOrders();
          showSection('orders');
        } else {
          alert('Failed to submit pickup request. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting pickup request:', error);
        alert('Failed to submit pickup request. Please try again.');
      }
    }

  });

  // Profile menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const flow = e.target.getAttribute('data-flow');
      if (flow) {
        if (flow === 'language-change') {
          if (languageModal) languageModal.style.display = 'flex';
        } else if (flow === 'edit-profile') {
          showSection('edit-profile');
        } else if (flow === 'saved-address') {
          showSection('saved-address');
        }
      }
      if (profileMenu) profileMenu.classList.remove('active');
    });
  });

  // Logout functionality
  const logoutBtn = document.querySelector('.menu-item.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'language.html';
      }
    });
  }

  // Update greeting based on time and language
  function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greetingKey;
    if (hour < 12) greetingKey = 'greeting_morning';
    else if (hour < 17) greetingKey = 'greeting_afternoon';
    else greetingKey = 'greeting_evening';
    const greetingEl = document.getElementById('timeGreeting');
    if (greetingEl) {
      greetingEl.textContent = translate(greetingKey);
    }
  }

  // Update location display with current language
  function updateLocationDisplay() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const locationEl = document.querySelector('[data-translate="your_location"]');

    if (user.location && locationEl) {
      const { city, state, pin } = user.location;
      if (city && state && pin) {
        const format = translate('location_format');
        locationEl.textContent = format.replace('{city}', city).replace('{state}', state).replace('{pin}', pin);
      } else {
        locationEl.textContent = 'Location not set';
      }
    } else if (locationEl) {
      locationEl.textContent = 'Location not set';
    }
  }

  // Load user data on dashboard
  function loadUserData() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const userNameEl = document.getElementById('userName');
    const menuNameEl = document.getElementById('menu-user-name');
    const menuEmailEl = document.getElementById('menu-user-email');
    const locationEl = document.querySelector('[data-translate="your_location"]');

    if (user.name && userNameEl) userNameEl.textContent = user.name;
    if (user.name && menuNameEl) menuNameEl.textContent = user.name;
    if (user.email && menuEmailEl) menuEmailEl.textContent = user.email;

    // Load and display user location
    if (user.location && locationEl) {
      const { city, state, pin } = user.location;
      if (city && state && pin) {
        const format = translate('location_format');
        locationEl.textContent = format.replace('{city}', city).replace('{state}', state).replace('{pin}', pin);
      } else {
        locationEl.textContent = 'Location not set';
      }
    } else if (locationEl) {
      locationEl.textContent = 'Location not set';
    }

    // Update greeting
    updateGreeting();
  }

  // Populate edit profile section with user data
  function populateEditProfile() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const nameInput = document.getElementById('edit-name');
    const emailInput = document.getElementById('edit-email');
    const mobileInput = document.getElementById('edit-mobile');

    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
    if (mobileInput) mobileInput.value = user.mobile || '';
  }

  // Populate saved address section with user location data
  function populateSavedAddress() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const addressTitle = document.querySelector('#saved-address .item-title');
    const addressMeta = document.querySelector('#saved-address .meta');

    if (user.location) {
      const { hno, landmark, city, state, pin } = user.location;
      const fullAddress = [hno, landmark, city, state, pin].filter(Boolean).join(', ');
      if (addressMeta) addressMeta.textContent = fullAddress || 'Location not set';
    } else {
      if (addressMeta) addressMeta.textContent = 'Location not set';
    }
  }

  // Load dashboard data
  async function loadDashboardData() {
    await updateDashboardStats();
    await updateOrders();
  }

  // Initialize dashboard
  if (window.location.pathname.includes('home.html')) {
    loadUserData();
    loadDashboardData();
  }

  // Send order to matching recyclers
  async function sendOrderToRecyclers() {
    try {
      // Get all orders to find the latest one
      const result = await apiCall('/api/orders/all');
      if (!result.success || !result.orders.length) return;

      // Get the latest order (assuming it's the last one)
      const latestOrder = result.orders[result.orders.length - 1];

      // Get user location for pincode matching
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      if (!user.location || !user.location.pin) return;

      const userPincode = user.location.pin;

      // Get all recyclers
      const recyclersResult = await apiCall('/api/recyclers');
      if (!recyclersResult.success) return;

      // Find recyclers with matching pincode
      const matchingRecyclers = recyclersResult.recyclers.filter(recycler =>
        recycler.pincode === userPincode
      );

      // Send order to each matching recycler
      for (const recycler of matchingRecyclers) {
        try {
          await apiCall('/api/recycler/orders', {
            method: 'POST',
            body: JSON.stringify({
              recyclerId: recycler.id,
              orderId: latestOrder.id,
              orderData: latestOrder
            })
          });
        } catch (error) {
          console.error('Failed to send order to recycler:', recycler.business_name, error);
        }
      }
    } catch (error) {
      console.error('Error sending order to recyclers:', error);
    }
  }

  // Skip authentication checks since login/OTP pages are removed
});
