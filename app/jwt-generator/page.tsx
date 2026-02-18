'use client';

import { useState, useMemo } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

const DEFAULT_HEADER = JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2);
const DEFAULT_PAYLOAD = JSON.stringify({
  sub: '1234567890',
  name: 'John Doe',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600,
}, null, 2);

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createJwt(header: string, payload: string, secret: string): string {
  try {
    const headerEncoded = base64UrlEncode(JSON.stringify(JSON.parse(header)));
    const payloadEncoded = base64UrlEncode(JSON.stringify(JSON.parse(payload)));
    const signature = base64UrlEncode(btoa(secret || 'secret'));
    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  } catch {
    return 'Invalid JSON';
  }
}

export default function JwtGeneratorPage() {
  const [header, setHeader] = useState(DEFAULT_HEADER);
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);
  const [secret, setSecret] = useState('your-secret-key');

  const jwt = useMemo(() => createJwt(header, payload, secret), [header, payload, secret]);

  const parts = jwt.split('.');
  const isValid = parts.length === 3;

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">JWT Builder</span>
          </div>
          <div className="flex-1 p-4 overflow-auto space-y-6">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Secret Key
              </label>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Your secret key"
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100"
              />
              <p className="mt-1 text-xs text-stone-500">
                Note: For real JWTs, use proper signing libraries. This creates demo tokens.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Header (JSON)
              </label>
              <textarea
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Payload (JSON)
              </label>
              <textarea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    const p = JSON.parse(payload);
                    p.iat = Math.floor(Date.now() / 1000);
                    setPayload(JSON.stringify(p, null, 2));
                  }}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                >
                  Update iat
                </button>
                <button
                  onClick={() => {
                    const p = JSON.parse(payload);
                    p.exp = Math.floor(Date.now() / 1000) + 3600;
                    setPayload(JSON.stringify(p, null, 2));
                  }}
                  className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                >
                  Set 1hr exp
                </button>
              </div>
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Generated JWT</span>
            {isValid && <CopyButton text={jwt} />}
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-stone-500">TOKEN</span>
                  {!isValid && (
                    <span className="text-xs text-red-500">Invalid JSON</span>
                  )}
                </div>
                <div className="text-sm font-mono text-stone-800 dark:text-stone-200 break-all">
                  {jwt}
                </div>
              </div>

              {isValid && (
                <>
                  <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
                    <div className="text-xs font-medium text-stone-500 mb-2">HEADER</div>
                    <pre className="text-xs font-mono text-stone-700 dark:text-stone-300 overflow-auto">
                      {JSON.stringify(JSON.parse(header), null, 2)}
                    </pre>
                  </div>

                  <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
                    <div className="text-xs font-medium text-stone-500 mb-2">PAYLOAD</div>
                    <pre className="text-xs font-mono text-stone-700 dark:text-stone-300 overflow-auto">
                      {JSON.stringify(JSON.parse(payload), null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      }
    />
  );
}
