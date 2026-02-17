'use client';

import { useState, useEffect } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CopyButton } from '@/components/ui/CopyButton';

export default function ColorConverterPage() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const rgbVal = hexToRgb(newHex);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  const updateFromRgb = (newRgb: { r: number; g: number; b: number }) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromHsl = (newHsl: { h: number; s: number; l: number }) => {
    setHsl(newHsl);
    const rgbVal = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(rgbVal);
    setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
  };

  return (
    <SplitLayout
      left={
        <>
          <div className="h-10 px-4 flex items-center border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Color Input</span>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Color Picker
                </label>
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="w-full h-32 rounded border border-stone-300 dark:border-stone-700 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  HEX
                </label>
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  RGB
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={rgb.r}
                    onChange={(e) => updateFromRgb({ ...rgb, r: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                    className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-sm"
                    placeholder="R"
                    min="0"
                    max="255"
                  />
                  <input
                    type="number"
                    value={rgb.g}
                    onChange={(e) => updateFromRgb({ ...rgb, g: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                    className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-sm"
                    placeholder="G"
                    min="0"
                    max="255"
                  />
                  <input
                    type="number"
                    value={rgb.b}
                    onChange={(e) => updateFromRgb({ ...rgb, b: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                    className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-sm"
                    placeholder="B"
                    min="0"
                    max="255"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  HSL
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={hsl.h}
                    onChange={(e) => updateFromHsl({ ...hsl, h: Math.max(0, Math.min(360, parseInt(e.target.value) || 0)) })}
                    className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-sm"
                    placeholder="H"
                    min="0"
                    max="360"
                  />
                  <input
                    type="number"
                    value={hsl.s}
                    onChange={(e) => updateFromHsl({ ...hsl, s: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })}
                    className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-sm"
                    placeholder="S"
                    min="0"
                    max="100"
                  />
                  <input
                    type="number"
                    value={hsl.l}
                    onChange={(e) => updateFromHsl({ ...hsl, l: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })}
                    className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-sm"
                    placeholder="L"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="h-10 px-4 flex items-center border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">Color Values</span>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-4">
              <div 
                className="w-full h-48 rounded-lg border border-stone-300 dark:border-stone-700"
                style={{ backgroundColor: hex }}
              />

              <div className="space-y-3">
                <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">HEX</span>
                    <CopyButton text={hex} />
                  </div>
                  <div className="text-sm font-mono text-stone-900 dark:text-stone-100">{hex}</div>
                </div>

                <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">RGB</span>
                    <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
                  </div>
                  <div className="text-sm font-mono text-stone-900 dark:text-stone-100">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">RGBA</span>
                    <CopyButton text={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`} />
                  </div>
                  <div className="text-sm font-mono text-stone-900 dark:text-stone-100">
                    rgba({rgb.r}, {rgb.g}, {rgb.b}, 1)
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">HSL</span>
                    <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
                  </div>
                  <div className="text-sm font-mono text-stone-900 dark:text-stone-100">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">HSLA</span>
                    <CopyButton text={`hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`} />
                  </div>
                  <div className="text-sm font-mono text-stone-900 dark:text-stone-100">
                    hsla({hsl.h}, {hsl.s}%, {hsl.l}%, 1)
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
