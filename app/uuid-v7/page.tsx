'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

function generateUuidV7(): string {
  const timestamp = Date.now();
  const timestampHex = Math.floor(timestamp).toString(16).padStart(12, '0');
  
  const randomPart = new Uint8Array(10);
  crypto.getRandomValues(randomPart);
  
  randomPart[0] = (randomPart[0] & 0x0f) | 0x70;
  randomPart[2] = (randomPart[2] & 0x3f) | 0x80;
  
  const randomHex = Array.from(randomPart).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `${timestampHex.slice(0, 8)}-${timestampHex.slice(8, 12)}-${randomHex.slice(0, 4)}-${randomHex.slice(4, 8)}-${randomHex.slice(8)}`;
}

function generateUuidV4(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

function generateUuidV1(): string {
  const timestamp = Date.now();
  const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0');
  const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0');
  const timeHi = ((timestamp >> 48) & 0x0fff).toString(16).padStart(4, '0');
  
  const clockSeq = crypto.getRandomValues(new Uint8Array(2));
  const clockHi = ((clockSeq[0] & 0x3f) | 0x80).toString(16).padStart(2, '0');
  const clockLo = clockSeq[1].toString(16).padStart(2, '0');
  
  const node = Array.from(crypto.getRandomValues(new Uint8Array(6))).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `${timeLow}-${timeMid}-1${timeHi.slice(1)}-${clockHi}${clockLo}-${node}`;
}

export default function UuidV7Page() {
  const [count, setCount] = useState(10);
  const [uuids, setUuids] = useState<string[]>([]);
  const [version, setVersion] = useState<'v1' | 'v4' | 'v7'>('v7');
  const [autoGenerate, setAutoGenerate] = useState(false);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => {
      if (version === 'v7') return generateUuidV7();
      if (version === 'v4') return generateUuidV4();
      return generateUuidV1();
    });
    setUuids(newUuids);
  };

  useEffect(() => {
    generate();
  }, []);

  useEffect(() => {
    if (autoGenerate) {
      const interval = setInterval(generate, 1000);
      return () => clearInterval(interval);
    }
  }, [autoGenerate, count, version]);

  const versions = [
    { value: 'v7', label: 'UUID v7', description: 'Time-ordered, sortable' },
    { value: 'v4', label: 'UUID v4', description: 'Random, most common' },
    { value: 'v1', label: 'UUID v1', description: 'Time-based, deprecated' },
  ];

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Settings</span>
          </div>
          <div className="flex-1 p-4 overflow-auto space-y-6">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                UUID Version
              </label>
              <div className="space-y-2">
                {versions.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setVersion(v.value as 'v1' | 'v4' | 'v7')}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      version === v.value
                        ? 'bg-stone-800 dark:bg-stone-200 border-stone-800 dark:border-stone-200'
                        : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    <div className={`text-sm font-medium ${version === v.value ? 'text-white dark:text-stone-900' : 'text-stone-900 dark:text-stone-100'}`}>
                      {v.label}
                    </div>
                    <div className={`text-xs ${version === v.value ? 'text-stone-300 dark:text-stone-600' : 'text-stone-500'}`}>
                      {v.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Number of UUIDs: {count}
              </label>
              <input
                type="range"
                min={1}
                max={500}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>1</span>
                <span>500</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auto"
                checked={autoGenerate}
                onChange={(e) => setAutoGenerate(e.target.checked)}
                className="rounded border-stone-300"
              />
              <label htmlFor="auto" className="text-sm text-stone-700 dark:text-stone-300">
                Auto-generate
              </label>
            </div>

            <button
              onClick={generate}
              className="w-full text-sm px-3 py-2 rounded-lg bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
            >
              Generate
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Generated UUIDs ({uuids.length})</span>
            {uuids.length > 0 && (
              <CopyButton text={uuids.join('\n')} />
            )}
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-2">
              {uuids.map((uuid, i) => (
                <div
                  key={i}
                  className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg font-mono text-sm text-stone-800 dark:text-stone-200"
                >
                  {uuid}
                </div>
              ))}
            </div>
          </div>
        </>
      }
    />
  );
}
