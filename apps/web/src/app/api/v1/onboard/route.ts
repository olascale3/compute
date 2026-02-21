import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, getUserOrg } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { generateApiKey } from '@/lib/api-key';

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await getUserOrg(user.id);
    if (existing) {
      return NextResponse.json({ error: 'You already have an organization' }, { status: 400 });
    }

    const body = await request.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const org = await queryOne<{ id: string }>(
      'INSERT INTO organizations (name, slug) VALUES ($1, $2) RETURNING id',
      [name, slug]
    );

    if (!org) {
      return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 });
    }

    await query(
      'INSERT INTO org_members (org_id, user_id, role) VALUES ($1, $2, $3)',
      [org.id, user.id, 'owner']
    );

    const { fullKey, prefix, hash } = generateApiKey();
    await query(
      'INSERT INTO api_keys (org_id, name, key_prefix, key_hash) VALUES ($1, $2, $3, $4)',
      [org.id, 'Default', prefix, hash]
    );

    return NextResponse.json({ orgId: org.id, apiKey: fullKey });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.includes('unique constraint') || message.includes('duplicate key')) {
      return NextResponse.json({ error: 'Organization slug already taken' }, { status: 409 });
    }
    console.error('Onboard error:', message);
    return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 });
  }
}
