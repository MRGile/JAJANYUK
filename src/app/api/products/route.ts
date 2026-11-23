
import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { categories, products } from '@/lib/db/schema';
import { handleAccessError, requireRole } from '@/lib/auth/access';

async function getCategoryId(tenantId: number, name: string) {
  const categoryName = name.trim();

  const [existing] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(and(
      eq(categories.tenant_id, tenantId),
      eq(categories.name, categoryName)
    ))
    .limit(1);

  if (existing) return existing.id;

  const [created] = await db
    .insert(categories)
    .values({
      tenant_id: tenantId,
      name: categoryName,
    })
    .returning({ id: categories.id });

  return created.id;
}

export async function GET(request: Request) {
  try {
    const user = await requireRole(request, 'owner');

    if (!user.tenantId) {
      return Response.json({ error: 'Tenant tidak ditemukan.' }, { status: 403 });
    }

    const data = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        category: categories.name,
        price: products.price,
        cost: products.cost_price,
        stock: products.stock,
        trackStock: products.track_stock,
        imageUrl: products.image_url,
        available: products.is_available,
      })
      .from(products)
      .leftJoin(categories, eq(products.category_id, categories.id))
      .where(eq(products.tenant_id, user.tenantId))
      .orderBy(asc(products.name));

    return Response.json({ data });
  } catch (error) {
    try {
      return handleAccessError(error);
    } catch (unexpectedError) {
      console.error('GET owner products failed:', unexpectedError);
      return Response.json({ error: 'Gagal memuat produk.' }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireRole(request, 'owner');

    if (!user.tenantId) {
      return Response.json({ error: 'Tenant tidak ditemukan.' }, { status: 403 });
    }

    const body = await request.json();

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const category = typeof body.category === 'string' ? body.category.trim() : '';
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    const price = Number(body.price);
    const cost = body.cost === null || body.cost === '' ? null : Number(body.cost);
    const stock = body.stock === null || body.stock === '' ? null : Number(body.stock);
    const imageUrl = typeof body.imageUrl === 'string' ? body.imageUrl : null;

    if (!name || !category || !Number.isFinite(price) || price <= 0) {
      return Response.json({ error: 'Nama, kategori, dan harga wajib diisi.' }, { status: 400 });
    }

    if (cost !== null && (!Number.isFinite(cost) || cost < 0)) {
      return Response.json({ error: 'Harga modal tidak valid.' }, { status: 400 });
    }

    if (stock !== null && (!Number.isInteger(stock) || stock < 0)) {
      return Response.json({ error: 'Stok harus berupa angka bulat minimal 0.' }, { status: 400 });
    }

    if (imageUrl && (!imageUrl.startsWith('https://') || imageUrl.length > 2048)) {
      return Response.json({ error: 'URL foto tidak valid.' }, { status: 400 });
    }

    const categoryId = await getCategoryId(user.tenantId, category);

    const [created] = await db
      .insert(products)
      .values({
        tenant_id: user.tenantId,
        category_id: categoryId,
        name,
        description,
        price: String(price),
        cost_price: cost === null ? null : String(cost),
        stock: stock ?? 0,
        track_stock: stock !== null,
        image_url: imageUrl,
      })
      .returning({ id: products.id });

    return Response.json({ data: created }, { status: 201 });
  } catch (error) {
    try {
      return handleAccessError(error);
    } catch (unexpectedError) {
      console.error('POST owner products failed:', unexpectedError);
      return Response.json({ error: 'Gagal menyimpan produk.' }, { status: 500 });
    }
  }
}
