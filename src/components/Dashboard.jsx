// frontend/src/components/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Summarizer from './Summarizer';
import IdeaGenerator from './IdeaGenerator';
import ContentRefiner from './ContentRefiner';
import Chatbot from './Chatbot';

const Dashboard = () => {
  const [activeTool, setActiveTool] = useState('summarizer');
  // State to manage the sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderTool = () => {
    switch (activeTool) {
      case 'summarizer':
        return <Summarizer />;
      case 'idea-generator':
        return <IdeaGenerator />;
      case 'content-refiner':
        return <ContentRefiner />;
      case 'chatbot':
        return <Chatbot />;
      default:
        return <Summarizer />;
    }
  };

  return (
    // The 'relative' class is needed for the mobile overlay positioning
    <div className="relative flex h-screen bg-gray-100 font-sans">
      <Sidebar
        setActiveTool={setActiveTool}
        activeTool={activeTool}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          activeTool={activeTool}
          setIsSidebarOpen={setIsSidebarOpen} // Pass setter to Header for the hamburger button
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderTool()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
