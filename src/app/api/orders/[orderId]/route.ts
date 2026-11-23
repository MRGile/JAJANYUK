import { notImplemented } from '@/lib/api/response';

// GET — detail pesanan
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  await params;
  return notImplemented();
}
