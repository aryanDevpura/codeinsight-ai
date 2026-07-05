const ScoreCard = ({ score, complexity }) => {
  const getScoreColor = (s) => {
    if (s >= 80) return 'text-[#00b8a3]';
    if (s >= 60) return 'text-[#ffc01e]';
    return 'text-[#ff375f]';
  };

  const getScoreBg = (s) => {
    if (s >= 80) return 'bg-[#00b8a3]/10';
    if (s >= 60) return 'bg-[#ffc01e]/10';
    return 'bg-[#ff375f]/10';
  };

  return (
    <div className={`${getScoreBg(score)} border border-[#3e3e42] p-5 rounded-xl`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-300 uppercase tracking-wider">Quality Score</h3>
        <span className={`text-3xl font-extrabold ${getScoreColor(score)}`}>
          {score}<span className="text-lg text-gray-500">/100</span>
        </span>
      </div>

      {complexity && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1e1e1e] border border-[#3e3e42] p-3 rounded-lg">
            <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Time</span>
            <span className="font-mono text-sm text-[#ffa116]">{complexity.time || 'N/A'}</span>
          </div>
          <div className="bg-[#1e1e1e] border border-[#3e3e42] p-3 rounded-lg">
            <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Space</span>
            <span className="font-mono text-sm text-[#ffa116]">{complexity.space || 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;
