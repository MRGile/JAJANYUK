/**
 * Generate order number format: TKT-YYYYMMDD-XXXXX
 * XXXXX = 5 karakter random alphanumeric uppercase
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `TKT-${date}-${random}`;
}
