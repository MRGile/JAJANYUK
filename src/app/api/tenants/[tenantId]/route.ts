import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { tenants } from '@/lib/db/schema';
import { notImplemented } from '@/lib/api/response';

// GET /api/tenants/[tenantId] — detail tenant
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  const { tenantId } = await params;
  const id = Number(tenantId);
  if (!Number.isInteger(id) || id < 1) {
    return Response.json({ error: 'ID tenant tidak valid.' }, { status: 400 });
  }

  try {
    const [data] = await db
      .select({
        id: tenants.id,
        name: tenants.name,
        description: tenants.description,
        logoUrl: tenants.logo_url,
        bannerUrl: tenants.banner_url,
      })
      .from(tenants)
      .where(eq(tenants.id, id))
      .limit(1);

    if (!data) return Response.json({ error: 'Tenant tidak ditemukan.' }, { status: 404 });
    return Response.json({ data });
  } catch (error) {
    console.error('GET /api/tenants/[tenantId] failed:', error);
    return Response.json({ error: 'Gagal memuat tenant.' }, { status: 500 });
  }
}

// PATCH /api/tenants/[tenantId] — update tenant (owner only)
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}
