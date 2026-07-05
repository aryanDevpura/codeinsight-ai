import React, { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import CodeEditor from './components/CodeEditor';
import ScoreCard from './components/ScoreCard';
import ReviewCard from './components/ReviewCard';
import LoadingSpinner from './components/LoadingSpinner';
import { reviewCode } from './services/api';

function App() {
  const [language, setLanguage] = useState('C++');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviewData, setReviewData] = useState(null);

  const handleReviewCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }

    setLoading(true);
    setError('');
    setReviewData(null);

    try {
      const data = await reviewCode(language, code);
      setReviewData(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#ffa116] mb-3 tracking-tight">
            CodeInsight AI
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Panel: Editor */}
          <div className="flex flex-col gap-4">
            <LanguageSelector selected={language} onSelect={setLanguage} />
            <CodeEditor language={language} code={code} onChange={setCode} />
            <button
              onClick={handleReviewCode}
              disabled={loading || !code.trim()}
              className={`w-full py-3.5 px-6 rounded-lg font-semibold text-base transition-colors ${
                loading || !code.trim()
                  ? 'bg-[#3e3e42] text-gray-500 cursor-not-allowed'
                  : 'bg-[#ffa116] hover:bg-[#ffb347] text-black shadow-md'
              }`}
            >
              {loading ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>

          {/* Right Panel: Results */}
          <div className="bg-[#282828] p-5 md:p-6 rounded-xl border border-[#3e3e42] min-h-[540px] flex flex-col overflow-y-auto max-h-[85vh]">
            {loading ? (
              <div className="flex flex-col items-center justify-center flex-grow">
                <LoadingSpinner />
                <p className="text-gray-400 mt-4">Analyzing your code...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center flex-grow">
                <div className="bg-[#ff375f]/10 border border-[#ff375f] text-[#ff375f] p-4 rounded-lg text-center max-w-md">
                  <p className="font-medium mb-1">Analysis Failed</p>
                  <p className="text-sm opacity-80">{error}</p>
                </div>
              </div>
            ) : reviewData ? (
              <div className="space-y-6">
                <ScoreCard score={reviewData.score} complexity={reviewData.complexity} />
                <ReviewCard reviewData={reviewData} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow text-gray-500">
                <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-lg font-medium">Paste your code and hit Review</p>
                <p className="text-sm text-gray-600 mt-1">Supports C++, C, Java, and Python</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
