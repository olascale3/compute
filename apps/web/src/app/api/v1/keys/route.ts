import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, getUserOrg } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { generateApiKey } from '@/lib/api-key';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await getUserOrg(user.id);
    if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });

    const keys = await query(
      `SELECT id, name, key_prefix, last_used_at, revoked_at, created_at
       FROM api_keys WHERE org_id = $1 ORDER BY created_at DESC`,
      [membership.org_id]
    );

    return NextResponse.json({ keys });
  } catch (err) {
    console.error('Keys GET error:', err instanceof Error ? err.message : err);
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
    const name = body.name || 'Untitled';

    const { fullKey, prefix, hash } = generateApiKey();

    await query(
      'INSERT INTO api_keys (org_id, name, key_prefix, key_hash) VALUES ($1, $2, $3, $4)',
      [membership.org_id, name, prefix, hash]
    );

    return NextResponse.json({ apiKey: fullKey, prefix, name });
  } catch (err) {
    console.error('Keys POST error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await getUserOrg(user.id);
    if (!membership) return NextResponse.json({ error: 'No organization' }, { status: 404 });
    if (!['owner', 'admin'].includes(membership.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const keyId = searchParams.get('id');
    if (!keyId) return NextResponse.json({ error: 'Key ID required' }, { status: 400 });

    await query(
      'UPDATE api_keys SET revoked_at = NOW() WHERE id = $1 AND org_id = $2',
      [keyId, membership.org_id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Keys DELETE error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to revoke key' }, { status: 500 });
  }
}
