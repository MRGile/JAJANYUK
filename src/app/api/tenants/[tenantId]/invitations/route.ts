import { notImplemented } from '@/lib/api/response';

// GET — daftar undangan aktif milik tenant (owner only)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}

// POST — buat kode undangan baru (owner only)
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}
