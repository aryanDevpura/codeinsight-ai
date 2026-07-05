import React from 'react';

const ReviewCard = ({ reviewData }) => {
  if (!reviewData) return null;
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6 text-gray-200">
      <h3 className="text-xl font-semibold text-white mb-4">Detailed Review</h3>
      
      <div className="mb-6">
        <h4 className="text-lg text-blue-400 mb-2">Analysis</h4>
        <p className="whitespace-pre-wrap text-gray-300">{reviewData.review}</p>
      </div>

      {reviewData.bugs && reviewData.bugs.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg text-red-400 mb-2">Bugs Identified</h4>
          <ul className="list-disc pl-5 space-y-1">
            {reviewData.bugs.map((bug, i) => (
              <li key={i} className="text-gray-300">{bug}</li>
            ))}
          </ul>
        </div>
      )}

      {reviewData.suggestions && reviewData.suggestions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg text-yellow-400 mb-2">Suggestions</h4>
          <ul className="list-disc pl-5 space-y-1">
            {reviewData.suggestions.map((suggestion, i) => (
              <li key={i} className="text-gray-300">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {reviewData.refactoredCode && (
        <div>
          <h4 className="text-lg text-green-400 mb-2">Refactored Code</h4>
          <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm font-mono text-gray-300">
            <code>{reviewData.refactoredCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
