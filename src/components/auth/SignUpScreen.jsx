
import React, { useState, useEffect } from 'react';

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
  >
    {children}
  </button>
);

const SignUpScreen = ({ onNext, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Added password state
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Do you want to write a note?";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (username.trim() && password.trim()) {
      onNext({ username, password }); // Pass both username and password
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 min-h-[2rem]">
          {displayedText}
          <span className="animate-pulse">|</span>
        </h2>
        <p className="text-gray-400 mb-8">Let's get to know each other. Enter your username</p>
        <div className="flex items-center space-x-4 justify-center">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md w-64 focus:outline-none focus:border-gray-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md w-64 focus:outline-none focus:border-gray-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button onClick={handleSubmit}>
            Next
          </Button>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          Already have an account? 
          <button onClick={onLogin} className="text-blue-400 hover:text-blue-300 ml-1">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;