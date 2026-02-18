'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { hashPassword, verifyPassword, saltRoundsOptions } from '@/lib/utils/bcrypt';

export default function BcryptPage() {
  const [password, setPassword] = useState('password123');
  const [hash, setHash] = useState('');
  const [rounds, setRounds] = useState(10);
  const [outputHash, setOutputHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<{ match: boolean; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleHash = async () => {
    if (!password) return;
    setLoading(true);
    try {
      const result = await hashPassword(password, rounds);
      setOutputHash(result);
      setVerifyResult(null);
    } catch (error) {
      setOutputHash('');
      setVerifyResult({ match: false, error: 'Failed to hash password' });
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!password || !hash) return;
    setLoading(true);
    try {
      const match = await verifyPassword(password, hash);
      setVerifyResult({ match });
      setOutputHash('');
    } catch (error) {
      setVerifyResult({ match: false, error: 'Invalid hash format' });
    }
    setLoading(false);
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Input</span>
            <button
              onClick={() => {
                setPassword('');
                setHash('');
                setOutputHash('');
                setVerifyResult(null);
              }}
              className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              Clear
            </button>
          </div>
          <div className="flex-1 p-4 overflow-auto space-y-6">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Salt Rounds
              </label>
              <select
                value={rounds}
                onChange={(e) => setRounds(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm text-stone-900 dark:text-stone-100"
              >
                {saltRoundsOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} - {opt.description}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleHash}
              disabled={loading || !password}
              className="w-full text-sm px-3 py-2 rounded-lg bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Hashing...' : 'Generate Hash'}
            </button>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <h3 className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-3">Verify Hash</h3>
              
              <div className="mb-3">
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Hash to Verify
                </label>
                <input
                  type="text"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  placeholder="$2a$10$..."
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs font-mono text-stone-900 dark:text-stone-100"
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={loading || !password || !hash}
                className="w-full text-sm px-3 py-2 rounded-lg bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Verifying...' : 'Verify Password'}
              </button>
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Output</span>
            {(outputHash || verifyResult) && (
              outputHash ? <CopyButton text={outputHash} /> : null
            )}
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {outputHash && (
              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-stone-600 dark:text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Hash Generated</span>
                  </div>
                  <div className="text-xs font-mono text-stone-800 dark:text-stone-200 break-all bg-stone-50 dark:bg-stone-950 p-3 rounded">
                    {outputHash}
                  </div>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Copy this hash to use in your application. The $2a$ prefix indicates bcrypt algorithm.
                </p>
              </div>
            )}

            {verifyResult && (
              <div className={`p-4 rounded-lg border ${
                verifyResult.match 
                  ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800' 
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
              }`}>
                <div className="flex items-center gap-2">
                  {verifyResult.match ? (
                    <>
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">Password Matches</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-sm font-medium text-red-700 dark:text-red-400">
                        {verifyResult.error || 'Password Does Not Match'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {!outputHash && !verifyResult && (
              <div className="text-sm text-stone-500 dark:text-stone-400 text-center py-8">
                Enter a password and click Generate Hash or Verify
              </div>
            )}
          </div>
        </>
      }
    />
  );
}
