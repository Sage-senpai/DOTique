// src/utils/validators.ts
/**
 * ✅ Input Validators — for forms and API validation
 */

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isUsername(value: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(value);
}

export function isStrongPassword(value: string): boolean {
  return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(value);
}

export function isValidURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isValidPolkadotAddress(value: string): boolean {
  return /^1[0-9A-Za-z]{47}$/.test(value);
}
