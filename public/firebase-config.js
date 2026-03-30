// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ8oaPHUQZZsSLjH0cvEojpUukkd9ebEo",
  authDomain: "ecovera-1ff64.firebaseapp.com",
  projectId: "ecovera-1ff64",
  storageBucket: "ecovera-1ff64.firebasestorage.app",
  messagingSenderId: "52411302399",
  appId: "1:52411302399:web:9bcdbffae20da9caebe7ca",
  measurementId: "G-D9YP0WY21D"
};

// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import {
  getAuth
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export a function that returns the auth object
export function getFirebaseAuth() {
  return auth;
}