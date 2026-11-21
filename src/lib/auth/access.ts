/**
 * Access control helpers — STUBS untuk fase pra-autentikasi.
 *
 * Semua fungsi di sini mengembalikan error 501 sampai autentikasi diimplementasikan.
 * Setelah auth tersedia:
 * 1. Ganti getRequestUser() agar membaca JWT/session dari header request
 * 2. Fungsi-fungsi lain tidak perlu diubah
 *
 * JANGAN gunakan fungsi ini untuk membatasi akses di UI — hanya di server.
 */

export type UserRole = 'pelanggan' | 'owner' | 'kasir' | 'admin';

export interface RequestUser {
  id: number;
  role: UserRole;
  tenantId?: number; // untuk kasir dan owner
}

export class AuthRequiredError extends Error {
  readonly statusCode = 501;
  constructor() {
    super(
      'Authentication required. This endpoint will be enabled after auth is implemented.'
    );
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
 * Ekstrak user dari request.
 * STUB: selalu throw AuthRequiredError sampai auth diimplementasikan.
 *
 * Setelah auth: baca JWT dari Authorization header atau session cookie.
 */
export async function getRequestUser(_request: Request): Promise<RequestUser> {
  throw new AuthRequiredError();
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
  if (user.tenantId !== tenantId) {
    throw new ForbiddenError('Kamu bukan owner dari tenant ini.');
  }
  return user;
}

/** Pastikan user adalah kasir yang terdaftar di tenant tertentu */
export async function requireKasirOfTenant(
  request: Request,
  tenantId: number
): Promise<RequestUser> {
  const user = await requireRole(request, 'kasir', 'owner', 'admin');
  if (user.role === 'kasir' && user.tenantId !== tenantId) {
    throw new ForbiddenError('Kamu bukan kasir dari tenant ini.');
  }
  return user;
}

/** Helper: buat Response error standar dari error yang dilempar */
export function handleAccessError(error: unknown): Response {
  if (error instanceof AuthRequiredError) {
    return Response.json({ error: error.message }, { status: 501 });
  }
  if (error instanceof ForbiddenError) {
    return Response.json({ error: error.message }, { status: 403 });
  }
  throw error; // biarkan error lain naik ke error handler global
}
