import { notImplemented } from '@/lib/api/response';

// POST body: { reason?: string } — batalkan pesanan
// Pelanggan: hanya bisa batal jika status = pending | confirmed | processing
// Kasir/owner: bisa batal semua kecuali completed
// Jika sudah bayar: otomatis buat refund record
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  await params;
  return notImplemented();
}
