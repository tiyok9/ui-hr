import React from "react";

const SummarySkeleton = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 animate-pulse"
        >
          <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
          <div className="h-7 w-24 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SummarySkeleton;
