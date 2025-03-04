"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-transparent"></div>
    </div>
  );
}
