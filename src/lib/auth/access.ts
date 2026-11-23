import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { tenantKasirs, tenants, users } from '@/lib/db/schema';
import { readSessionToken, SESSION_COOKIE } from './session';

export type UserRole = 'pelanggan' | 'owner' | 'kasir' | 'admin';

export interface RequestUser {
  id: number;
  role: UserRole;
  tenantId?: number; // untuk kasir dan owner
}

export class AuthRequiredError extends Error {
  readonly statusCode = 401;
  constructor() {
    super('Silakan masuk untuk melanjutkan.');
    this.name = 'AuthRequiredError';
  }
}

export class ForbiddenError extends Error {
  readonly statusCode = 403;
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/**
 * Membaca session cookie yang sudah ditandatangani, lalu memuat role terbaru dari DB.
 */
export async function getRequestUser(request: Request): Promise<RequestUser> {
  const cookie = request.headers.get('cookie')?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  const token = cookie?.slice(SESSION_COOKIE.length + 1);
  const session = token ? readSessionToken(token) : null;
  if (!session) throw new AuthRequiredError();

  const [user] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);
  if (!user) throw new AuthRequiredError();

  let tenantId: number | undefined;
  if (user.role === 'owner') {
    const [tenant] = await db.select({ id: tenants.id }).from(tenants)
      .where(eq(tenants.owner_id, user.id)).limit(1);
    tenantId = tenant?.id;
  } else if (user.role === 'kasir') {
    const [membership] = await db.select({ tenant_id: tenantKasirs.tenant_id })
      .from(tenantKasirs)
      .where(and(eq(tenantKasirs.kasir_user_id, user.id), eq(tenantKasirs.is_active, true)))
      .limit(1);
    tenantId = membership?.tenant_id ?? undefined;
  }

  return { id: user.id, role: user.role, tenantId };
}

/** Pastikan user sudah login */
export async function requireAuth(request: Request): Promise<RequestUser> {
  return getRequestUser(request);
}

/** Pastikan user memiliki role tertentu */
export async function requireRole(
  request: Request,
  ...roles: UserRole[]
): Promise<RequestUser> {
  const user = await requireAuth(request);
  if (!roles.includes(user.role)) {
    throw new ForbiddenError(
      `Role '${user.role}' tidak diizinkan. Butuh: ${roles.join(', ')}`
    );
  }
  return user;
}

/** Pastikan user adalah owner dari tenant tertentu */
export async function requireOwnerOfTenant(
  request: Request,
  tenantId: number
): Promise<RequestUser> {
  const user = await requireRole(request, 'owner');
  const [tenant] = await db.select({ id: tenants.id }).from(tenants)
    .where(and(eq(tenants.id, tenantId), eq(tenants.owner_id, user.id))).limit(1);
  if (!tenant) {
    throw new ForbiddenError('Kamu bukan owner dari tenant ini.');
  }
  return { ...user, tenantId };
}

/** Pastikan user adalah kasir yang terdaftar di tenant tertentu */
export async function requireKasirOfTenant(
  request: Request,
  tenantId: number
): Promise<RequestUser> {
  const user = await requireRole(request, 'kasir', 'owner', 'admin');
  if (user.role === 'kasir') {
    const [membership] = await db.select({ id: tenantKasirs.id }).from(tenantKasirs)
      .where(and(
        eq(tenantKasirs.kasir_user_id, user.id),
        eq(tenantKasirs.tenant_id, tenantId),
        eq(tenantKasirs.is_active, true),
      )).limit(1);
    if (!membership) throw new ForbiddenError('Kamu bukan kasir dari tenant ini.');
    return { ...user, tenantId };
  }
  if (user.role === 'owner') {
    const [tenant] = await db.select({ id: tenants.id }).from(tenants)
      .where(and(eq(tenants.id, tenantId), eq(tenants.owner_id, user.id))).limit(1);
    if (!tenant) throw new ForbiddenError('Kamu bukan owner dari tenant ini.');
  }
  if (user.role === 'admin') return user;
  if (user.tenantId !== tenantId) {
    throw new ForbiddenError('Kamu bukan kasir dari tenant ini.');
  }
  return { ...user, tenantId };
}

/** Helper: buat Response error standar dari error yang dilempar */
export function handleAccessError(error: unknown): Response {
  if (error instanceof AuthRequiredError) {
    return Response.json({ error: error.message }, { status: 401 });
  }
  if (error instanceof ForbiddenError) {
    return Response.json({ error: error.message }, { status: 403 });
  }
  throw error; // biarkan error lain naik ke error handler global
}
