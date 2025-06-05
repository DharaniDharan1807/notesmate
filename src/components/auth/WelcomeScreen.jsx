
import React from 'react';
import Button from '../common/Button';

const WelcomeScreen = ({ onLogin, onSignUp }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="flex flex-row items-center justify-center w-full max-w-3xl space-x-6">
        {/* Left Column: Diamond Logo */}
        <div className="flex justify-end">
          <div className="group cursor-pointer">
            {/* Diamond Shape */}
            <div className="relative w-20 h-20 transform rotate-45 transition-transform duration-700 ease-in-out group-hover:rotate-[225deg]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 rounded-lg shadow-2xl">
                {/* Inner highlight for 3D effect */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-gradient-to-br from-purple-300 to-transparent rounded opacity-60"></div>
                {/* Subtle inner shadow */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-tl from-purple-800 to-transparent rounded opacity-40"></div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Wordings and Buttons */}
        <div className="flex flex-col items-start text-left ">
          {/* Brand Name */}
          <h1 className="text-4xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-3 tracking-wide shadow-md">
            Dharani's notes
          </h1>
          
          {/* Tagline */}
          <p className="text-gray-400 text-lg mb-6 font-light tracking-wider">
            Secure. Fast. Simple.
          </p>

          {/* Buttons */}
          <div className="flex flex-row space-x-4">
            <Button
              onClick={onLogin}
              className="w-32 py-1.5 px-4 !bg-black text-white rounded-lg font-medium transition-all duration-200 delay-200 ease-in-out hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            >
              Log In
            </Button>
            
            <Button
              onClick={onSignUp}
              variant="secondary"
              className="w-32 py-1.5 px-4 !bg-black !border-none text-white rounded-lg font-medium transition-all duration-200 delay-200 ease-in-out hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-500 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-35 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;