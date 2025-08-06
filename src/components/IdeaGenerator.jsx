// frontend/src/components/IdeaGenerator.jsx
import React, { useState } from 'react';
import { authenticatedFetch } from '../api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { marked } from 'marked'; // Import the marked library

const IdeaGenerator = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useLocalStorage('ideagenerator-history', []);

  const handleGenerateIdeas = async () => {
    if (!topic) {
      setError('Please enter a topic to generate ideas.');
      return;
    }
    setIsLoading(true);
    setError('');
    setIdeas('');

    try {
      const data = await authenticatedFetch('/generate-ideas', {
        method: 'POST',
        body: JSON.stringify({ topic }),
      });
      // Parse the Markdown response into an HTML string
      const parsedIdeas = marked.parse(data.ideas);
      setIdeas(parsedIdeas);
      setHistory(prevHistory => [{ request: topic, response: parsedIdeas }, ...prevHistory].slice(0, 5));
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-2 text-lg font-semibold">Idea Generator</h3>
        <p className="mb-4 text-gray-600">
          Enter a topic and let AI brainstorm some creative ideas for you.
        </p>
        
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., 'blog post about sustainable living'"
          disabled={isLoading}
        />
        
        <button
          onClick={handleGenerateIdeas}
          disabled={isLoading}
          className="mt-4 w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 sm:w-auto"
        >
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </button>

        {error && <p className="mt-4 rounded-md bg-red-100 p-3 text-red-600">{error}</p>}
        
        {ideas && (
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <h4 className="font-semibold text-gray-800">Generated Ideas:</h4>
            {/* Render the HTML string */}
            <div className="prose prose-sm mt-2 max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: ideas }} />
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold">History</h3>
          <ul className="space-y-4">
            {history.map((item, index) => (
              <li key={index} className="rounded-md border p-4">
                <p className="mb-2 text-sm font-semibold text-gray-500">Topic:</p>
                <p className="mb-3 text-gray-700">{item.request}</p>
                <p className="mb-2 text-sm font-semibold text-gray-500">Generated Ideas:</p>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: item.response }} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
