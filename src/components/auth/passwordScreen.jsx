import React, { useState } from 'react';

const PasswordScreen = ({ onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (password.trim()) {
      onSubmit(password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-delay-0 {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
        }
        
        .animate-fade-in-delay-1 {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }
        
        .animate-fade-in-delay-2 {
          animation: fadeInUp 0.8s ease-out 0.9s forwards;
        }
      `}</style>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-white mb-3 opacity-0 animate-fade-in-delay-0">
            Let's be safe
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed opacity-0 animate-fade-in-delay-1">
            Create a password and remember it
          </p>
        </div>
        
        <div className="space-y-6 opacity-0 animate-fade-in-delay-2">
          <div className="flex items-center gap-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
            >
              Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordScreen;