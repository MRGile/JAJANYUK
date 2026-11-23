import { clearSessionCookie } from '@/lib/auth/session';

export async function POST() {
  const response = Response.json({ data: { signedOut: true } });
  response.headers.append('Set-Cookie', clearSessionCookie());
  return response;
}
