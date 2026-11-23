import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { verifyPassword } from '@/lib/auth/password';
import { createSessionToken, serializeSessionCookie } from '@/lib/auth/session';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Body JSON tidak valid.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });
  }
  const { email, password } = body as { email?: unknown; password?: unknown };
  if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
    return Response.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });
  }

  try {
    const [user] = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      passwordHash: users.password_hash,
    }).from(users).where(eq(users.email, email.trim().toLowerCase())).limit(1);

    if (!user?.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
      return Response.json({ error: 'Email atau password salah.' }, { status: 401 });
    }

    const response = Response.json({
      data: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
    response.headers.append('Set-Cookie', serializeSessionCookie(createSessionToken(user.id)));
    return response;
  } catch (error) {
    console.error('POST /api/auth/login failed:', error);
    return Response.json({ error: 'Login gagal. Periksa konfigurasi server.' }, { status: 500 });
  }
}
