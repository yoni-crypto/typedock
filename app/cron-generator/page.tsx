'use client';

import { useState, useEffect, useMemo } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';
import { CronParts, cronPresets, cronDescriptions, buildCronString, getNextRuns, describeCron } from '@/lib/utils/cronGenerator';

const defaultParts: CronParts = {
  minute: '*',
  hour: '*',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
};

export default function CronGeneratorPage() {
  const [parts, setParts] = useState<CronParts>(defaultParts);
  const [customCron, setCustomCron] = useState('* * * * *');

  const cronString = useMemo(() => buildCronString(parts), [parts]);
  const description = useMemo(() => describeCron(cronString), [cronString]);
  const nextRuns = useMemo(() => getNextRuns(cronString, 5), [cronString]);

  useEffect(() => {
    setCustomCron(cronString);
  }, [cronString]);

  const handlePartChange = (key: keyof CronParts, value: string) => {
    setParts(prev => ({ ...prev, [key]: value || '*' }));
  };

  const handlePreset = (value: string) => {
    setCustomCron(value);
    const parsed = value.split(' ');
    if (parsed.length === 5) {
      setParts({
        minute: parsed[0],
        hour: parsed[1],
        dayOfMonth: parsed[2],
        month: parsed[3],
        dayOfWeek: parsed[4],
      });
    }
  };

  const fields: { key: keyof CronParts; label: string; placeholder: string }[] = [
    { key: 'minute', label: 'Minute', placeholder: '0-59 or *' },
    { key: 'hour', label: 'Hour', placeholder: '0-23 or *' },
    { key: 'dayOfMonth', label: 'Day', placeholder: '1-31 or *' },
    { key: 'month', label: 'Month', placeholder: '1-12 or *' },
    { key: 'dayOfWeek', label: 'Weekday', placeholder: '0-6 or *' },
  ];

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Cron Builder</span>
          </div>
          <div className="flex-1 p-4 overflow-auto space-y-6">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Cron Expression
              </label>
              <input
                type="text"
                value={customCron}
                onChange={(e) => {
                  setCustomCron(e.target.value);
                  handlePreset(e.target.value);
                }}
                placeholder="* * * * *"
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-sm font-mono text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Presets
              </label>
              <div className="space-y-1">
                {cronPresets.slice(0, 6).map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => handlePreset(preset.value)}
                    className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                      customCron === preset.value
                        ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    <span className="font-mono">{preset.value}</span>
                    <span className="ml-2 text-stone-500 dark:text-stone-400">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Individual Fields
              </label>
              <div className="grid grid-cols-5 gap-2">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs text-stone-500 dark:text-stone-400 mb-1 text-center">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={parts[field.key]}
                      onChange={(e) => handlePartChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-2 py-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-xs font-mono text-center text-stone-900 dark:text-stone-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Result</span>
            <CopyButton text={cronString} />
          </div>
          <div className="flex-1 p-4 overflow-auto space-y-6">
            <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-center">
              <div className="text-3xl font-mono font-bold text-stone-900 dark:text-stone-100 mb-2">
                {cronString}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">
                {description}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-3">Next 5 Runs</h3>
              <div className="space-y-2">
                {nextRuns.map((date, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded flex justify-between items-center">
                    <span className="text-sm font-mono text-stone-800 dark:text-stone-200">
                      {date.toLocaleDateString()}
                    </span>
                    <span className="text-sm text-stone-600 dark:text-stone-400">
                      {date.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
