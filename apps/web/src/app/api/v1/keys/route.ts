import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateApiKey } from '@/lib/api-key';

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

async function getUserOrg(userId: string) {
  const admin = createAdminClient();
  const { data } = await admin
    .from('org_members')
    .select('org_id, role')
    .eq('user_id', userId)
    .single();
  return data;
}

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let membership;
  try {
    membership = await getUserOrg(user.id);
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
  if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });

  let admin;
  try {
    admin = createAdminClient();
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
  const { data: keys } = await admin
    .from('api_keys')
    .select('id, name, key_prefix, last_used_at, revoked_at, created_at')
    .eq('org_id', membership.org_id)
    .order('created_at', { ascending: false });

  return NextResponse.json({ keys: keys ?? [] });
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let membership;
  try {
    membership = await getUserOrg(user.id);
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
  if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });
  if (!['owner', 'admin'].includes(membership.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  const body = await request.json();
  const name = body.name || 'Untitled';

  const { fullKey, prefix, hash } = generateApiKey();
  let admin;
  try {
    admin = createAdminClient();
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const { error } = await admin.from('api_keys').insert({
    org_id: membership.org_id,
    name,
    key_prefix: prefix,
    key_hash: hash,
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }

  return NextResponse.json({ apiKey: fullKey, prefix, name });
}

export async function DELETE(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let membership;
  try {
    membership = await getUserOrg(user.id);
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
  if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });
  if (!['owner', 'admin'].includes(membership.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const keyId = searchParams.get('id');
  if (!keyId) return NextResponse.json({ error: 'Key ID required' }, { status: 400 });

  let admin;
  try {
    admin = createAdminClient();
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
  const { error } = await admin
    .from('api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', keyId)
    .eq('org_id', membership.org_id);

  if (error) {
    return NextResponse.json({ error: 'Failed to revoke key' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
