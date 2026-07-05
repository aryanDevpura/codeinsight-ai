import React from 'react';

const ScoreCard = ({ score, complexity }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Code Quality Score</h3>
        <span className={`text-2xl font-bold ${score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
          {score}/100
        </span>
      </div>
      
      {complexity && (
        <div className="grid grid-cols-2 gap-4 mt-4 text-gray-300">
          <div className="bg-gray-700 p-3 rounded">
            <span className="block text-sm text-gray-400">Time Complexity</span>
            <span className="font-mono">{complexity.time || 'N/A'}</span>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <span className="block text-sm text-gray-400">Space Complexity</span>
            <span className="font-mono">{complexity.space || 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;
