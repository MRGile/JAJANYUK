import { and, desc, eq, inArray, type SQL } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { db } from '@/lib/db';
import { orderItems, orders, tenantKasirs, tenants, users } from '@/lib/db/schema';
import { handleAccessError, requireAuth } from '@/lib/auth/access';
import { notImplemented } from '@/lib/api/response';

export async function GET(request: Request) {
  try {
    const currentUser = await requireAuth(request);
    const filters: SQL[] = [];

    if (currentUser.role === 'pelanggan') {
      filters.push(eq(orders.pelanggan_user_id, currentUser.id));
    } else if (currentUser.role === 'kasir') {
      const memberships = await db.select({ tenantId: tenantKasirs.tenant_id }).from(tenantKasirs)
        .where(and(eq(tenantKasirs.kasir_user_id, currentUser.id), eq(tenantKasirs.is_active, true)));
      const tenantIds = memberships.map((membership) => membership.tenantId).filter((id): id is number => id !== null);
      filters.push(tenantIds.length ? inArray(orders.tenant_id, tenantIds) : eq(orders.id, -1));
    } else if (currentUser.role === 'owner') {
      const ownedTenants = await db.select({ id: tenants.id }).from(tenants)
        .where(eq(tenants.owner_id, currentUser.id));
      const tenantIds = ownedTenants.map((tenant) => tenant.id);
      filters.push(tenantIds.length ? inArray(orders.tenant_id, tenantIds) : eq(orders.id, -1));
    }

    const customer = alias(users, 'customer');
    const orderRows = await db.select({
      id: orders.id,
      orderNumber: orders.order_number,
      tenantId: orders.tenant_id,
      tenantName: tenants.name,
      customerName: customer.name,
      status: orders.status,
      subtotal: orders.subtotal,
      total: orders.total,
      notes: orders.notes,
      createdAt: orders.created_at,
    }).from(orders)
      .leftJoin(tenants, eq(orders.tenant_id, tenants.id))
      .leftJoin(customer, eq(orders.pelanggan_user_id, customer.id))
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(orders.created_at))
      .limit(100);

    if (orderRows.length === 0) return Response.json({ data: [] });
    const itemRows = await db.select({
      orderId: orderItems.order_id,
      name: orderItems.product_name,
      quantity: orderItems.quantity,
      subtotal: orderItems.subtotal,
    }).from(orderItems).where(inArray(orderItems.order_id, orderRows.map((order) => order.id)));

    const data = orderRows.map((order) => ({
      ...order,
      items: itemRows.filter((item) => item.orderId === order.id),
    }));
    return Response.json({ data });
  } catch (error) {
    const accessError = handleAccessError(error);
    return accessError;
  }
}

// POST — buat pesanan baru (pelanggan atau kasir)
// Server wajib: hitung ulang subtotal/total dari harga DB, kurangi stok atomik
export async function POST() {
  return notImplemented();
}
