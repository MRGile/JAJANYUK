import { asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { tenants } from '@/lib/db/schema';

export async function GET() {
  try {
    const data = await db
      .select({
        id: tenants.id,
        name: tenants.name,
        description: tenants.description,
        logoUrl: tenants.logo_url,
        bannerUrl: tenants.banner_url,
      })
      .from(tenants)
      .where(eq(tenants.is_active, true))
      .orderBy(asc(tenants.name));

    return Response.json({ data });
  } catch (error) {
    console.error('GET /api/tenants failed:', error);
    return Response.json({ error: 'Gagal memuat tenant.' }, { status: 500 });
  }
}
