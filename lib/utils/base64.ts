export interface Base64Result {
  success: boolean;
  output?: string;
  error?: string;
}

export function encodeBase64(input: string): Base64Result {
  try {
    if (!input) {
      return { success: true, output: '' };
    }
    const encoded = btoa(unescape(encodeURIComponent(input)));
    return { success: true, output: encoded };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Encoding failed'
    };
  }
}

export function decodeBase64(input: string): Base64Result {
  try {
    if (!input) {
      return { success: true, output: '' };
    }
    const decoded = decodeURIComponent(escape(atob(input)));
    return { success: true, output: decoded };
  } catch (err) {
    return {
      success: false,
      error: 'Invalid Base64 string'
    };
  }
}
