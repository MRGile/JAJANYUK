import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { categories, products, tenants } from '@/lib/db/schema';

export async function GET() {
  try {
    const data = await db
      .select({
        id: products.id,
        tenantId: products.tenant_id,
        tenant: tenants.name,
        category: categories.name,
        name: products.name,
        description: products.description,
        price: products.price,
        imageUrl: products.image_url,
        available: products.is_available,
      })
      .from(products)
      .innerJoin(tenants, eq(products.tenant_id, tenants.id))
      .leftJoin(categories, eq(products.category_id, categories.id))
      .where(and(eq(products.is_active, true), eq(tenants.is_active, true)))
      .orderBy(asc(tenants.name), asc(categories.sort_order), asc(products.name));

    return Response.json({ data });
  } catch (error) {
    console.error('GET /api/products failed:', error);
    return Response.json({ error: 'Gagal memuat produk.' }, { status: 500 });
  }
}
