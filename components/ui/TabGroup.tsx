'use client';

interface TabGroupProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function TabGroup({ tabs, activeTab, onChange }: TabGroupProps) {
  return (
    <div className="flex gap-0.5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-2 py-0.5 text-xs rounded transition-colors ${
            activeTab === tab
              ? 'bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-100'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
