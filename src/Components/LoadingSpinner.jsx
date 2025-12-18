import React from 'react';

const LoadingSpinner = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-indigo-600 animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading, please wait...</p>
      </div>
    );
};

export default LoadingSpinner;