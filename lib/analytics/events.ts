import { posthog } from './posthog';

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
}

export function trackConversion(tool: 'typescript' | 'zod' | 'typescript-to-zod', properties?: Record<string, unknown>) {
  trackEvent('conversion_generated', { tool, ...properties });
}

export function trackFileLoad(source: 'file' | 'url') {
  trackEvent('json_loaded', { source });
}

export function trackClear() {
  trackEvent('json_cleared');
}
