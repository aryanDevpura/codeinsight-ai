import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, code, onChange }) => {
  const getMonacoLanguage = (lang) => {
    switch (lang) {
      case 'C++':
      case 'C':
        return 'cpp';
      case 'Java':
        return 'java';
      case 'Python':
        return 'python';
      default:
        return 'javascript';
    }
  };

  return (
    <div className="border border-gray-700 rounded-md overflow-hidden shadow-lg h-[500px]">
      <Editor
        height="100%"
        theme="vs-dark"
        language={getMonacoLanguage(language)}
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          padding: { top: 16 }
        }}
      />
    </div>
  );
};

export default CodeEditor;
