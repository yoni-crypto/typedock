export function prettifyJson(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return json;
  }
}

export function minifyJson(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed);
  } catch {
    return json;
  }
}

export function sortJsonKeys(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(sortObjectKeys(parsed), null, 2);
  } catch {
    return json;
  }
}

export function removeNullValues(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(removeNulls(parsed), null, 2);
  } catch {
    return json;
  }
}

function sortObjectKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  const sorted: Record<string, unknown> = {};
  const keys = Object.keys(obj).sort();
  
  for (const key of keys) {
    sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
  }

  return sorted;
}

function removeNulls(obj: unknown): unknown {
  if (obj === null) {
    return undefined;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeNulls).filter(v => v !== undefined);
  }

  const cleaned: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const cleanedValue = removeNulls(value);
    if (cleanedValue !== undefined && cleanedValue !== null) {
      cleaned[key] = cleanedValue;
    }
  }

  return cleaned;
}
