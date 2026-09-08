import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse max-w-7xl mx-auto px-4 py-12 space-y-6">
      <div className="h-10 bg-fkcGold/20 rounded w-1/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-800 rounded w-full"></div>
        <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        <div className="h-4 bg-gray-800 rounded w-4/6"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="h-40 bg-fkcBlue/20 rounded border border-fkcGold/20"></div>
        <div className="h-40 bg-fkcBlue/20 rounded border border-fkcGold/20"></div>
        <div className="h-40 bg-fkcBlue/20 rounded border border-fkcGold/20"></div>
      </div>
    </div>
  );
}