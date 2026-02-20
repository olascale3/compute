import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';

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

export async function GET() {
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

  const { data: budget } = await admin
    .from('budgets')
    .select('*')
    .eq('org_id', membership.org_id)
    .single();

  return NextResponse.json({ budget: budget ?? null });
}

export async function POST(request: NextRequest) {
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
    .select('org_id, role')
    .eq('user_id', user.id)
    .single();

  if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });
  if (!['owner', 'admin'].includes(membership.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  const body = await request.json();
  const { monthly_limit_usd, alert_threshold_pct, alert_email } = body;

  const { data, error } = await admin
    .from('budgets')
    .upsert(
      {
        org_id: membership.org_id,
        monthly_limit_usd,
        alert_threshold_pct: alert_threshold_pct ?? 80,
        alert_email: alert_email ?? null,
      },
      { onConflict: 'org_id' }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to save budget' }, { status: 500 });
  }

  return NextResponse.json({ budget: data });
}
