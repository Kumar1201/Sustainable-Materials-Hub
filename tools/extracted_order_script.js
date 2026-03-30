
        document.addEventListener('DOMContentLoaded', function() {
            const logoutBtn = document.getElementById('logout-btn');
            logoutBtn.addEventListener('click', function() {
                // Clear session storage
                sessionStorage.clear();
                // Redirect to language page
                window.location.href = 'language.html';
            });

            const ordersContainer = document.getElementById('ordersContainer');
            const noOrdersMessage = document.getElementById('noOrders');
            const orderFilter = document.getElementById('orderFilter');
            let allOrders = [];
            let map = null; // To hold the map instance

            const orderDetailsModal = document.getElementById('orderDetailsModal');
            const backToOrdersBtn = document.getElementById('backToOrders');
            const sellerDetailsContainer = document.getElementById('sellerDetails');

            async function fetchOrders() {
                try {
                    const response = await fetch('/api/orders/all');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    if (result.success && result.orders) {
                        allOrders = result.orders;
                    } else {
                        allOrders = [];
                    }
                    renderOrders();
                } catch (error) {
                    console.error('Error fetching orders:', error);
                    // Add mock orders for testing if fetch fails
                    allOrders = [
                        {
                            id: 1,
                            waste_type: 'Cardboard',
                            quantity: 5,
                            address: '123 Main St, Bangalore',
                            status: 'pending',
                            latitude: 12.9716,
                            longitude: 77.5946
                        },
                        {
                            id: 2,
                            waste_type: 'Plastic Bottles',
                            quantity: 10,
                            address: '456 Oak Ave, Bangalore',
                            status: 'accepted',
                            latitude: 12.9816,
                            longitude: 77.6046
                        }
                    ];
                    renderOrders();
                }
            }

            function renderOrders(filter = 'all') {
                ordersContainer.innerHTML = '';
                const filteredOrders = allOrders.filter(order => {
                    if (filter === 'all') return true;
                    return order.status === filter;
                });

                if (filteredOrders.length === 0) {
                    noOrdersMessage.style.display = 'block';
                    return;
                }

                noOrdersMessage.style.display = 'none';

                filteredOrders.forEach(order => {
                    const orderCard = `
                        <div class="list-card order-card" data-order-id="${order.id}" data-user-id="${order.user_id || order.userId || order.user}">
                            <div style="display:flex;gap:12px;align-items:start">
                                <div style="width:52px;height:52px;border-radius:12px;background:rgba(47,168,79,0.06);display:flex;align-items:center;justify-content:center">📦</div>
                                <div style="flex:1">
                                    <div class="item-title">${order.waste_type}</div>
                                    <div class="meta">${order.quantity} kg</div>
                                    <div style="margin-top:8px;font-size:14px;">
                                        <strong>Address:</strong> ${order.address || 'Not specified'}<br>
                                        <strong>Status:</strong> <span class="order-status" style="color:${order.status === 'pending' ? 'var(--green)' : '#666'}">${order.status}</span>
                                    </div>
                                </div>
                            </div>
                                <div class="order-actions" style="display:flex; gap:10px; margin-top:12px;">
                                <button class="action-btn view-details-btn" data-order-id="${order.id}" data-user-id="${order.user_id || order.userId || order.user}" style="flex:1; border-radius:12px; font-size:14px; padding: 8px 12px; background: #e0e0e0; cursor: pointer;">View Details</button>
                                ${order.status === 'pending' ? `
                                    <button class="action-btn accept-order-btn" data-order-id="${order.id}" style="flex:1; border-radius:12px; font-size:14px; padding: 8px 12px;">Accept Order</button>
                                ` : ''}
                                ${order.status === 'accepted' ? `
                                    <button class="action-btn complete-order-btn" data-order-id="${order.id}" style="flex:1; border-radius:12px; font-size:14px; padding: 8px 12px; background: #2980b9;">Mark as Completed</button>
                                ` : ''}
                            </div>
                        </div>`;
                    ordersContainer.insertAdjacentHTML('beforeend', orderCard);
                });


            }

            orderFilter.addEventListener('change', () => {
                renderOrders(orderFilter.value);
            });

            function showOrderDetails(order) {
                // Populate seller details
                sellerDetailsContainer.innerHTML = `
                    <div class="seller-info-card">
                        <h3>Order Details</h3>
                        <div class="info-row">
                            <div class="info-label">Order ID:</div>
                            <div class="info-value">${order.id}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Waste Type:</div>
                            <div class="info-value">${order.waste_type}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Quantity:</div>
                            <div class="info-value">${order.quantity} kg</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Pickup Address:</div>
                            <div class="info-value">${order.address || 'Not specified'}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Status:</div>
                            <div class="info-value">${order.status}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Estimated Price:</div>
                            <div class="info-value">${order.estimated_price ? `₹${parseFloat(order.estimated_price).toFixed(2)}` : 'N/A'}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Trees Saved:</div>
                            <div class="info-value">${order.trees_saved ? parseFloat(order.trees_saved).toFixed(2) : 0}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Order Date:</div>
                            <div class="info-value">${order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</div>
                        </div>
                    </div>
                        <div class="seller-info-card">
                        <h3>Connected Seller Details</h3>
                        <div style="height:8px"></div>
                        <div class="info-row">
                            <div class="info-label">Seller Name:</div>
                            <div class="info-value">${order.seller_name || order.user_name || 'N/A'}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Mobile:</div>
                            <div class="info-value">${order.seller_mobile || order.user_mobile || 'N/A'}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Email:</div>
                            <div class="info-value">${order.seller_email || order.user_email || 'N/A'}</div>
                        </div>
                        <div class="info-row">
                            <div class="info-label">Location:</div>
                            <div class="info-value">${order.seller_location || 'N/A'}</div>
                        </div>
                    </div>
                `;

                // Show the order details modal
                orderDetailsModal.classList.add('active');

                // Initialize map if location data is available
                if (map) {
                    map.remove(); // Remove previous map instance
                }

                if (window.L && order.latitude && order.longitude) {
                    try {
                        map = L.map('orderMap').setView([order.latitude, order.longitude], 15);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; OpenStreetMap contributors'
                        }).addTo(map);

                        L.marker([order.latitude, order.longitude]).addTo(map)
                            .bindPopup(`<b>Pickup for ${order.waste_type}</b><br>${order.address}`).openPopup();

                        // Ensure map renders properly after modal is shown
                        setTimeout(() => { if (map) map.invalidateSize(); }, 100);
                    } catch (mapErr) {
                        console.error('Leaflet map initialization failed', mapErr);
                        document.getElementById('orderMap').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#777;font-size:16px;">Map cannot be displayed</div>';
                    }
                } else {
                    // Show message if no location data
                    document.getElementById('orderMap').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#777;font-size:16px;">Location data not available</div>';
                }
            }

            backToOrdersBtn.addEventListener('click', () => {
                orderDetailsModal.classList.remove('active');
                if (map) {
                    map.remove();
                    map = null;
                }
            });

            ordersContainer.addEventListener('click', async (e) => {
                const target = e.target;

                if (target.closest('.view-details-btn')) {
                    const button = target.closest('.view-details-btn');
                    const card = button.closest('.order-card');
                    const orderId = card.dataset.orderId;
                    console.log('View details clicked for order id:', orderId);
                    let order = allOrders.find(o => o.id == orderId);
                    console.log('Order object before details:', order);
                    if (!order) {
                        console.warn('Order not found in list; fetching single order by id from API');
                        try {
                            const resp = await fetch(`/api/order/${orderId}`);
                            const data = await resp.json();
                            if (data && data.success && data.order) {
                                order = data.order;
                                // server returns user details as separate property
                                if (data.user) {
                                    order.seller_name = data.user.name || data.user.business_name;
                                    order.seller_mobile = data.user.mobile;
                                    order.seller_email = data.user.email;
                                    order.seller_location = (data.user.city || '') + (data.user.pincode ? ', ' + data.user.pincode : '');
                                }
                            }
                        } catch (err) {
                            console.error('Failed to fetch order by id from API:', err);
                        }
                    }
                    if (order) {
                        try {
                            // If we don't have seller/user details, fetch them using userId
                            const userId = order.user_id || order.userId || order.user || order.userId;
                            console.log('Detected user id for order:', userId);
                            if ((!order.seller_name && !order.user_name) && userId) {
                                try {
                                    const uResp = await fetch(`/api/user/id/${userId}`);
                                    const uData = await uResp.json();
                                    if (uData && uData.success && uData.user) {
                                        order.seller_name = uData.user.name || uData.user.business_name || '';
                                        order.seller_mobile = uData.user.mobile;
                                        order.seller_email = uData.user.email;
                                        order.seller_location = (uData.user.city || '') + (uData.user.pincode ? ', ' + uData.user.pincode : '');
                                    }
                                } catch (err) {
                                    console.warn('Failed to fetch seller user by id:', err);
                                }
                            }
                            showOrderDetails(order);
                        } catch (err) {
                            console.error('Error showing order details:', err);
                            alert('Failed to show order details. Please check the console for more info.');
                        }
                    } else {
                        console.warn('Order not found');
                        alert('Order not found');
                    }
                }
                if (target.classList.contains('accept-order-btn')) {
                    const button = target;
                    const card = button.closest('.order-card');
                    const orderId = card.dataset.orderId;
                    
                    // For this flow, we'll prompt for a recycler ID.
                    // A real app would get this from the buyer's session.
                    // Open modal to accept order instead of prompt
                    const acceptModal = document.getElementById('acceptOrderModal');
                    const acceptInput = document.getElementById('acceptInput');
                    const acceptConfirmBtn = document.getElementById('acceptConfirmBtn');
                    const acceptCancelBtn = document.getElementById('acceptCancelBtn');
                    const acceptError = document.getElementById('acceptError');

                    acceptInput.value = '';
                    acceptError.style.display = 'none';
                    acceptModal.style.display = 'flex';

                    // Remove existing listeners to avoid duplicates
                    acceptConfirmBtn.onclick = null;
                    acceptCancelBtn.onclick = null;

                acceptCancelBtn.onclick = () => {
                    acceptModal.style.display = 'none';
                };

                acceptConfirmBtn.onclick = async () => {
                    acceptError.style.display = 'none';
                    acceptConfirmBtn.disabled = true;
                    acceptConfirmBtn.textContent = 'Accepting...';
                    let recyclerIdInput = acceptInput.value.trim();
                    if (!recyclerIdInput) {
                        acceptError.textContent = 'Please enter a recycler id or mobile number';
                        acceptError.style.display = 'block';
                        acceptConfirmBtn.disabled = false;
                        acceptConfirmBtn.textContent = 'Accept';
                        return;
                    }
                    // normalize: if user entered 10-digit number assume mobile; otherwise assume id
                    let recyclerId = recyclerIdInput;
                    try {
                        if (/^[0-9]{10}$/.test(recyclerIdInput)) {
                            // mobile -> fetch user by mobile
                            try {
                                const resp = await fetch(`/api/user/${encodeURIComponent(recyclerIdInput)}`);
                                const data = await resp.json();
                                if (data && data.success && data.user) {
                                    recyclerId = data.user.id;
                                } else {
                                    throw new Error('Recycler not found for mobile ' + recyclerIdInput);
                                }
                            } catch (err) {
                                alert('Failed to resolve mobile to user id: ' + err.message);
                                return;
                            }
                        } else {
                            // Try to parse as numeric id
                            const maybeId = parseInt(recyclerIdInput, 10);
                            if (!isNaN(maybeId)) recyclerId = maybeId;
                            else {
                                alert('Please enter a valid numeric id or 10-digit mobile number.');
                                return;
                            }
                        }
                    } catch (err) {
                        alert('Invalid recycler id format.');
                        return;
                    }

                    button.disabled = true;
                    button.textContent = 'Accepting...';

                    try {
                        const response = await fetch(`/api/orders/${orderId}/accept`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ recyclerId: recyclerId })
                        });
                        const result = await response.json();
                        if (result.success) {
                            button.textContent = 'Accepted';
                            card.querySelector('.order-status').textContent = 'accepted';
                            // Close modal and clear input
                            acceptModal.style.display = 'none';
                            acceptInput.value = '';
                            acceptConfirmBtn.disabled = false;
                            acceptConfirmBtn.textContent = 'Accept';
                            // refresh list
                            await fetchOrders();
                        } else {
                            throw new Error(result.error || 'Failed to accept order.');
                        }
                    } catch (error) {
                        alert(`Error: ${error.message}`);
                        button.disabled = false;
                        button.textContent = 'Accept Order';
                    }
                    };
                }
                if (target.classList.contains('complete-order-btn')) {
                    const button = target;
                    const card = button.closest('.order-card');
                    const orderId = card.dataset.orderId;

                    if (!confirm("Are you sure you want to mark this order as completed?")) {
                        return;
                    }

                    button.disabled = true;
                    button.textContent = 'Completing...';

                    try {
                        // We'll create a new endpoint for this
                        const response = await fetch(`/api/orders/${orderId}/complete`, {
                            method: 'POST'
                        });
                        const result = await response.json();
                        if (result.success) {
                            // Visually remove the card as it's now completed
                            card.style.opacity = '0.5';
                            card.querySelector('.order-actions').innerHTML = '<p style="color:var(--green); font-weight:bold; text-align:center; margin:0;">Completed</p>';
                            card.querySelector('.order-status').textContent = 'completed';
                        } else {
                            throw new Error(result.error || 'Failed to complete order.');
                        }
                    } catch (error) {
                        alert(`Error: ${error.message}`);
                        button.disabled = false;
                        button.textContent = 'Mark as Completed';
                    }
                }
            });

            fetchOrders();
        });
    