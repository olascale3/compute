import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { startOfDay, startOfMonth, subDays } from 'date-fns';

async function getAuthUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseUrl.startsWith('https://') || !supabaseKey) {
    return null;
  }
  const cookieStore = await cookies();
  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
        },
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function GET(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let admin;
  try {
    admin = createAdminClient();
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const { data: membership } = await admin
    .from('org_members')
    .select('org_id')
    .eq('user_id', user.id)
    .single();

  if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });

  const orgId = membership.org_id;
  const { searchParams } = new URL(request.url);
  const view = searchParams.get('view') || 'overview';
  const days = parseInt(searchParams.get('days') || '30');
  const since = subDays(new Date(), days).toISOString();

  if (view === 'overview') {
    const now = new Date();
    const todayStart = startOfDay(now).toISOString();
    const monthStart = startOfMonth(now).toISOString();

    const [todayRes, monthRes, countRes, dailyRes, providerRes] = await Promise.all([
      admin.from('events').select('cost_usd').eq('org_id', orgId).gte('created_at', todayStart),
      admin.from('events').select('cost_usd').eq('org_id', orgId).gte('created_at', monthStart),
      admin.from('events').select('id', { count: 'exact', head: true }).eq('org_id', orgId).gte('created_at', monthStart),
      admin.rpc('get_daily_spend', { p_org_id: orgId, p_since: since }),
      admin.rpc('get_provider_breakdown', { p_org_id: orgId, p_since: monthStart }),
    ]);

    const todaySpend = (todayRes.data ?? []).reduce((sum: number, e: { cost_usd: number }) => sum + Number(e.cost_usd), 0);
    const monthSpend = (monthRes.data ?? []).reduce((sum: number, e: { cost_usd: number }) => sum + Number(e.cost_usd), 0);

    return NextResponse.json({
      todaySpend,
      monthSpend,
      monthQueries: countRes.count ?? 0,
      dailySpend: dailyRes.data ?? [],
      providerBreakdown: providerRes.data ?? [],
    });
  }

  if (view === 'providers') {
    const { data } = await admin.rpc('get_provider_breakdown', { p_org_id: orgId, p_since: since });
    return NextResponse.json({ providers: data ?? [] });
  }

  if (view === 'models') {
    const { data } = await admin.rpc('get_model_breakdown', { p_org_id: orgId, p_since: since });
    return NextResponse.json({ models: data ?? [] });
  }

  if (view === 'queries') {
    const page = parseInt(searchParams.get('page') || '0');
    const limit = 50;
    const { data, count } = await admin
      .from('events')
      .select('*', { count: 'exact' })
      .eq('org_id', orgId)
      .order('created_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1);

    return NextResponse.json({ queries: data ?? [], total: count ?? 0, page, limit });
  }

  return NextResponse.json({ error: 'Invalid view' }, { status: 400 });
}
