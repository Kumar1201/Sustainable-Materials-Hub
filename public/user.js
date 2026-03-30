// Mock Firebase SMS service for development
const firebaseSMSService = {
    initRecaptcha: (buttonId) => {
        console.log('Mock reCAPTCHA initialized for button:', buttonId);
    },
    sendOTP: async (mobile) => {
        console.log('Mock OTP sent to:', mobile);
        return { success: true };
    },
    verifyOTP: async (otp) => {
        console.log('Mock OTP verified:', otp);
        return {
            success: true,
            user: {
                idToken: 'mock-token-' + Date.now()
            }
        };
    }
};

// Base URL for API calls
const API_BASE_URL = window.location.origin; // Use the same origin as the page

// Helper function for making API calls
async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        method: options.method || 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options.headers
        },
        cache: 'no-cache',
        credentials: 'same-origin'
    };
    
    // Only add body for non-GET requests
    if (options.method !== 'GET' && options.body) {
        config.body = options.body;
    }

    try {
        console.log('Making API call to:', url);
        const response = await fetch(url, config);
        console.log('Response status:', response.status);
        
        const text = await response.text();
        console.log('Response text:', text);
        
        const data = text ? JSON.parse(text) : {};
        console.log('Parsed data:', data);

        if (!response.ok) {
            console.error('Response not OK:', response.status, data);
            const error = new Error(data.error || `API call failed with status ${response.status}`);
            error.data = data;
            error.status = response.status;
            throw error;
        }

        return data;
    } catch (error) {
        console.error('API call failed:', {
            message: error.message,
            url: url,
            config: config,
            error: error
        });
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Handle location form submission
    const locForm = document.getElementById('locForm');
    if (locForm) {
        locForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const pin = document.getElementById('pin').value;
            const state = document.getElementById('state').value;
            const city = document.getElementById('city').value;
            const landmark = document.getElementById('landmark').value;
            const hno = document.getElementById('hno').value;

            if (!pin || !state || !city || !hno) {
                alert('Please fill in all required fields');
                return;
            }

            try {
                // Get user data from session
                const user = JSON.parse(sessionStorage.getItem('user') || '{}');

                // Store location data in session
                user.location = {
                    pin,
                    state,
                    city,
                    landmark,
                    hno
                };
                sessionStorage.setItem('user', JSON.stringify(user));

                // Redirect based on role
                if (user.role === 'seller') {
                    window.location.href = 'home.html';
                } else if (user.role === 'buyer') {
                    window.location.href = 'recycler.html';
                } else {
                    window.location.href = 'home.html'; // Default fallback
                }
            } catch (error) {
                console.error('Error saving location:', error);
                alert('Error saving location. Please try again.');
            }
        });
    }
});
// --- FIX: Removed extra closing '}' brace from here ---
