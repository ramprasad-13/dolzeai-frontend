Reely AI - Frontend (React + Vite)
This directory contains the React frontend for the Reely AI application. It is a modern single-page application built with Vite and styled with Tailwind CSS. It provides a responsive user interface for interacting with the AI content tools and handles user authentication via Firebase.

🚀 Getting Started
Prerequisites
Node.js v20+: Ensure you have a compatible version of Node.js and npm installed.

Firebase Project: A Firebase project with Google Sign-In enabled in the Authentication section.

⚙️ Local Setup and Installation
1. Navigate to the Frontend Directory
All commands should be run from within the frontend folder.

cd frontend

2. Configure Firebase
You need to connect the frontend to your Firebase project.

In the frontend/src/ directory, locate the firebase.js file.

Replace the placeholder firebaseConfig object with your actual project credentials. You can find these in your Firebase project settings under Project Settings > General > Your apps > SDK setup and configuration.

// frontend/src/firebase.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

3. Install Dependencies
This command will install all the necessary Node.js packages defined in package.json.

npm install

4. Run the Development Server
This command starts the Vite development server with hot-reloading.

npm run dev

The frontend application will be available at http://localhost:5173.

☁️ Deployment
This frontend is configured for easy deployment on services like Vercel or Firebase Hosting.

Before deploying, ensure the API_BASE_URL constant in frontend/src/api.js is updated to point to your live backend URL (e.g., your Render service URL).
