import { notImplemented } from '@/lib/api/response';

// GET /api/tenants/[tenantId]/products — katalog produk (dengan filter stok)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}

// POST /api/tenants/[tenantId]/products — tambah produk (owner only)
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}
