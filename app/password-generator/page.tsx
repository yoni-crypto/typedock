'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { generatePassword, calculateStrength, defaultOptions, PasswordOptions } from '@/lib/utils/passwordGenerator';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>(defaultOptions);
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    setPassword(generatePassword(options));
  }, [options]);

  const strength = calculateStrength(password);

  const strengthColors: Record<string, string> = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };

  const regenerate = () => {
    setPassword(generatePassword(options));
  };

  const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Options</span>
          </div>
          <div className="flex-1 p-4 overflow-auto space-y-6">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Length: {options.length}
              </label>
              <input
                type="range"
                min={4}
                max={64}
                value={options.length}
                onChange={(e) => updateOption('length', parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-stone-500 mt-1">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={(e) => updateOption('uppercase', e.target.checked)}
                  className="rounded border-stone-300"
                />
                <span className="text-sm text-stone-700 dark:text-stone-300">Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => updateOption('lowercase', e.target.checked)}
                  className="rounded border-stone-300"
                />
                <span className="text-sm text-stone-700 dark:text-stone-300">Lowercase (a-z)</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={(e) => updateOption('numbers', e.target.checked)}
                  className="rounded border-stone-300"
                />
                <span className="text-sm text-stone-700 dark:text-stone-300">Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={(e) => updateOption('symbols', e.target.checked)}
                  className="rounded border-stone-300"
                />
                <span className="text-sm text-stone-700 dark:text-stone-300">Symbols (!@#$%...)</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.excludeAmbiguous}
                  onChange={(e) => updateOption('excludeAmbiguous', e.target.checked)}
                  className="rounded border-stone-300"
                />
                <span className="text-sm text-stone-700 dark:text-stone-300">Exclude ambiguous (0O1lI)</span>
              </label>
            </div>

            <button
              onClick={regenerate}
              className="w-full text-sm px-3 py-2 rounded-lg bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Generated Password</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              {password && <CopyButton text={password} />}
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-center">
                  <div className="mb-4">
                    <div className={`text-2xl md:text-3xl font-mono font-bold text-stone-900 dark:text-stone-100 break-all ${!showPassword && 'filter blur-sm select-none'}`}>
                      {password}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded ${
                            i <= strength.score ? strengthColors[strength.color] : 'bg-stone-200 dark:bg-stone-700'
                          }`}
                        />
                      ))}
                    </div>
                    <div className={`text-sm font-medium ${
                      strength.color === 'red' ? 'text-red-500' :
                      strength.color === 'orange' ? 'text-orange-500' :
                      strength.color === 'yellow' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {strength.label}
                    </div>
                  </div>

                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    {password.length} characters
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
