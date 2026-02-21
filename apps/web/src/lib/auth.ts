import { randomBytes, createHash } from 'crypto';
import bcrypt from 'bcryptjs';
import { query, queryOne } from './db';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'tc_session';
const SESSION_TTL_DAYS = 30;

interface User {
  id: string;
  email: string;
}

interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function createUser(email: string, password: string): Promise<User> {
  const hash = await bcrypt.hash(password, 12);
  const user = await queryOne<User>(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
    [email.toLowerCase().trim(), hash]
  );
  if (!user) throw new Error('Failed to create user');
  return user;
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const row = await queryOne<{ id: string; email: string; password_hash: string }>(
    'SELECT id, email, password_hash FROM users WHERE email = $1',
    [email.toLowerCase().trim()]
  );
  if (!row) return null;
  const valid = await bcrypt.compare(password, row.password_hash);
  if (!valid) return null;
  return { id: row.id, email: row.email };
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString('base64url');
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await query(
    'INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, tokenHash, expiresAt.toISOString()]
  );

  return token;
}

export async function destroySession(token: string): Promise<void> {
  const tokenHash = hashToken(token);
  await query('DELETE FROM sessions WHERE token = $1', [tokenHash]);
}

export async function getSessionUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE);
    if (!sessionCookie?.value) return null;

    const tokenHash = hashToken(sessionCookie.value);
    const row = await queryOne<{ user_id: string; email: string; expires_at: Date }>(
      `SELECT s.user_id, u.email, s.expires_at
       FROM sessions s JOIN users u ON s.user_id = u.id
       WHERE s.token = $1 AND s.expires_at > NOW()`,
      [tokenHash]
    );

    if (!row) return null;
    return { id: row.user_id, email: row.email };
  } catch {
    return null;
  }
}

export async function getSessionUserFromToken(token: string): Promise<User | null> {
  const tokenHash = hashToken(token);
  const row = await queryOne<{ user_id: string; email: string }>(
    `SELECT s.user_id, u.email
     FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.token = $1 AND s.expires_at > NOW()`,
    [tokenHash]
  );
  if (!row) return null;
  return { id: row.user_id, email: row.email };
}

export function setSessionCookie(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
  };
}

export async function getUserOrg(userId: string) {
  return queryOne<{ org_id: string; role: string; org_name: string; plan: string }>(
    `SELECT om.org_id, om.role, o.name as org_name, o.plan
     FROM org_members om JOIN organizations o ON om.org_id = o.id
     WHERE om.user_id = $1
     LIMIT 1`,
    [userId]
  );
}

export async function cleanExpiredSessions(): Promise<void> {
  await query('DELETE FROM sessions WHERE expires_at < NOW()');
}
