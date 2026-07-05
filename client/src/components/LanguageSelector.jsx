const LanguageSelector = ({ selected, onSelect }) => {
  const languages = ['C++', 'Java', 'Python', 'C'];

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Language</label>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="bg-[#282828] text-gray-200 border border-[#3e3e42] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ffa116] transition-colors cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
