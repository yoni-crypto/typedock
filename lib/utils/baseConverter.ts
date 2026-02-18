const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const BASE58_CHARS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function decimalToBase(decimal: number, chars: string): string {
  if (decimal === 0) return '0';
  const base = chars.length;
  let result = '';
  while (decimal > 0) {
    result = chars[decimal % base] + result;
    decimal = Math.floor(decimal / base);
  }
  return result;
}

function baseToDecimal(value: string, chars: string): number {
  const base = chars.length;
  let result = 0;
  for (let i = 0; i < value.length; i++) {
    const index = chars.indexOf(value[i]);
    if (index === -1) return NaN;
    result = result * base + index;
  }
  return result;
}

export function convertBase(value: string, fromBase: number, toBase: number): string {
  if (!value.trim()) return '';
  
  try {
    const decimal = parseInt(value, fromBase);
    if (isNaN(decimal)) return 'Invalid input';
    return decimal.toString(toBase).toUpperCase();
  } catch {
    return 'Invalid input';
  }
}

export function convertToAllBases(value: string, fromBase: number) {
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) return null;
  
  return {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    decimal: decimal.toString(10),
    hexadecimal: decimal.toString(16).toUpperCase(),
    base32: decimal > 0 ? decimalToBase(decimal, BASE32_CHARS).toUpperCase() : '0',
    base58: decimal > 0 ? decimalToBase(decimal, BASE58_CHARS) : '0',
    base64: decimal > 0 ? decimalToBase(decimal, BASE64_CHARS) : '0',
  };
}

export function getBaseInfo(base: number): { name: string; chars: string; example: string } {
  switch (base) {
    case 2:
      return { name: 'Binary', chars: '0-1', example: '1010' };
    case 8:
      return { name: 'Octal', chars: '0-7', example: '12' };
    case 10:
      return { name: 'Decimal', chars: '0-9', example: '10' };
    case 16:
      return { name: 'Hexadecimal', chars: '0-9, A-F', example: 'A' };
    case 32:
      return { name: 'Base32', chars: 'A-Z, 2-7', example: 'J' };
    case 58:
      return { name: 'Base58', chars: 'Alphanumeric (no 0OIl)', example: '2' };
    case 64:
      return { name: 'Base64', chars: 'A-Z, a-z, 0-9, +/', example: 'B' };
    default:
      return { name: 'Unknown', chars: '', example: '' };
  }
}

export function validateInput(value: string, base: number): { valid: boolean; message: string } {
  if (!value.trim()) {
    return { valid: false, message: 'Please enter a number' };
  }

  const validChars = getValidCharsForBase(base);
  for (const char of value) {
    if (!validChars.includes(char.toUpperCase()) && !validChars.includes(char.toLowerCase())) {
      return { valid: false, message: `Invalid character "${char}" for base ${base}` };
    }
  }

  return { valid: true, message: '' };
}

function getValidCharsForBase(base: number): string {
  switch (base) {
    case 2: return '01';
    case 8: return '01234567';
    case 10: return '0123456789';
    case 16: return '0123456789ABCDEF';
    case 32: return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    case 58: return BASE58_CHARS;
    case 64: return BASE64_CHARS;
    default: return '';
  }
}
