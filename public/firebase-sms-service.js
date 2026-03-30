import { getFirebaseAuth } from './firebase-config.js';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

class FirebaseSMSService {
  constructor() {
    this.confirmationResult = null;
    this.recaptchaVerifier = null;
    this.auth = getFirebaseAuth(); // Get the auth object from the function
    // Test phone numbers for development (Firebase test numbers)
    this.testNumbers = {
      '+919999999999': '123456', // Test number 1
      '+919999999998': '123456', // Test number 2
      '+919999999997': '123456'  // Test number 3
    };
    // Restore test confirmation from localStorage if exists
    const storedConfirmation = localStorage.getItem('firebaseTestConfirmation');
    if (storedConfirmation) {
      const confirmationData = JSON.parse(storedConfirmation);
      if (confirmationData.type === 'test' && this.testNumbers[confirmationData.phone]) {
        this.confirmationResult = {
          confirm: async (code) => {
            if (code === this.testNumbers[confirmationData.phone]) {
              return {
                user: {
                  uid: `test-${confirmationData.phone}`,
                  phoneNumber: confirmationData.phone,
                  getIdToken: async () => 'test-id-token-' + confirmationData.phone
                }
              };
            } else {
              throw new Error('Invalid OTP');
            }
          }
        };
      }
    }
    console.log('FirebaseSMSService initialized');
  }

  initRecaptcha(buttonId) {
    try {
      // Clear any existing reCAPTCHA
      if (this.recaptchaVerifier) {
        this.recaptchaVerifier.clear();
      }

      // Initialize reCAPTCHA
      // --- FIX: 'this.auth' is now the FIRST parameter ---
      this.recaptchaVerifier = new RecaptchaVerifier(this.auth, buttonId, {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });

      console.log('reCAPTCHA initialized for button:', buttonId);
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
    }
  }

  async sendOTP(phoneNumber) {
    try {
      // Ensure phone number is in international format
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : '+91' + phoneNumber;

      console.log('Sending OTP to:', formattedPhone);

      // Check if it's a test number
      if (this.testNumbers[formattedPhone]) {
        console.log('Using test number for development');
        // Store test confirmation in localStorage to persist across pages
        localStorage.setItem('firebaseTestConfirmation', JSON.stringify({
          type: 'test',
          phone: formattedPhone,
          timestamp: Date.now()
        }));
        // Also set in memory for immediate use
        this.confirmationResult = {
          confirm: async (code) => {
            if (code === this.testNumbers[formattedPhone]) {
              // Simulate successful verification
              return {
                user: {
                  uid: `test-${formattedPhone}`,
                  phoneNumber: formattedPhone,
                  getIdToken: async () => 'test-id-token-' + formattedPhone
                }
              };
            } else {
              throw new Error('Invalid OTP');
            }
          }
        };
        console.log('Test OTP sent successfully');
        return {
          success: true,
          message: 'Test OTP sent successfully'
        };
      } else {
        // Send OTP using Firebase for real numbers
        this.confirmationResult = await signInWithPhoneNumber(this.auth, formattedPhone, this.recaptchaVerifier); // Use the stored auth object
        console.log('OTP sent successfully via Firebase');
        return {
          success: true,
          message: 'OTP sent successfully'
        };
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async verifyOTP(code) {
    try {
      if (!this.confirmationResult) {
        throw new Error('No OTP request found. Please request OTP first.');
      }

      // Verify the OTP
      const result = await this.confirmationResult.confirm(code);

      console.log('OTP verified successfully');

      return {
        success: true,
        user: {
          uid: result.user.uid,
          phoneNumber: result.user.phoneNumber,
          idToken: await result.user.getIdToken()
        }
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export a singleton instance
export const firebaseSMSService = new FirebaseSMSService();