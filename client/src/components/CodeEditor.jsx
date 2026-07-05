import Editor from '@monaco-editor/react';

const LANGUAGE_MAP = {
  'C++': 'cpp',
  'C': 'cpp',
  'Java': 'java',
  'Python': 'python',
};

const CodeEditor = ({ language, code, onChange }) => {
  return (
    <div className="border border-[#3e3e42] rounded-lg overflow-hidden shadow-lg h-[450px] md:h-[480px]">
      <Editor
        height="100%"
        theme="vs-dark"
        language={LANGUAGE_MAP[language] || 'plaintext'}
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          lineNumbersMinChars: 3,
          renderLineHighlight: 'gutter',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
      />
    </div>
  );
};

export default CodeEditor;
