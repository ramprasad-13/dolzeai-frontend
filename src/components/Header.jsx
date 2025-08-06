// frontend/src/components/Header.jsx
import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ activeTool, setIsSidebarOpen }) => { // Receive setIsSidebarOpen
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const toolTitles = {
    'summarizer': 'Text Summarizer',
    'idea-generator': 'Idea Generator',
    'content-refiner': 'Content Refiner',
    'chatbot': 'Simple Chatbot'
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-300 bg-white p-4">
      <div className="flex items-center">
        {/* Hamburger Menu Button - visible only on mobile */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="mr-3 text-gray-500 md:hidden"
          aria-label="Open sidebar"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h2 className="text-xl font-semibold capitalize">{toolTitles[activeTool] || 'Dashboard'}</h2>
      </div>
      <div className="flex items-center">
        <span className="mr-4 hidden text-sm sm:block">{currentUser?.email}</span>
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
