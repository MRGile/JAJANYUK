import { notImplemented } from '@/lib/api/response';

// GET — status pembayaran pesanan
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  await params;
  return notImplemented();
}

// POST body: { method: 'cash', amount_paid: number } — proses pembayaran tunai
// Server wajib: validasi amount_paid >= total, hitung kembalian
// Struktur siap untuk QRIS: method: 'qris' akan ditangani terpisah nanti
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  await params;
  return notImplemented();
}
