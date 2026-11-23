import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { handleAccessError, requireAuth } from '@/lib/auth/access';

export async function GET(request: Request) {
  try {
    const currentUser = await requireAuth(request);
    const [user] = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      phone: users.phone,
      avatarUrl: users.avatar_url,
    }).from(users).where(eq(users.id, currentUser.id)).limit(1);

    if (!user) return Response.json({ error: 'User tidak ditemukan.' }, { status: 404 });
    return Response.json({ data: user });
  } catch (error) {
    const accessError = handleAccessError(error);
    return accessError;
  }
}

export async function PATCH(request: Request) {
  try {
    const currentUser = await requireAuth(request);
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Body tidak valid.' }, { status: 400 });
    }

    const input = body as { name?: unknown; phone?: unknown; avatarUrl?: unknown };
    const values: { name?: string; phone?: string | null; avatar_url?: string | null } = {};
    if (input.name !== undefined) {
      if (typeof input.name !== 'string' || input.name.trim().length < 1 || input.name.trim().length > 255) {
        return Response.json({ error: 'Nama tidak valid.' }, { status: 400 });
      }
      values.name = input.name.trim();
    }
    if (input.phone !== undefined) {
      if (input.phone !== null && (typeof input.phone !== 'string' || input.phone.length > 20)) {
        return Response.json({ error: 'Nomor telepon tidak valid.' }, { status: 400 });
      }
      values.phone = input.phone as string | null;
    }
    if (input.avatarUrl !== undefined) {
      if (input.avatarUrl !== null && (typeof input.avatarUrl !== 'string' || input.avatarUrl.length > 2048)) {
        return Response.json({ error: 'URL avatar tidak valid.' }, { status: 400 });
      }
      values.avatar_url = input.avatarUrl as string | null;
    }
    if (Object.keys(values).length === 0) {
      return Response.json({ error: 'Tidak ada perubahan untuk disimpan.' }, { status: 400 });
    }

    await db.update(users).set(values).where(eq(users.id, currentUser.id));
    return GET(request);
  } catch (error) {
    if (error instanceof SyntaxError) return Response.json({ error: 'Body JSON tidak valid.' }, { status: 400 });
    const accessError = handleAccessError(error);
    return accessError;
  }
}
