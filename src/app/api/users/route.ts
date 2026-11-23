import { desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { handleAccessError, requireRole } from '@/lib/auth/access';

export async function GET(request: Request) {
  try {
    await requireRole(request, 'admin');
    const data = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      phone: users.phone,
      createdAt: users.created_at,
    }).from(users).orderBy(desc(users.created_at)).limit(100);

    return Response.json({ data });
  } catch (error) {
    const accessError = handleAccessError(error);
    return accessError;
  }
}
