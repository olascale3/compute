import { randomBytes, createHash } from 'crypto';

export function generateApiKey(): { fullKey: string; prefix: string; hash: string } {
  const raw = randomBytes(32).toString('base64url');
  const fullKey = `tc_live_${raw}`;
  const prefix = `tc_live_${raw.slice(0, 8)}...`;
  const hash = createHash('sha256').update(fullKey).digest('hex');
  return { fullKey, prefix, hash };
}

export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}
