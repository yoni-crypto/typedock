'use client';

interface JsonUtilitiesProps {
  onPrettify: () => void;
  onMinify: () => void;
  onSort: () => void;
  onRemoveNulls: () => void;
}

export function JsonUtilities({ onPrettify, onMinify, onSort, onRemoveNulls }: JsonUtilitiesProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onPrettify}
        className="text-xs px-2 py-1 rounded text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        title="Prettify JSON"
      >
        Format
      </button>
      <button
        onClick={onMinify}
        className="text-xs px-2 py-1 rounded text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        title="Minify JSON"
      >
        Minify
      </button>
      <button
        onClick={onSort}
        className="text-xs px-2 py-1 rounded text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        title="Sort keys alphabetically"
      >
        Sort
      </button>
      <button
        onClick={onRemoveNulls}
        className="text-xs px-2 py-1 rounded text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        title="Remove null values"
      >
        Clean
      </button>
    </div>
  );
}
