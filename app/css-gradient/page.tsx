'use client';

import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

type GradientType = 'linear' | 'radial' | 'conic' | 'repeating-linear' | 'repeating-radial' | 'repeating-conic' | 'linear-to-right' | 'linear-to-left' | 'linear-to-top' | 'linear-to-bottom' | 'radial-ellipse';

interface ColorStop {
  color: string;
  position: number;
}

const PRESETS = [
  { name: 'Sunset', colors: ['#FF6B6B', '#FFE66D'] },
  { name: 'Ocean', colors: ['#4ECDC4', '#556270'] },
  { name: 'Berry', colors: ['#8E2DE2', '#4A00E0'] },
  { name: 'Forest', colors: ['#11998E', '#38EF7D'] },
  { name: 'Fire', colors: ['#F83600', '#F9D423'] },
  { name: 'Midnight', colors: ['#232526', '#414345'] },
  { name: 'Neon', colors: ['#00F260', '#0575E6'] },
  { name: 'Candy', colors: ['#FF9A9E', '#FECFEF'] },
  { name: 'Aurora', colors: ['#00C9FF', '#92FE9D'] },
  { name: 'Cosmic', colors: ['#FF00CC', '#333399'] },
  { name: 'Desert', colors: ['#FF416C', '#FF4B2B'] },
  { name: 'Royal', colors: ['#141E30', '#243B55'] },
  { name: 'Lemon', colors: ['#F7971E', '#FFD200'] },
  { name: 'Mint', colors: ['#00B4DB', '#0083B0'] },
  { name: 'Grape', colors: ['#CC2B5E', '#753A88'] },
  { name: 'Sky', colors: ['#2980B9', '#6DD5FA', '#FFFFFF'] },
  { name: 'Cherry', colors: ['#EB3349', '#F45C43'] },
  { name: 'Deep Sea', colors: ['#1A2980', '#26D0CE'] },
  { name: 'Peach', colors: ['#ED4264', '#FFEDBC'] },
  { name: 'Lavender', colors: ['#E0C3FC', '#8EC5FC'] },
  { name: 'Rainbow', colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'] },
  { name: 'Gold', colors: ['#FFD700', '#FFA500', '#FF6347'] },
  { name: 'Silver', colors: ['#E8E8E8', '#C0C0C0', '#A9A9A9'] },
  { name: 'Tropical', colors: ['#06beb6', '#48b1bf'] },
  { name: 'Electric', colors: ['#42275a', '#734b6d'] },
  { name: 'Citrus', colors: ['#FDC830', '#F37335'] },
  { name: 'Winter', colors: ['#83a4d4', '#b6fbff'] },
  { name: 'Spring', colors: ['#ff9a9e', '#fecfef', '#feada6'] },
  { name: 'Summer', colors: ['#FDB813', '#F57C00'] },
  { name: 'Autumn', colors: ['#D4145A', '#FBB03B'] },
];

export default function CssGradientPage() {
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(90);
  const [colors, setColors] = useState<ColorStop[]>([
    { color: '#667EEA', position: 0 },
    { color: '#764BA2', position: 100 },
  ]);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const getGradientValue = () => {
    const colorStops = colors
      .sort((a, b) => a.position - b.position)
      .map(c => `${c.color} ${c.position}%`)
      .join(', ');

    switch (type) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${colorStops})`;
      case 'linear-to-right':
        return `linear-gradient(to right, ${colorStops})`;
      case 'linear-to-left':
        return `linear-gradient(to left, ${colorStops})`;
      case 'linear-to-top':
        return `linear-gradient(to top, ${colorStops})`;
      case 'linear-to-bottom':
        return `linear-gradient(to bottom, ${colorStops})`;
      case 'radial':
        return `radial-gradient(circle, ${colorStops})`;
      case 'radial-ellipse':
        return `radial-gradient(ellipse, ${colorStops})`;
      case 'conic':
        return `conic-gradient(from ${angle}deg, ${colorStops})`;
      case 'repeating-linear':
        return `repeating-linear-gradient(${angle}deg, ${colorStops})`;
      case 'repeating-radial':
        return `repeating-radial-gradient(circle, ${colorStops})`;
      case 'repeating-conic':
        return `repeating-conic-gradient(from ${angle}deg, ${colorStops})`;
    }
  };

  const cssValue = `background: ${getGradientValue()};`;

  const updateColor = (index: number, field: keyof ColorStop, value: string | number) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setColors(newColors);
    setActivePreset(null);
  };

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, { color: '#FFFFFF', position: 50 }]);
      setActivePreset(null);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
      setActivePreset(null);
    }
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Gradient Settings</span>
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
                      const newColors = preset.colors.map((color, idx) => ({
                        color,
                        position: idx === 0 ? 0 : idx === preset.colors.length - 1 ? 100 : Math.round((idx / (preset.colors.length - 1)) * 100)
                      }));
                      setColors(newColors);
                      setActivePreset(preset.name);
                    }}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      activePreset === preset.name
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase block mb-2">
                Type
              </label>
              <div className="space-y-2">
                {/* Linear Group */}
                <div>
                  <div className="text-[10px] text-stone-400 uppercase mb-1">Linear</div>
                  <div className="grid grid-cols-3 gap-1">
                    {(['linear', 'linear-to-right', 'linear-to-left', 'linear-to-top', 'linear-to-bottom'] as GradientType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => { setType(t); setActivePreset(null); }}
                        className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                          type === t
                            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                        }`}
                      >
                        {t === 'linear' ? 'Angle' : t.replace('linear-to-', '→ ')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Radial Group */}
                <div>
                  <div className="text-[10px] text-stone-400 uppercase mb-1">Radial</div>
                  <div className="grid grid-cols-2 gap-1">
                    {(['radial', 'radial-ellipse'] as GradientType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => { setType(t); setActivePreset(null); }}
                        className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                          type === t
                            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                        }`}
                      >
                        {t === 'radial' ? 'Circle' : 'Ellipse'}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Conic & Repeating */}
                <div>
                  <div className="text-[10px] text-stone-400 uppercase mb-1">Conic & Repeating</div>
                  <div className="grid grid-cols-2 gap-1">
                    {(['conic', 'repeating-linear', 'repeating-radial', 'repeating-conic'] as GradientType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => { setType(t); setActivePreset(null); }}
                        className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                          type === t
                            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                        }`}
                      >
                        {t.replace('repeating-', '↻ ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Angle (for linear and conic) */}
            {type !== 'radial' && (
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-stone-500 dark:text-stone-400">Angle</label>
                  <span className="text-xs text-stone-600 dark:text-stone-400">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => { setAngle(parseInt(e.target.value)); setActivePreset(null); }}
                  className="w-full"
                />
              </div>
            )}

            {/* Colors */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase">
                  Colors
                </label>
                {colors.length < 5 && (
                  <button
                    onClick={addColor}
                    className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                  >
                    + Add Color
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color.color}
                      onChange={(e) => updateColor(index, 'color', e.target.value)}
                      className="w-10 h-8 rounded cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={color.position}
                      onChange={(e) => updateColor(index, 'position', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-stone-600 dark:text-stone-400 w-8">
                      {color.position}%
                    </span>
                    {colors.length > 2 && (
                      <button
                        onClick={() => removeColor(index)}
                        className="text-stone-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
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
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Preview</span>
            <CopyButton text={cssValue} />
          </div>
          <div className="flex-1 min-h-0 flex flex-col">
            {/* Preview Box */}
            <div className="flex-1 p-8 bg-stone-100 dark:bg-stone-900">
              <div
                className="w-full h-full rounded-lg"
                style={{ background: getGradientValue() }}
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
