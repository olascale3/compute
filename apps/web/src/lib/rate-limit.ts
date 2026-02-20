const windows = new Map<string, { count: number; resetAt: number }>();

const LIMITS: Record<string, number> = {
  free: 1000,
  pro: 10000,
  enterprise: 100000,
};

export function rateLimit(
  orgId: string,
  plan = 'free'
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const window = windows.get(orgId);
  const limit = LIMITS[plan] ?? LIMITS.free;

  if (!window || now > window.resetAt) {
    windows.set(orgId, { count: 1, resetAt: now + 60_000 });
    return { allowed: true, remaining: limit - 1 };
  }

  window.count++;
  return {
    allowed: window.count <= limit,
    remaining: Math.max(0, limit - window.count),
  };
}
