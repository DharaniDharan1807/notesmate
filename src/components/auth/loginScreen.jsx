import React, { useState } from 'react';

const LoginScreen = ({ onNext, onSignUp }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) return;
    onNext(username); // Pass the username to the next screen
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
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

        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.3; transform: scale(0.8); }
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

        .glowing-star {
          position: absolute;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 10%, transparent 70%);
          border-radius: 50%;
          animation: twinkle 3s infinite;
          pointer-events: none;
        }

        .input-glow {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          transition: box-shadow 0.3s ease;
        }

        .input-glow:focus {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
        }

        .button-glow {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
          transition: box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .button-glow:hover {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
          background-color: #6b7280; /* Slightly lighter grey on hover */
        }
      `}</style>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-blue-900/30 pointer-events-none" />

      {/* Glowing Stars Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="glowing-star w-2 h-2"
          style={{ top: '15%', left: '20%', animationDelay: '0s' }}
        />
        <div
          className="glowing-star w-1 h-1"
          style={{ top: '25%', right: '15%', animationDelay: '1s' }}
        />
        <div
          className="glowing-star w-2 h-2"
          style={{ bottom: '20%', left: '30%', animationDelay: '0.5s' }}
        />
        <div
          className="glowing-star w-1 h-1"
          style={{ bottom: '10%', right: '25%', animationDelay: '2s' }}
        />
        <div
          className="glowing-star w-2 h-2"
          style={{ top: '40%', left: '50%', animationDelay: '1.5s' }}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-3 opacity-0 animate-fade-in-delay-0">
            Welcome back!
          </h1>
          <p className="text-gray-300 text-base leading-relaxed opacity-0 animate-fade-in-delay-1">
            Enter your username to continue
          </p>
        </div>

        <div className="w-full max-w-sm space-y-6 opacity-0 animate-fade-in-delay-2 flex justify-center">
          <div className="flex items-center gap-3 w-full">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent input-glow backdrop-blur-sm transition-all duration-300"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-gray-600 text-white rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white button-glow flex items-center justify-center"
            >
              Next
            </button>
          </div>
        </div>

        <div className="text-center mt-8 opacity-0 animate-fade-in-delay-2">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <button
              onClick={onSignUp}
              className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200 focus:outline-none focus:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;