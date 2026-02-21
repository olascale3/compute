import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, getUserOrg } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await getUserOrg(user.id);
    if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });

    const budget = await queryOne(
      'SELECT * FROM budgets WHERE org_id = $1',
      [membership.org_id]
    );

    return NextResponse.json({ budget: budget ?? null });
  } catch (err) {
    console.error('Budgets GET error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await getUserOrg(user.id);
    if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });
    if (!['owner', 'admin'].includes(membership.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { monthly_limit_usd, alert_threshold_pct, alert_email } = body;

    const budget = await queryOne(
      `INSERT INTO budgets (org_id, monthly_limit_usd, alert_threshold_pct, alert_email)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (org_id) DO UPDATE SET
         monthly_limit_usd = EXCLUDED.monthly_limit_usd,
         alert_threshold_pct = EXCLUDED.alert_threshold_pct,
         alert_email = EXCLUDED.alert_email
       RETURNING *`,
      [membership.org_id, monthly_limit_usd, alert_threshold_pct ?? 80, alert_email ?? null]
    );

    return NextResponse.json({ budget });
  } catch (err) {
    console.error('Budgets POST error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to save budget' }, { status: 500 });
  }
}
