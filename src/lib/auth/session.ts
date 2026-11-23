import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'jajan_yuk_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must be set to a random value of at least 32 characters.');
  }
  return secret;
}

function sign(payload: string) {
  return createHmac('sha256', getAuthSecret()).update(payload).digest('base64url');
}

export function createSessionToken(userId: number) {
  const payload = Buffer.from(JSON.stringify({
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  })).toString('base64url');

  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string) {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  try {
    const expected = Buffer.from(sign(payload));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

    const decoded: unknown = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!decoded || typeof decoded !== 'object') return null;
    const session = decoded as { sub?: unknown; exp?: unknown };
    if (!Number.isInteger(session.sub) || !Number.isInteger(session.exp)) return null;
    if ((session.exp as number) <= Math.floor(Date.now() / 1000)) return null;
    return { userId: session.sub as number };
  } catch {
    return null;
  }
}

export function serializeSessionCookie(token: string) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure}`;
}

export function clearSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}
