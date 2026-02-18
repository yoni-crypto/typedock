'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/components/theme/ThemeProvider';

function TextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { theme } = useTheme();
  return (
    <Editor
      height="100%"
      defaultLanguage="text"
      value={value}
      onChange={(val) => onChange(val || '')}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}

const DEFAULT_UA = navigator.userAgent;

function parseUserAgent(ua: string) {
  const result: Record<string, string> = {};
  
  // Browser detection
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    const match = ua.match(/Chrome\/(\d+\.\d+)/);
    result.browser = `Chrome ${match ? match[1] : ''}`;
  } else if (ua.includes('Firefox')) {
    const match = ua.match(/Firefox\/(\d+\.\d+)/);
    result.browser = `Firefox ${match ? match[1] : ''}`;
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    const match = ua.match(/Version\/(\d+\.\d+)/);
    result.browser = `Safari ${match ? match[1] : ''}`;
  } else if (ua.includes('Edg')) {
    const match = ua.match(/Edg\/(\d+\.\d+)/);
    result.browser = `Edge ${match ? match[1] : ''}`;
  } else {
    result.browser = 'Unknown';
  }
  
  // OS detection
  if (ua.includes('Windows')) {
    result.os = 'Windows';
  } else if (ua.includes('Mac OS X') || ua.includes('macOS')) {
    result.os = 'macOS';
  } else if (ua.includes('Linux')) {
    result.os = 'Linux';
  } else if (ua.includes('Android')) {
    result.os = 'Android';
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    result.os = 'iOS';
  } else {
    result.os = 'Unknown';
  }
  
  // Device type
  if (ua.includes('Mobile')) {
    result.device = 'Mobile';
  } else if (ua.includes('Tablet') || ua.includes('iPad')) {
    result.device = 'Tablet';
  } else {
    result.device = 'Desktop';
  }
  
  // Engine
  if (ua.includes('AppleWebKit')) {
    result.engine = 'WebKit';
  } else if (ua.includes('Gecko')) {
    result.engine = 'Gecko';
  } else if (ua.includes('Blink')) {
    result.engine = 'Blink';
  } else {
    result.engine = 'Unknown';
  }
  
  return result;
}

export default function UserAgentParserPage() {
  const [ua, setUa] = useState(DEFAULT_UA);
  const parsed = parseUserAgent(ua);

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">User-Agent String</span>
          </div>
          <div className="flex-1 min-h-0">
            <TextEditor value={ua} onChange={setUa} />
          </div>
          <div className="h-12 px-4 flex items-center justify-center border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <button
              onClick={() => setUa(navigator.userAgent)}
              className="px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Use My Browser
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Parsed Information</span>
          </div>
          <div className="flex-1 min-h-0 overflow-auto p-4">
            <div className="space-y-4">
              {Object.entries(parsed).map(([key, value]) => (
                <div key={key} className="p-4 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg">
                  <div className="text-xs text-stone-500 dark:text-stone-400 uppercase mb-1">{key}</div>
                  <div className="text-lg font-medium text-stone-800 dark:text-stone-200">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      }
    />
  );
}
