import React, { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import CodeEditor from './components/CodeEditor';
import ScoreCard from './components/ScoreCard';
import ReviewCard from './components/ReviewCard';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

function App() {
  const [language, setLanguage] = useState('C++');
  const [code, setCode] = useState('// Write your code here...');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviewData, setReviewData] = useState(null);

  const handleReviewCode = () => {
    // Placeholder for Milestone 2 - backend integration comes in Milestone 4
    setLoading(true);
    setError('');
    setReviewData(null);

    // Mock delay to show loading state
    setTimeout(() => {
      setLoading(false);
      // Example of an error state:
      // setError('Failed to connect to the review service.');
      
      // Mock result placeholder
      setReviewData({
        score: 85,
        complexity: { time: 'O(n)', space: 'O(1)' },
        bugs: ['Potential null pointer dereference on line 12'],
        suggestions: ['Use standard library functions for sorting'],
        review: 'The code is generally well-structured but lacks proper error handling in some edge cases.',
        refactoredCode: '// Refactored code would appear here\nint main() {\n  return 0;\n}'
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            CodeInsight AI
          </h1>
          <p className="text-gray-400">Intelligent code review powered by Gemini.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col h-full">
            <LanguageSelector selected={language} onSelect={setLanguage} />
            <div className="flex-grow mb-6">
              <CodeEditor language={language} code={code} onChange={setCode} />
            </div>
            <button
              onClick={handleReviewCode}
              disabled={loading || !code.trim()}
              className={`w-full py-3 px-6 rounded-md font-bold text-lg transition-colors ${
                loading || !code.trim() 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
              }`}
            >
              {loading ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 min-h-[500px] flex flex-col overflow-y-auto max-h-[80vh]">
            {loading ? (
              <div className="flex flex-col items-center justify-center flex-grow">
                <LoadingSpinner />
                <p className="text-gray-400 mt-4 animate-pulse">Analyzing your code...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center flex-grow">
                <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-md">
                  {error}
                </div>
              </div>
            ) : reviewData ? (
              <div>
                <ScoreCard score={reviewData.score} complexity={reviewData.complexity} />
                <ReviewCard reviewData={reviewData} />
              </div>
            ) : (
              <div className="flex items-center justify-center flex-grow text-gray-500">
                <p>Submit your code for AI review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
