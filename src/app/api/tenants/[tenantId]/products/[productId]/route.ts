import { notImplemented } from '@/lib/api/response';

// GET — detail produk
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string; productId: string }> }
) {
  await params;
  return notImplemented();
}

// PATCH — update produk (owner only)
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string; productId: string }> }
) {
  await params;
  return notImplemented();
}

// DELETE — hapus/nonaktifkan produk (owner only, soft delete via is_active)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string; productId: string }> }
) {
  await params;
  return notImplemented();
}
