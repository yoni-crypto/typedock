export interface JWTDecodeResult {
  success: boolean;
  header?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  signature?: string;
  error?: string;
}

export function decodeJWT(token: string): JWTDecodeResult {
  try {
    const trimmedToken = token.trim();
    
    if (!trimmedToken) {
      return { success: true };
    }

    const parts = trimmedToken.split('.');
    
    if (parts.length !== 3) {
      return {
        success: false,
        error: 'Invalid JWT format. Expected 3 parts separated by dots.'
      };
    }

    const [headerB64, payloadB64, signature] = parts;

    // Decode header
    let header: Record<string, unknown>;
    try {
      const headerJson = atob(headerB64.replace(/-/g, '+').replace(/_/g, '/'));
      header = JSON.parse(headerJson);
    } catch {
      return {
        success: false,
        error: 'Failed to decode header. Invalid Base64 or JSON.'
      };
    }

    // Decode payload
    let payload: Record<string, unknown>;
    try {
      const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
      payload = JSON.parse(payloadJson);
    } catch {
      return {
        success: false,
        error: 'Failed to decode payload. Invalid Base64 or JSON.'
      };
    }

    return {
      success: true,
      header,
      payload,
      signature
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to decode JWT'
    };
  }
}
