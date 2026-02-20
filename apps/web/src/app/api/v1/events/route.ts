import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { hashApiKey } from '@/lib/api-key';
import { calculateCost } from '@/lib/pricing/calculator';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // 1. Extract API key
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer tc_live_')) {
    return NextResponse.json({ error: 'Invalid API key format' }, { status: 401 });
  }

  const apiKey = authHeader.slice(7);
  const keyHash = hashApiKey(apiKey);

  const admin = createAdminClient();

  // 2. Validate API key
  const { data: keyRecord } = await admin
    .from('api_keys')
    .select('id, org_id, revoked_at')
    .eq('key_hash', keyHash)
    .is('revoked_at', null)
    .single();

  if (!keyRecord) {
    return NextResponse.json({ error: 'Invalid or revoked API key' }, { status: 401 });
  }

  // 3. Rate limit
  const { data: org } = await admin
    .from('organizations')
    .select('plan')
    .eq('id', keyRecord.org_id)
    .single();

  const rateLimitResult = rateLimit(keyRecord.org_id, org?.plan ?? 'free');
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', remaining: rateLimitResult.remaining },
      { status: 429 }
    );
  }

  // 4. Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const rawEvents = Array.isArray(body.events) ? body.events : [body];

  if (rawEvents.length === 0) {
    return NextResponse.json({ error: 'No events provided' }, { status: 400 });
  }

  if (rawEvents.length > 100) {
    return NextResponse.json({ error: 'Maximum 100 events per batch' }, { status: 400 });
  }

  // 5. Enrich and validate events
  const enrichedEvents = rawEvents.map((event: Record<string, unknown>) => {
    const provider = String(event.provider || 'unknown');
    const model = String(event.model || 'unknown');
    const inputTokens = Number(event.input_tokens) || 0;
    const outputTokens = Number(event.output_tokens) || 0;
    const cost = calculateCost(provider, model, inputTokens, outputTokens);

    return {
      org_id: keyRecord.org_id,
      api_key_id: keyRecord.id,
      provider,
      model,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost_usd: cost,
      latency_ms: Number(event.latency_ms) || null,
      status_code: Number(event.status_code) || null,
      metadata: (event.metadata as Record<string, unknown>) ?? {},
      created_at: (event.timestamp as string) || new Date().toISOString(),
    };
  });

  // 6. Batch insert
  const { error } = await admin.from('events').insert(enrichedEvents);
  if (error) {
    console.error('Event insert error:', error);
    return NextResponse.json({ error: 'Failed to store events' }, { status: 500 });
  }

  // 7. Update last_used_at (fire-and-forget)
  admin
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', keyRecord.id)
    .then(() => {});

  return NextResponse.json({ accepted: enrichedEvents.length }, { status: 202 });
}
