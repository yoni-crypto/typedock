'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
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
        tabSize: 2,
      }}
    />
  );
}

const DEFAULT_CURL = `curl -X POST "https://api.example.com/users" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'`;

type OutputFormat = 'fetch' | 'axios' | 'node-http';

function parseCurl(curlCommand: string): {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
} {
  const result = {
    method: 'GET',
    url: '',
    headers: {} as Record<string, string>,
    body: null as string | null,
  };

  // Remove newlines and extra spaces
  let cmd = curlCommand.replace(/\\\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extract URL
  const urlMatch = cmd.match(/curl\s+(?:-[A-Za-z]+\s+)*["']?([^\s"'-]+)["']?/);
  if (urlMatch) {
    result.url = urlMatch[1].replace(/^["']|["']$/g, '');
  }

  // Extract method
  const methodMatch = cmd.match(/-X\s+([A-Z]+)/);
  if (methodMatch) {
    result.method = methodMatch[1];
  } else if (cmd.includes(' -d ') || cmd.includes(' --data ')) {
    result.method = 'POST';
  }

  // Extract headers
  const headerMatches = cmd.matchAll(/-H\s+["']([^"']+)["']/g);
  for (const match of headerMatches) {
    const [key, ...valueParts] = match[1].split(':');
    if (key) {
      result.headers[key.trim()] = valueParts.join(':').trim();
    }
  }

  // Extract body
  const bodyMatch = cmd.match(/-d\s+["']([\s\S]+?)["']\s*$/) || cmd.match(/--data\s+["']([\s\S]+?)["']\s*$/);
  if (bodyMatch) {
    result.body = bodyMatch[1].replace(/\\n/g, '\n');
  }

  return result;
}

function generateFetch(parsed: ReturnType<typeof parseCurl>): string {
  const headers = Object.keys(parsed.headers).length > 0 
    ? `\n  headers: {\n${Object.entries(parsed.headers).map(([k, v]) => `    "${k}": "${v}"`).join(',\n')}\n  },`
    : '';
  
  const body = parsed.body 
    ? `\n  body: JSON.stringify(${parsed.body}),` 
    : '';

  return `fetch("${parsed.url}", {
  method: "${parsed.method}",${headers}${body}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
}

function generateAxios(parsed: ReturnType<typeof parseCurl>): string {
  const headers = Object.keys(parsed.headers).length > 0 
    ? `,\n  headers: {\n${Object.entries(parsed.headers).map(([k, v]) => `    "${k}": "${v}"`).join(',\n')}\n  }`
    : '';
  
  const data = parsed.body 
    ? `,\n  data: ${parsed.body}` 
    : '';

  return `axios({
  method: "${parsed.method.toLowerCase()}",
  url: "${parsed.url}"${headers}${data}
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`;
}

function generateNodeHttp(parsed: ReturnType<typeof parseCurl>): string {
  const hasBody = parsed.body !== null;
  
  return `const https = require('https');

const options = {
  hostname: new URL("${parsed.url}").hostname,
  path: new URL("${parsed.url}").pathname,
  method: "${parsed.method}",
  headers: {${Object.entries(parsed.headers).map(([k, v]) => `\n    "${k}": "${v}"`).join(',')}${hasBody ? ',' : ''}${hasBody ? `\n    "Content-Length": Buffer.byteLength(JSON.stringify(${parsed.body}))` : ''}
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
});

req.on('error', (error) => console.error('Error:', error));
${hasBody ? `req.write(JSON.stringify(${parsed.body}));\n` : ''}req.end();`;
}

export default function CurlToFetchPage() {
  const [curl, setCurl] = useState(DEFAULT_CURL);
  const [format, setFormat] = useState<OutputFormat>('fetch');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      const parsed = parseCurl(curl);
      
      if (!parsed.url) {
        setError('Could not parse URL from cURL command');
        setResult('');
        return;
      }

      let output = '';
      switch (format) {
        case 'fetch':
          output = generateFetch(parsed);
          break;
        case 'axios':
          output = generateAxios(parsed);
          break;
        case 'node-http':
          output = generateNodeHttp(parsed);
          break;
      }

      setError('');
      setResult(output);
    } catch (e) {
      setError('Error parsing cURL command');
      setResult('');
    }
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">cURL Command</span>
          </div>
          <div className="flex-1 min-h-0">
            <TextEditor value={curl} onChange={setCurl} />
          </div>
          <div className="h-auto min-h-[100px] px-4 py-3 flex flex-col gap-2 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase">
              Output Format
            </label>
            <div className="flex gap-2">
              {(['fetch', 'axios', 'node-http'] as OutputFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    format === f
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {f === 'node-http' ? 'Node.js' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={handleConvert}
              className="mt-1 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
            >
              Convert
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {format === 'node-http' ? 'Node.js HTTP' : format.charAt(0).toUpperCase() + format.slice(1)} Code
            </span>
            {result && <CopyButton text={result} />}
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {error ? (
              <div className="p-6">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            ) : result ? (
              <div className="p-4">
                <pre className="p-3 bg-stone-900 dark:bg-stone-950 rounded-lg text-sm font-mono text-green-400 overflow-x-auto">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-stone-500 dark:text-stone-400 text-sm">
                Click &quot;Convert&quot; to generate code
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
