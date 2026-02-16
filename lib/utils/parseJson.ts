export function parseJson(input: string): { success: true; data: unknown } | { success: false; error: string } {
  if (!input.trim()) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    const data = JSON.parse(input);
    return { success: true, data };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Invalid JSON' };
  }
}

export function parseMultipleJson(input: string): { success: true; data: unknown[] } | { success: false; error: string } {
  const trimmed = input.trim();
  
  if (!trimmed) {
    return { success: false, error: 'Input is empty' };
  }

  const samples: unknown[] = [];
  let pos = 0;
  
  while (pos < trimmed.length) {
    while (pos < trimmed.length && /\s/.test(trimmed[pos])) {
      pos++;
    }
    
    if (pos >= trimmed.length) break;
    
    let depth = 0;
    let inString = false;
    let escape = false;
    const start = pos;
    
    while (pos < trimmed.length) {
      const char = trimmed[pos];
      
      if (escape) {
        escape = false;
        pos++;
        continue;
      }
      
      if (char === '\\') {
        escape = true;
        pos++;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        pos++;
        continue;
      }
      
      if (!inString) {
        if (char === '{' || char === '[') {
          depth++;
        } else if (char === '}' || char === ']') {
          depth--;
          if (depth === 0) {
            pos++;
            break;
          }
        }
      }
      
      pos++;
    }
    
    const jsonStr = trimmed.slice(start, pos);
    
    try {
      const parsed = JSON.parse(jsonStr);
      samples.push(parsed);
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Invalid JSON' };
    }
  }

  if (samples.length === 0) {
    return { success: false, error: 'No valid JSON found' };
  }

  return { success: true, data: samples };
}
