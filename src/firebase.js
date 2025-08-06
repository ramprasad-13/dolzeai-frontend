// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// IMPORTANT: Replace with your actual config from the Firebase console
// You can find this in your Firebase project settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrhb3AR_VlVIb0bxWtLPJli0JMZ6dm4i8",
  authDomain: "reely-ai.firebaseapp.com",
  projectId: "reely-ai",
  storageBucket: "reely-ai.firebasestorage.app",
  messagingSenderId: "184190016276",
  appId: "1:184190016276:web:704a93bc16c1a08d29c001",
  measurementId: "G-5ZJ18HMPPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services.
// The 'export' keyword is crucial here.
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
