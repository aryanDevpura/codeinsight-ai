const SectionHeader = ({ color, children }) => (
  <h4 className={`text-sm font-semibold uppercase tracking-wider ${color} mb-3 flex items-center gap-2`}>
    {children}
  </h4>
);

const ReviewCard = ({ reviewData }) => {
  if (!reviewData) return null;

  return (
    <div className="space-y-5">
      {/* Analysis */}
      <div className="bg-[#1e1e1e] border border-[#3e3e42] p-4 rounded-xl">
        <SectionHeader color="text-gray-300">Analysis</SectionHeader>
        <p className="whitespace-pre-wrap text-sm text-gray-400 leading-relaxed">{reviewData.review}</p>
      </div>

      {/* Bugs */}
      {reviewData.bugs && reviewData.bugs.length > 0 && (
        <div className="bg-[#1e1e1e] border border-[#ff375f]/50 p-4 rounded-xl">
          <SectionHeader color="text-[#ff375f]">Bugs Identified ({reviewData.bugs.length})</SectionHeader>
          <ul className="space-y-2">
            {reviewData.bugs.map((bug, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-[#ff375f] mt-0.5">•</span>
                <span>{bug}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {reviewData.suggestions && reviewData.suggestions.length > 0 && (
        <div className="bg-[#1e1e1e] border border-[#ffc01e]/50 p-4 rounded-xl">
          <SectionHeader color="text-[#ffc01e]">Suggestions ({reviewData.suggestions.length})</SectionHeader>
          <ul className="space-y-2">
            {reviewData.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-[#ffc01e] mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Refactored Code */}
      {reviewData.refactoredCode && (
        <div className="bg-[#1e1e1e] border border-[#00b8a3]/50 p-4 rounded-xl">
          <SectionHeader color="text-[#00b8a3]">Refactored Code</SectionHeader>
          <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
            <code>{reviewData.refactoredCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
