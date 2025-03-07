import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-48">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Loading Text */}
      <p className="mt-2 text-gray-600 text-sm font-medium">Loading...</p>
    </div>
  );
};

export default Spinner;
