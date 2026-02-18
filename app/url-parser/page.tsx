'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

const DEFAULT_URL = 'https://example.com:8080/path/to/page?param1=value1&param2=value2#section';

interface UrlParts {
  href: string;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  username: string;
  password: string;
  origin: string;
}

function parseUrl(urlString: string): UrlParts | null {
  try {
    const url = new URL(urlString);
    return {
      href: url.href,
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      username: url.username,
      password: url.password,
      origin: url.origin,
    };
  } catch {
    return null;
  }
}

function buildUrl(parts: Partial<UrlParts>): string {
  const url = new URL(parts.protocol || 'https:', parts.hostname || 'example.com');
  if (parts.port) url.port = parts.port;
  if (parts.pathname) url.pathname = parts.pathname;
  if (parts.search) url.search = parts.search;
  if (parts.hash) url.hash = parts.hash;
  if (parts.username) url.username = parts.username;
  if (parts.password) url.password = parts.password;
  return url.toString();
}

interface PartField {
  key: keyof UrlParts;
  label: string;
  example: string;
}

const partFields: PartField[] = [
  { key: 'protocol', label: 'Protocol', example: 'https:' },
  { key: 'hostname', label: 'Hostname', example: 'example.com' },
  { key: 'port', label: 'Port', example: '8080' },
  { key: 'pathname', label: 'Path', example: '/path/to/page' },
  { key: 'search', label: 'Query String', example: '?param=value' },
  { key: 'hash', label: 'Hash', example: '#section' },
  { key: 'username', label: 'Username', example: 'user' },
  { key: 'password', label: 'Password', example: 'pass123' },
];

export default function UrlParserPage() {
  const [input, setInput] = useState(DEFAULT_URL);
  const [parsed, setParsed] = useState<UrlParts | null>(null);
  const [manualParts, setManualParts] = useState<Partial<UrlParts>>({});
  const [buildOutput, setBuildOutput] = useState('');

  useEffect(() => {
    const result = parseUrl(input);
    setParsed(result);
    if (result) {
      setManualParts({
        protocol: result.protocol,
        hostname: result.hostname,
        port: result.port,
        pathname: result.pathname,
        search: result.search,
        hash: result.hash,
        username: result.username,
        password: result.password,
      });
      setBuildOutput(result.href);
    }
  }, [input]);

  const handlePartChange = (key: keyof UrlParts, value: string) => {
    const updated = { ...manualParts, [key]: value };
    setManualParts(updated);
    setBuildOutput(buildUrl(updated));
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input URL</span>
            <button
              onClick={() => setInput('')}
              className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Enter URL
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="https://example.com/path?query=value"
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100"
                />
              </div>

              {parsed && (
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                  <h3 className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-3">Parsed URL Parts</h3>
                  <div className="space-y-3">
                    {partFields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs text-stone-500 dark:text-stone-400 mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          value={parsed[field.key] || ''}
                          readOnly
                          className="w-full px-2 py-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded text-xs font-mono text-stone-700 dark:text-stone-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Build URL</span>
            {buildOutput && <CopyButton text={buildOutput} />}
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Built URL
                </label>
                <input
                  type="text"
                  value={buildOutput}
                  onChange={(e) => setBuildOutput(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <h3 className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-3">URL Components</h3>
                <div className="space-y-3">
                  {partFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs text-stone-500 dark:text-stone-400 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={manualParts[field.key] || ''}
                        onChange={(e) => handlePartChange(field.key, e.target.value)}
                        placeholder={field.example}
                        className="w-full px-2 py-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-xs font-mono text-stone-700 dark:text-stone-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
