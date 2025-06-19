import React from 'react';
import Button from '../common/Button';

const WelcomeScreen = ({ onLogin, onSignUp }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="flex flex-row items-center justify-center w-full max-w-3xl space-x-6">
        {/* Left Column: Diamond Logo */}
        <div className="flex justify-end">
          <div className="group cursor-pointer">
            {/* Diamond Shape with 3D Effect */}
            <div className="relative w-20 h-20 transform rotate-45 transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:-rotate-[225deg]">
              {/* Base Diamond Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 rounded-lg shadow-2xl border border-purple-800/50">
                {/* Inner Facet 1: Top-Left Highlight */}
                <div className="absolute top-1 left-1 w-10 h-10 bg-gradient-to-br from-purple-300/80 to-transparent rounded-tl-lg opacity-70 transition-opacity duration-500 group-hover:opacity-90"></div>
                {/* Inner Facet 2: Bottom-Right Shadow */}
                <div className="absolute bottom-1 right-1 w-10 h-10 bg-gradient-to-tl from-purple-900/80 to-transparent rounded-br-lg opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>
                {/* Inner Facet 3: Center Shine */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-50 animate-pulse group-hover:opacity-70"></div>
                {/* Inner Facet 4: Diagonal Reflection */}
                <div className="absolute inset-2 bg-gradient-to-tr from-transparent via-purple-400/20 to-transparent rounded-lg opacity-40 transition-opacity duration-500 group-hover:opacity-60"></div>
              </div>
              {/* Outer Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 rounded-lg blur-lg opacity-50 group-hover:opacity-90 group-hover:blur-xl transition-all duration-700"></div>
              {/* Subtle 3D Shadow */}
              <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.5),0_0_20px_rgba(147,51,234,0.3)] group-hover:shadow-[inset_0_0_15px_rgba(0,0,0,0.7),0_0_30px_rgba(147,51,234,0.5)] transition-shadow duration-500"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Wordings and Buttons */}
        <div className="flex flex-col items-start text-left">
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
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-500 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;