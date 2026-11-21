import { notImplemented } from '@/lib/api/response';

// GET /api/tenants/[tenantId] — detail tenant
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params; // params is a Promise in Next.js 16
  return notImplemented();
}

// PATCH /api/tenants/[tenantId] — update tenant (owner only)
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}
