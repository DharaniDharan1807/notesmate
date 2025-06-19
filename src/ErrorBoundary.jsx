import React from 'react';

     class ErrorBoundary extends React.Component {
       state = { hasError: false, error: null };

       static getDerivedStateFromError(error) {
         return { hasError: true, error };
       }

       componentDidCatch(error, errorInfo) {
         console.error('Error caught by ErrorBoundary:', error, errorInfo);
       }

       render() {
         if (this.state.hasError) {
           return (
             <div className="min-h-screen bg-gray-900 flex items-center justify-center">
               <div className="text-center text-white">
                 <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                 <p className="text-red-500 mb-4">{this.state.error?.message}</p>
                 <button
                   onClick={() => window.location.reload()}
                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                 >
                   Reload Page
                 </button>
               </div>
             </div>
           );
         }
         return this.props.children;
       }
     }

     export default ErrorBoundary;