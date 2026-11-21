import { notImplemented } from '@/lib/api/response';

// GET ?tenant_id=&from=YYYY-MM-DD&to=YYYY-MM-DD
// Returns: { revenue, orders_count, profit, top_products, transactions }
// Hanya owner/admin
export async function GET() {
  return notImplemented();
}
