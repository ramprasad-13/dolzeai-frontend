// frontend/src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ setActiveTool, activeTool, isSidebarOpen, setIsSidebarOpen }) => {
  const navItems = [
    { id: 'summarizer', label: 'Summarizer' },
    { id: 'idea-generator', label: 'Idea Generator' },
    { id: 'content-refiner', label: 'Content Refiner' },
    { id: 'chatbot', label: 'Simple Chatbot' },
  ];

  const handleNavClick = (toolId) => {
    setActiveTool(toolId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Overlay for mobile: closes the sidebar when clicked */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar with responsive classes */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-800 text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold">Reely AI</h1>
          {/* Close button for mobile */}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden" aria-label="Close sidebar">
             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full px-6 py-3 text-left transition-colors ${
                activeTool === item.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
