    // Email validation function for Gmail addresses
    function isValidGmail(email) {
        // Check if it's a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        // Check if it's a Gmail address (gmail.com or googlemail.com)
        const gmailRegex = /^[^\s@]+@(gmail\.com|googlemail\.com)$/i;
        return gmailRegex.test(email);
    }

    // Profile form handler
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!name || !email) {
                alert('Please fill in all fields');
                return;
            }

            // Validate Gmail address
            if (!isValidGmail(email)) {
                alert(translate('gmail_required'));
                return;
            }

            try {
                // Get user data from session
                const user = JSON.parse(sessionStorage.getItem('user') || '{}');

                // Store profile data in session
                user.name = name;
                user.email = email;
                sessionStorage.setItem('user', JSON.stringify(user));

                // Since this is the seller profile page, redirect to location
                window.location.href = 'location.html';
            } catch (error) {
                console.error('Profile save error:', error);
                alert('Failed to save profile. Please try again.');
            }
        });
    }
