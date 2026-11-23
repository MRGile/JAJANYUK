import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { categories, products, tenants } from '@/lib/db/schema';
import { notImplemented } from '@/lib/api/response';

// GET /api/tenants/[tenantId]/products — katalog produk (dengan filter stok)
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
    const data = await db
      .select({
        id: products.id,
        tenantId: products.tenant_id,
        tenant: tenants.name,
        categoryId: products.category_id,
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
      .where(and(eq(products.tenant_id, id), eq(products.is_active, true), eq(tenants.is_active, true)))
      .orderBy(asc(categories.sort_order), asc(products.name));

    return Response.json({ data });
  } catch (error) {
    console.error('GET /api/tenants/[tenantId]/products failed:', error);
    return Response.json({ error: 'Gagal memuat produk.' }, { status: 500 });
  }
}

// POST /api/tenants/[tenantId]/products — tambah produk (owner only)
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  await params;
  return notImplemented();
}
