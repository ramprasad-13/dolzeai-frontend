// frontend/src/api.js
import { auth } from './firebase';

const API_BASE_URL ='https://dolzeai-backend.onrender.com/api'; //use it in production
//const API_BASE_URL = 'http://localhost:8000/api'; // Your FastAPI backend URL

// This is a helper function to make authenticated API calls
export const authenticatedFetch = async (endpoint, options = {}) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated.');
  }

  // Get the Firebase ID token for the current user.
  const token = await user.getIdToken();

  // Set up the headers, including the Authorization header.
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'An unknown error occurred' }));
    throw new Error(errorData.detail || 'API request failed');
  }

  return response.json();
};
