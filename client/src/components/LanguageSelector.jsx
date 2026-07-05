import React from 'react';

const LanguageSelector = ({ selected, onSelect }) => {
  const languages = ['C++', 'Java', 'Python', 'C'];

  return (
    <div className="flex items-center gap-4 mb-4">
      <label className="text-gray-300 font-medium">Select Language:</label>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="bg-gray-800 text-white border border-gray-600 rounded-md p-2 outline-none focus:border-blue-500"
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
