import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, getUserOrg } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await getUserOrg(user.id);
    if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });

    const orgId = membership.org_id;
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view') || 'overview';
    const days = Math.min(Math.max(parseInt(searchParams.get('days') || '30') || 30, 1), 365);

    if (view === 'overview') {
      const todaySpendRow = await queryOne<{ total: string }>(
        `SELECT COALESCE(SUM(cost_usd), 0) as total FROM events WHERE org_id = $1 AND created_at >= date_trunc('day', NOW())`,
        [orgId]
      );
      const monthSpendRow = await queryOne<{ total: string }>(
        `SELECT COALESCE(SUM(cost_usd), 0) as total FROM events WHERE org_id = $1 AND created_at >= date_trunc('month', NOW())`,
        [orgId]
      );
      const monthQueriesRow = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM events WHERE org_id = $1 AND created_at >= date_trunc('month', NOW())`,
        [orgId]
      );
      const dailySpend = await query<{ day: string; total: string }>(
        `SELECT date_trunc('day', created_at)::date as day, SUM(cost_usd) as total
         FROM events WHERE org_id = $1 AND created_at >= NOW() - ($2 || ' days')::interval
         GROUP BY day ORDER BY day`,
        [orgId, String(days)]
      );
      const providerBreakdown = await query<{ provider: string; total: string; count: string }>(
        `SELECT provider, SUM(cost_usd) as total, COUNT(*) as count
         FROM events WHERE org_id = $1 AND created_at >= date_trunc('month', NOW())
         GROUP BY provider ORDER BY total DESC`,
        [orgId]
      );

      return NextResponse.json({
        todaySpend: Number(todaySpendRow?.total ?? 0),
        monthSpend: Number(monthSpendRow?.total ?? 0),
        monthQueries: Number(monthQueriesRow?.count ?? 0),
        dailySpend: dailySpend.map(d => ({ day: d.day, total: Number(d.total) })),
        providerBreakdown: providerBreakdown.map(p => ({ provider: p.provider, total: Number(p.total), count: Number(p.count) })),
      });
    }

    if (view === 'providers') {
      const providers = await query<{ provider: string; total: string; count: string }>(
        `SELECT provider, SUM(cost_usd) as total, COUNT(*) as count
         FROM events WHERE org_id = $1 AND created_at >= NOW() - ($2 || ' days')::interval
         GROUP BY provider ORDER BY total DESC`,
        [orgId, String(days)]
      );
      return NextResponse.json({ providers: providers.map(p => ({ provider: p.provider, total: Number(p.total), count: Number(p.count) })) });
    }

    if (view === 'models') {
      const models = await query<{ provider: string; model: string; total: string; count: string }>(
        `SELECT provider, model, SUM(cost_usd) as total, COUNT(*) as count
         FROM events WHERE org_id = $1 AND created_at >= NOW() - ($2 || ' days')::interval
         GROUP BY provider, model ORDER BY total DESC`,
        [orgId, String(days)]
      );
      return NextResponse.json({ models: models.map(m => ({ provider: m.provider, model: m.model, total: Number(m.total), count: Number(m.count) })) });
    }

    if (view === 'queries') {
      const page = parseInt(searchParams.get('page') || '0');
      const limit = 50;
      const events = await query(
        `SELECT * FROM events WHERE org_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
        [orgId, limit, page * limit]
      );
      const countRow = await queryOne<{ count: string }>(
        'SELECT COUNT(*) as count FROM events WHERE org_id = $1',
        [orgId]
      );
      return NextResponse.json({ queries: events, total: Number(countRow?.count ?? 0), page, limit });
    }

    return NextResponse.json({ error: 'Invalid view' }, { status: 400 });
  } catch (err) {
    console.error('Usage error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
