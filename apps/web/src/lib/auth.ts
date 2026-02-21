import { randomBytes, createHash } from 'crypto';
import bcrypt from 'bcryptjs';
import { query, queryOne } from './db';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'tc_session';
const SESSION_TTL_DAYS = 30;

interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  provider?: string;
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

export async function findOrCreateOAuthUser(
  provider: string,
  providerId: string,
  email: string,
  name?: string,
  avatarUrl?: string
): Promise<User> {
  const existing = await queryOne<User>(
    'SELECT id, email, name, avatar_url, provider FROM users WHERE provider = $1 AND provider_id = $2',
    [provider, providerId]
  );
  if (existing) return existing;

  const byEmail = await queryOne<User>(
    'SELECT id, email, name, avatar_url, provider FROM users WHERE email = $1',
    [email.toLowerCase().trim()]
  );
  if (byEmail) {
    await query(
      'UPDATE users SET provider = $1, provider_id = $2, name = COALESCE($3, name), avatar_url = COALESCE($4, avatar_url) WHERE id = $5',
      [provider, providerId, name || null, avatarUrl || null, byEmail.id]
    );
    return { ...byEmail, provider, name: name || byEmail.name, avatar_url: avatarUrl || byEmail.avatar_url };
  }

  const user = await queryOne<User>(
    'INSERT INTO users (email, provider, provider_id, name, avatar_url) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, avatar_url, provider',
    [email.toLowerCase().trim(), provider, providerId, name || null, avatarUrl || null]
  );
  if (!user) throw new Error('Failed to create OAuth user');
  return user;
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const row = await queryOne<{ id: string; email: string; password_hash: string | null }>(
    'SELECT id, email, password_hash FROM users WHERE email = $1',
    [email.toLowerCase().trim()]
  );
  if (!row || !row.password_hash) return null;
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
