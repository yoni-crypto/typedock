import bcrypt from 'bcryptjs';

export interface BcryptResult {
  hash?: string;
  match?: boolean;
  error?: string;
  saltRounds?: number;
}

export async function hashPassword(password: string, rounds: number = 10): Promise<string> {
  const salt = await bcrypt.genSalt(rounds);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function getSaltRoundsFromHash(hash: string): number | null {
  const match = hash.match(/^\$2[ayb]\$(\d{2})\$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

export const saltRoundsOptions = [
  { value: 4, label: '4 (Fast)', description: '~60ms' },
  { value: 8, label: '8 (Normal)', description: '~240ms' },
  { value: 10, label: '10 (Default)', description: '~1s' },
  { value: 12, label: '12 (Secure)', description: '~4s' },
  { value: 14, label: '14 (Very Secure)', description: '~16s' },
];
