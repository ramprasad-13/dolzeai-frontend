// frontend/src/components/Login.jsx
import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/'); // Redirect to dashboard on successful login
    } catch (error) {
      console.error("Failed to log in with Google", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">Reely AI</h1>
        <p className="mb-8 text-gray-600">Your Smart Content Studio</p>
        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white p-3 font-semibold text-gray-700 shadow-md ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50"
        >
          <img className="h-6 w-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
