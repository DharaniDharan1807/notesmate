import React, { useState, useEffect } from 'react';
       import API from "../../Services/api";
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
         const [password, setPassword] = useState('');
         const [displayedText, setDisplayedText] = useState('');
         const [error, setError] = useState('');
         const [isLoading, setIsLoading] = useState(false);
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

         const handleSubmit = async () => {
           if (!username.trim() || !password.trim()) {
             setError('Please enter both username and password');
             return;
           }

           setIsLoading(true);
           try {
             await onNext({ username, password });
             setError('');
           } catch (err) {
             console.error('Signup error:', err);
             setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
           } finally {
             setIsLoading(false);
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
               <div className="flex flex-col items-center space-y-4">
                 <div className="flex items-center space-x-4">
                   <input
                     type="text"
                     placeholder="Username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md w-64 focus:outline-none focus:border-gray-500"
                     onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                     disabled={isLoading}
                   />
                   <input
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md w-64 focus:outline-none focus:border-gray-500"
                     onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                     disabled={isLoading}
                   />
                   <Button onClick={handleSubmit} disabled={isLoading}>
                     {isLoading ? 'Signing up...' : 'Next'}
                   </Button>
                 </div>
                 {error && <p className="text-red-500 text-sm">{error}</p>}
                 <p className="text-gray-500 text-sm mt-2">
                   Already have an account? 
                   <button onClick={onLogin} className="text-blue-400 hover:text-blue-300 ml-1">
                     Log In
                   </button>
                 </p>
               </div>
             </div>
           </div>
         );
       };

       export default SignUpScreen;