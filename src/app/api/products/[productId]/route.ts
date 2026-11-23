import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { categories, products, tenants } from '@/lib/db/schema';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const id = Number(productId);
  if (!Number.isInteger(id) || id < 1) {
    return Response.json({ error: 'ID produk tidak valid.' }, { status: 400 });
  }

  try {
    const [data] = await db
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
      .where(and(eq(products.id, id), eq(products.is_active, true), eq(tenants.is_active, true)))
      .limit(1);

    if (!data) return Response.json({ error: 'Produk tidak ditemukan.' }, { status: 404 });
    return Response.json({ data });
  } catch (error) {
    console.error('GET /api/products/[productId] failed:', error);
    return Response.json({ error: 'Gagal memuat produk.' }, { status: 500 });
  }
}
