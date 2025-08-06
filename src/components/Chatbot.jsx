// frontend/src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { authenticatedFetch } from '../api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { marked } from 'marked'; // Import the marked library

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useLocalStorage('chatbot-conversation', []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setConversation(prev => [...prev, userMessage]);
    const currentQuery = query;
    setQuery('');
    setIsLoading(true);
    setError('');

    try {
      const data = await authenticatedFetch('/chat', {
        method: 'POST',
        body: JSON.stringify({ query: currentQuery }),
      });
      // Parse the Markdown response into an HTML string
      const parsedResponse = marked.parse(data.response);
      const botMessage = { role: 'bot', content: parsedResponse };
      setConversation(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      const errorMessage = { role: 'bot', content: 'Sorry, I ran into an error. Please try again.' };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto rounded-lg bg-white p-6 shadow-md">
        <div className="space-y-4">
          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-lg rounded-lg px-4 py-2 ${
                  msg.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {/* Render the HTML string */}
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.content }} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-lg rounded-lg bg-gray-200 px-4 py-2 text-gray-800">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
