import { eq } from 'drizzle-orm';
import { db, pool } from '@/lib/db';
import { tenants } from '@/lib/db/schema';
import { ForbiddenError, handleAccessError, requireRole } from '@/lib/auth/access';

type QueryRow = Record<string, string | number | Date | null>;

function isDate(value: string | null) {
  return value !== null && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function GET(request: Request) {
  try {
    const currentUser = await requireRole(request, 'admin', 'owner');
    const url = new URL(request.url);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const requestedTenant = url.searchParams.get('tenant_id');
    if (!isDate(from) || !isDate(to)) {
      return Response.json({ error: 'Parameter from dan to wajib berformat YYYY-MM-DD.' }, { status: 400 });
    }
    const fromDate = from as string;
    const exclusiveTo = new Date(`${to}T00:00:00Z`);
    exclusiveTo.setUTCDate(exclusiveTo.getUTCDate() + 1);
    const toDate = exclusiveTo.toISOString();

    let tenantIds: number[] | null = null;
    if (currentUser.role === 'owner') {
      const owned = await db.select({ id: tenants.id }).from(tenants)
        .where(eq(tenants.owner_id, currentUser.id));
      tenantIds = owned.map((tenant) => tenant.id);
      if (requestedTenant) {
        const id = Number(requestedTenant);
        if (!Number.isInteger(id) || !tenantIds.includes(id)) throw new ForbiddenError('Kamu bukan owner dari tenant ini.');
        tenantIds = [id];
      }
    } else if (requestedTenant) {
      const id = Number(requestedTenant);
      if (!Number.isInteger(id) || id < 1) return Response.json({ error: 'ID tenant tidak valid.' }, { status: 400 });
      tenantIds = [id];
    }

    if (tenantIds && tenantIds.length === 0) {
      return Response.json({ data: { summary: { ordersCount: 0, completedCount: 0, cancelledCount: 0, revenue: 0, profit: 0 }, daily: [], tenants: [], topProducts: [], transactions: [] } });
    }

    const tenantClause = tenantIds ? ' AND o.tenant_id = ANY($3::int[])' : '';
    const params = tenantIds ? [fromDate, toDate, tenantIds] : [fromDate, toDate];
    const [summaryResult, costResult, dailyResult, tenantResult, productsResult, transactionsResult] = await Promise.all([
      pool.query<QueryRow>(`SELECT COUNT(*) AS "ordersCount",
        COUNT(*) FILTER (WHERE o.status = 'completed') AS "completedCount",
        COUNT(*) FILTER (WHERE o.status = 'cancelled') AS "cancelledCount",
        COALESCE(SUM(o.total), 0) AS revenue
        FROM orders o WHERE o.created_at >= $1 AND o.created_at < $2${tenantClause}`, params),
      pool.query<QueryRow>(`SELECT COALESCE(SUM(oi.product_cost_price * oi.quantity), 0) AS cost
        FROM order_items oi INNER JOIN orders o ON o.id = oi.order_id
        WHERE o.created_at >= $1 AND o.created_at < $2${tenantClause}`, params),
      pool.query<QueryRow>(`SELECT DATE(o.created_at) AS date, COUNT(*) AS "ordersCount", COALESCE(SUM(o.total), 0) AS revenue
        FROM orders o WHERE o.created_at >= $1 AND o.created_at < $2${tenantClause}
        GROUP BY DATE(o.created_at) ORDER BY date`, params),
      pool.query<QueryRow>(`SELECT t.id, t.name, COUNT(o.id) AS "ordersCount",
        COUNT(*) FILTER (WHERE o.status = 'completed') AS "completedCount",
        COUNT(*) FILTER (WHERE o.status = 'cancelled') AS "cancelledCount",
        COALESCE(SUM(o.total), 0) AS revenue
        FROM tenants t LEFT JOIN orders o ON o.tenant_id = t.id
        AND o.created_at >= $1 AND o.created_at < $2
        ${tenantIds ? 'WHERE t.id = ANY($3::int[])' : ''}
        GROUP BY t.id, t.name ORDER BY revenue DESC`, params),
      pool.query<QueryRow>(`SELECT oi.product_id AS "productId", oi.product_name AS name,
        SUM(oi.quantity) AS quantity, COALESCE(SUM(oi.subtotal), 0) AS revenue
        FROM order_items oi INNER JOIN orders o ON o.id = oi.order_id
        WHERE o.created_at >= $1 AND o.created_at < $2${tenantClause}
        GROUP BY oi.product_id, oi.product_name ORDER BY quantity DESC LIMIT 10`, params),
      pool.query<QueryRow>(`SELECT o.id, o.order_number AS "orderNumber", o.status, o.total,
        o.created_at AS "createdAt", t.name AS tenant
        FROM orders o LEFT JOIN tenants t ON t.id = o.tenant_id
        WHERE o.created_at >= $1 AND o.created_at < $2${tenantClause}
        ORDER BY o.created_at DESC LIMIT 100`, params),
    ]);

    const summary = summaryResult.rows[0] ?? {};
    const revenue = Number(summary.revenue ?? 0);
    return Response.json({ data: {
      summary: {
        ordersCount: Number(summary.ordersCount ?? 0),
        completedCount: Number(summary.completedCount ?? 0),
        cancelledCount: Number(summary.cancelledCount ?? 0),
        revenue,
        profit: revenue - Number(costResult.rows[0]?.cost ?? 0),
      },
      daily: dailyResult.rows.map((row) => ({ date: row.date, ordersCount: Number(row.ordersCount ?? 0), revenue: Number(row.revenue ?? 0) })),
      tenants: tenantResult.rows.map((row) => ({
        id: Number(row.id), name: String(row.name ?? ''), ordersCount: Number(row.ordersCount ?? 0),
        completedCount: Number(row.completedCount ?? 0), cancelledCount: Number(row.cancelledCount ?? 0), revenue: Number(row.revenue ?? 0),
      })),
      topProducts: productsResult.rows,
      transactions: transactionsResult.rows,
    } });
  } catch (error) {
    return handleAccessError(error);
  }
}
