import { randomBytes } from 'crypto';

/**
 * Generate kode undangan kasir: 8 karakter uppercase alphanumeric
 * Contoh: "A3BX9K2M"
 */
export function generateInvitationCode(): string {
  return randomBytes(6)
    .toString('base64')
    .replace(/[^A-Z0-9]/gi, '')
    .substring(0, 8)
    .toUpperCase()
    .padEnd(8, '0');
}
