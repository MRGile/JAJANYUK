import { notImplemented } from '@/lib/api/response';

// PATCH body: { status: OrderStatus } — ubah status pesanan (kasir/owner)
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  await params;
  return notImplemented();
}
