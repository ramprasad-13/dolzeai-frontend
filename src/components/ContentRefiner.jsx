// frontend/src/components/ContentRefiner.jsx
import React, { useState } from 'react';
import { authenticatedFetch } from '../api';
import { useLocalStorage } from '../hooks/useLocalStorage'; // Import the new hook

const ContentRefiner = () => {
  const [text, setText] = useState('');
  const [instruction, setInstruction] = useState('');
  const [refinedText, setRefinedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Use the custom hook for history, giving it a unique key
  const [history, setHistory] = useLocalStorage('contentrefiner-history', []);

  const handleRefineContent = async () => {
    if (!text || !instruction) {
      setError('Please enter both text and an instruction.');
      return;
    }
    setIsLoading(true);
    setError('');
    setRefinedText('');

    try {
      const data = await authenticatedFetch('/refine-content', {
        method: 'POST',
        body: JSON.stringify({ text, instruction }),
      });
      setRefinedText(data.refined_text);
      // Add to history, keeping the most recent 5 items
      setHistory(prevHistory => [{ request: { text, instruction }, response: data.refined_text }, ...prevHistory].slice(0, 5));
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-2 text-lg font-semibold">Content Refiner</h3>
        <p className="mb-4 text-gray-600">
          Improve your writing by providing text and an instruction (e.g., "make it more formal").
        </p>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          rows="8"
          placeholder="Paste the text you want to refine..."
          disabled={isLoading}
        ></textarea>

        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          className="mt-4 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Instruction (e.g., 'make it more enthusiastic', 'fix grammar')"
          disabled={isLoading}
        />
        
        <button
          onClick={handleRefineContent}
          disabled={isLoading}
          className="mt-4 w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 sm:w-auto"
        >
          {isLoading ? 'Refining...' : 'Refine Content'}
        </button>

        {error && <p className="mt-4 rounded-md bg-red-100 p-3 text-red-600">{error}</p>}
        
        {refinedText && (
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <h4 className="font-semibold text-gray-800">Refined Text:</h4>
            <p className="mt-2 whitespace-pre-wrap text-gray-700">{refinedText}</p>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold">History</h3>
          <ul className="space-y-4">
            {history.map((item, index) => (
              <li key={index} className="rounded-md border p-4">
                <p className="mb-2 text-sm font-semibold text-gray-500">Original Text:</p>
                <p className="mb-3 line-clamp-3 text-gray-700">{item.request.text}</p>
                 <p className="mb-2 text-sm font-semibold text-gray-500">Instruction:</p>
                <p className="mb-3 text-gray-700">{item.request.instruction}</p>
                <p className="mb-2 text-sm font-semibold text-gray-500">Refined Text:</p>
                <p className="whitespace-pre-wrap text-gray-700">{item.response}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContentRefiner;
