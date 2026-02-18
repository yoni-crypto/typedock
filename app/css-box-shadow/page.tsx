'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

const PRESETS = [
  { name: 'Subtle', value: '0 2px 4px rgba(0,0,0,0.1)', offsetX: 0, offsetY: 2, blur: 4, spread: 0 },
  { name: 'Medium', value: '0 4px 6px rgba(0,0,0,0.1)', offsetX: 0, offsetY: 4, blur: 6, spread: 0 },
  { name: 'Large', value: '0 10px 15px rgba(0,0,0,0.1)', offsetX: 0, offsetY: 10, blur: 15, spread: 0 },
  { name: 'Extra Large', value: '0 20px 25px rgba(0,0,0,0.15)', offsetX: 0, offsetY: 20, blur: 25, spread: 0 },
  { name: 'Inner', value: 'inset 0 2px 4px rgba(0,0,0,0.1)', offsetX: 0, offsetY: 2, blur: 4, spread: 0 },
  { name: 'Glow', value: '0 0 20px rgba(66, 153, 225, 0.5)', offsetX: 0, offsetY: 0, blur: 20, spread: 0 },
  { name: 'Double', value: '0 4px 6px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1)', offsetX: 0, offsetY: 4, blur: 6, spread: 0 },
  { name: 'Material 1', value: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', offsetX: 0, offsetY: 1, blur: 3, spread: 0 },
  { name: 'Material 2', value: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', offsetX: 0, offsetY: 3, blur: 6, spread: 0 },
  { name: 'Material 3', value: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', offsetX: 0, offsetY: 10, blur: 20, spread: 0 },
  { name: 'Material 4', value: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)', offsetX: 0, offsetY: 14, blur: 28, spread: 0 },
  { name: 'Material 5', value: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)', offsetX: 0, offsetY: 19, blur: 38, spread: 0 },
  { name: 'Neumorphic', value: '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff', offsetX: 20, offsetY: 20, blur: 60, spread: 0 },
  { name: 'Neumorphic Inset', value: 'inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff', offsetX: 5, offsetY: 5, blur: 10, spread: 0 },
  { name: 'Card', value: '0 2px 8px rgba(0,0,0,0.08)', offsetX: 0, offsetY: 2, blur: 8, spread: 0 },
  { name: 'Card Hover', value: '0 8px 24px rgba(0,0,0,0.12)', offsetX: 0, offsetY: 8, blur: 24, spread: 0 },
  { name: 'Elevated', value: '0 4px 12px rgba(0,0,0,0.15)', offsetX: 0, offsetY: 4, blur: 12, spread: 0 },
  { name: 'Floating', value: '0 12px 28px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.12)', offsetX: 0, offsetY: 12, blur: 28, spread: 0 },
  { name: 'Soft', value: '0 8px 32px rgba(0,0,0,0.08)', offsetX: 0, offsetY: 8, blur: 32, spread: 0 },
  { name: 'Hard', value: '4px 4px 0px rgba(0,0,0,1)', offsetX: 4, offsetY: 4, blur: 0, spread: 0 },
  { name: 'Rainbow Glow', value: '0 0 30px rgba(255,0,0,0.3), 0 0 60px rgba(0,255,0,0.3), 0 0 90px rgba(0,0,255,0.3)', offsetX: 0, offsetY: 0, blur: 30, spread: 0 },
  { name: 'Red Glow', value: '0 0 20px rgba(239, 68, 68, 0.6)', offsetX: 0, offsetY: 0, blur: 20, spread: 0 },
  { name: 'Green Glow', value: '0 0 20px rgba(34, 197, 94, 0.6)', offsetX: 0, offsetY: 0, blur: 20, spread: 0 },
  { name: 'Blue Glow', value: '0 0 20px rgba(59, 130, 246, 0.6)', offsetX: 0, offsetY: 0, blur: 20, spread: 0 },
  { name: 'Purple Glow', value: '0 0 20px rgba(168, 85, 247, 0.6)', offsetX: 0, offsetY: 0, blur: 20, spread: 0 },
  { name: 'Yellow Glow', value: '0 0 20px rgba(234, 179, 8, 0.6)', offsetX: 0, offsetY: 0, blur: 20, spread: 0 },
  { name: 'Pink Glow', value: '0 0 20px rgba(236, 72, 153, 0.6)', offsetX: 0, offsetY: 0, blur: 20, spread: 0 },
  { name: 'Inner Dark', value: 'inset 0 2px 8px rgba(0,0,0,0.3)', offsetX: 0, offsetY: 2, blur: 8, spread: 0 },
  { name: 'Inner Light', value: 'inset 0 2px 8px rgba(255,255,255,0.3)', offsetX: 0, offsetY: 2, blur: 8, spread: 0 },
  { name: 'Top Shadow', value: '0 -4px 6px rgba(0,0,0,0.1)', offsetX: 0, offsetY: -4, blur: 6, spread: 0 },
  { name: 'Bottom Shadow', value: '0 4px 6px rgba(0,0,0,0.1)', offsetX: 0, offsetY: 4, blur: 6, spread: 0 },
  { name: 'Left Shadow', value: '-4px 0 6px rgba(0,0,0,0.1)', offsetX: -4, offsetY: 0, blur: 6, spread: 0 },
  { name: 'Right Shadow', value: '4px 0 6px rgba(0,0,0,0.1)', offsetX: 4, offsetY: 0, blur: 6, spread: 0 },
];

export default function CssBoxShadowPage() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(4);
  const [blur, setBlur] = useState(8);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.2);
  const [inset, setInset] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const shadowValue = activePreset || `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  const cssValue = `box-shadow: ${shadowValue};`;

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Shadow Settings</span>
          </div>
          <div className="flex-1 min-h-0 overflow-auto p-4 space-y-4">
            {/* Presets */}
            <div>
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase block mb-2">
                Presets
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setOffsetX(preset.offsetX);
                      setOffsetY(preset.offsetY);
                      setBlur(preset.blur);
                      setSpread(preset.spread);
                      setInset(preset.value.includes('inset'));
                      // Use full preset value for multi-shadow presets
                      setActivePreset(preset.value.includes(',') ? preset.value : null);
                    }}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      activePreset === preset.value
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-stone-500 dark:text-stone-400">Offset X</label>
                  <span className="text-xs text-stone-600 dark:text-stone-400">{offsetX}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={offsetX}
                  onChange={(e) => { setOffsetX(parseInt(e.target.value)); setActivePreset(null); }}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-stone-500 dark:text-stone-400">Offset Y</label>
                  <span className="text-xs text-stone-600 dark:text-stone-400">{offsetY}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={offsetY}
                  onChange={(e) => { setOffsetY(parseInt(e.target.value)); setActivePreset(null); }}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-stone-500 dark:text-stone-400">Blur</label>
                  <span className="text-xs text-stone-600 dark:text-stone-400">{blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={blur}
                  onChange={(e) => { setBlur(parseInt(e.target.value)); setActivePreset(null); }}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-stone-500 dark:text-stone-400">Spread</label>
                  <span className="text-xs text-stone-600 dark:text-stone-400">{spread}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={spread}
                  onChange={(e) => { setSpread(parseInt(e.target.value)); setActivePreset(null); }}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-stone-500 dark:text-stone-400">Opacity</label>
                  <span className="text-xs text-stone-600 dark:text-stone-400">{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity * 100}
                  onChange={(e) => { setOpacity(parseInt(e.target.value) / 100); setActivePreset(null); }}
                  className="w-full"
                />
              </div>

              <div className="flex gap-4">
                <div>
                  <label className="text-xs text-stone-500 dark:text-stone-400 block mb-1">Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => { setColor(e.target.value); setActivePreset(null); }}
                    className="w-16 h-8 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
                    <input
                      type="checkbox"
                      checked={inset}
                      onChange={(e) => { setInset(e.target.checked); setActivePreset(null); }}
                      className="rounded"
                    />
                    Inset
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Preview</span>
            <CopyButton text={cssValue} />
          </div>
          <div className="flex-1 min-h-0 flex flex-col">
            {/* Preview Box */}
            <div className="flex-1 flex items-center justify-center bg-stone-100 dark:bg-stone-900">
              <div
                className="w-48 h-48 bg-white dark:bg-stone-800 rounded-lg"
                style={{ boxShadow: shadowValue }}
              />
            </div>
            
            {/* CSS Output */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
              <pre className="p-3 bg-stone-900 dark:bg-stone-950 rounded-lg text-sm font-mono text-green-400 overflow-x-auto">
                {cssValue}
              </pre>
            </div>
          </div>
        </>
      }
    />
  );
}
