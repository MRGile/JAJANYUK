
import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { categories, products } from '@/lib/db/schema';
import { handleAccessError, requireRole } from '@/lib/auth/access';

type RouteContext = {
  params: Promise<{ productId: string }>;
};

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
    .values({ tenant_id: tenantId, name: categoryName })
    .returning({ id: categories.id });

  return created.id;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await requireRole(request, 'owner');
    const { productId } = await context.params;
    const id = Number(productId);

    if (!user.tenantId || !Number.isInteger(id) || id < 1) {
      return Response.json({ error: 'Produk atau tenant tidak valid.' }, { status: 400 });
    }

    const body = await request.json();
    const update: Partial<typeof products.$inferInsert> = {};

    if (typeof body.name === 'string') {
      const name = body.name.trim();
      if (!name) return Response.json({ error: 'Nama produk wajib diisi.' }, { status: 400 });
      update.name = name;
    }

    if (typeof body.description === 'string') {
      update.description = body.description.trim();
    }

    if (typeof body.category === 'string') {
      if (!body.category.trim()) {
        return Response.json({ error: 'Kategori wajib diisi.' }, { status: 400 });
      }
      update.category_id = await getCategoryId(user.tenantId, body.category);
    }

    if (body.price !== undefined) {
      const price = Number(body.price);
      if (!Number.isFinite(price) || price <= 0) {
        return Response.json({ error: 'Harga tidak valid.' }, { status: 400 });
      }
      update.price = String(price);
    }

    if (body.cost !== undefined) {
      const cost = body.cost === null || body.cost === '' ? null : Number(body.cost);
      if (cost !== null && (!Number.isFinite(cost) || cost < 0)) {
        return Response.json({ error: 'Harga modal tidak valid.' }, { status: 400 });
      }
      update.cost_price = cost === null ? null : String(cost);
    }

    if (body.stock !== undefined) {
      const stock = body.stock === null || body.stock === '' ? null : Number(body.stock);
      if (stock !== null && (!Number.isInteger(stock) || stock < 0)) {
        return Response.json({ error: 'Stok tidak valid.' }, { status: 400 });
      }
      update.stock = stock ?? 0;
      update.track_stock = stock !== null;
    }

    if (body.imageUrl !== undefined) {
      if (body.imageUrl !== null && (
        typeof body.imageUrl !== 'string' ||
        !body.imageUrl.startsWith('https://') ||
        body.imageUrl.length > 2048
      )) {
        return Response.json({ error: 'URL foto tidak valid.' }, { status: 400 });
      }
      update.image_url = body.imageUrl;
    }

    const [updated] = await db
      .update(products)
      .set(update)
      .where(and(
        eq(products.id, id),
        eq(products.tenant_id, user.tenantId)
      ))
      .returning({ id: products.id });

    if (!updated) {
      return Response.json({ error: 'Produk tidak ditemukan.' }, { status: 404 });
    }

    return Response.json({ data: updated });
  } catch (error) {
    try {
      return handleAccessError(error);
    } catch (unexpectedError) {
      console.error('PATCH owner product failed:', unexpectedError);
      return Response.json({ error: 'Gagal memperbarui produk.' }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await requireRole(request, 'owner');
    const { productId } = await context.params;
    const id = Number(productId);

    if (!user.tenantId || !Number.isInteger(id) || id < 1) {
      return Response.json({ error: 'Produk atau tenant tidak valid.' }, { status: 400 });
    }

    const [deleted] = await db
      .update(products)
      .set({ is_active: false })
      .where(and(
        eq(products.id, id),
        eq(products.tenant_id, user.tenantId)
      ))
      .returning({ id: products.id });

    if (!deleted) {
      return Response.json({ error: 'Produk tidak ditemukan.' }, { status: 404 });
    }

    return Response.json({ data: deleted });
  } catch (error) {
    try {
      return handleAccessError(error);
    } catch (unexpectedError) {
      console.error('DELETE owner product failed:', unexpectedError);
      return Response.json({ error: 'Gagal menghapus produk.' }, { status: 500 });
    }
  }
}
