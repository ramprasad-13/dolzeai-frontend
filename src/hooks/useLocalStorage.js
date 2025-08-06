// frontend/src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

// A function to get the initial value from localStorage or use a default
function getStoredValue(key, initialValue) {
  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue);
    }
  } catch (error) {
    console.error("Error reading from localStorage", error);
  }
  // Return initialValue if it's a function result or the value itself
  return initialValue instanceof Function ? initialValue() : initialValue;
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getStoredValue(key, initialValue);
  });

  // This useEffect runs whenever the 'value' changes, and saves it to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
}
