import React from "react";

const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse space-y-4 p-4 border rounded-lg">
        <div className="bg-gray-300 h-40 w-full"></div>
        <div className="h-4 bg-gray-300 w-3/4"></div>
        <div className="h-4 bg-gray-300 w-1/2"></div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
