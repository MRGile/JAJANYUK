import { notImplemented } from '@/lib/api/response';

// GET /api/tenants/[tenantId]/categories — daftar kategori
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}

// POST /api/tenants/[tenantId]/categories — tambah kategori (owner only)
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}
