import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateApiKey } from '@/lib/api-key';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, slug } = body;

  if (!name || !slug) {
    return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
  }

  const admin = createAdminClient();

  // Check if user already has an org
  const { data: existing } = await admin
    .from('org_members')
    .select('org_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'You already have an organization' }, { status: 400 });
  }

  // Create org
  const { data: org, error: orgError } = await admin
    .from('organizations')
    .insert({ name, slug })
    .select()
    .single();

  if (orgError) {
    if (orgError.code === '23505') {
      return NextResponse.json({ error: 'Organization slug already taken' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 });
  }

  // Create membership
  await admin.from('org_members').insert({
    org_id: org.id,
    user_id: user.id,
    role: 'owner',
  });

  // Generate API key
  const { fullKey, prefix, hash } = generateApiKey();
  await admin.from('api_keys').insert({
    org_id: org.id,
    name: 'Default',
    key_prefix: prefix,
    key_hash: hash,
  });

  return NextResponse.json({ orgId: org.id, apiKey: fullKey });
}
