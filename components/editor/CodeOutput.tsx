'use client';

import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface CodeOutputProps {
  value: string;
  language: 'typescript' | 'javascript';
}

export function CodeOutput({ value, language }: CodeOutputProps) {
  const { theme } = useTheme();

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={value}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
}
