import { NextRequest, NextResponse } from 'next/server';
import { hashApiKey } from '@/lib/api-key';
import { calculateCost } from '@/lib/pricing/calculator';
import { rateLimit } from '@/lib/rate-limit';
import { query, queryOne } from '@/lib/db';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer tc_live_')) {
    return NextResponse.json({ error: 'Invalid API key format' }, { status: 401 });
  }

  const apiKey = authHeader.slice(7);
  const keyHash = hashApiKey(apiKey);

  try {
    const keyRecord = await queryOne<{ id: string; org_id: string }>(
      'SELECT id, org_id FROM api_keys WHERE key_hash = $1 AND revoked_at IS NULL',
      [keyHash]
    );

    if (!keyRecord) {
      return NextResponse.json({ error: 'Invalid or revoked API key' }, { status: 401 });
    }

    const org = await queryOne<{ plan: string }>(
      'SELECT plan FROM organizations WHERE id = $1',
      [keyRecord.org_id]
    );

    const rateLimitResult = rateLimit(keyRecord.org_id, org?.plan ?? 'free');
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', remaining: rateLimitResult.remaining },
        { status: 429 }
      );
    }

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

    for (const event of rawEvents) {
      const provider = String(event.provider || 'unknown');
      const model = String(event.model || 'unknown');
      const inputTokens = Number(event.input_tokens) || 0;
      const outputTokens = Number(event.output_tokens) || 0;
      const cost = calculateCost(provider, model, inputTokens, outputTokens);

      await query(
        `INSERT INTO events (org_id, api_key_id, provider, model, input_tokens, output_tokens, cost_usd, latency_ms, status_code, metadata, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          keyRecord.org_id,
          keyRecord.id,
          provider,
          model,
          inputTokens,
          outputTokens,
          cost,
          Number(event.latency_ms) || null,
          Number(event.status_code) || null,
          JSON.stringify(event.metadata ?? {}),
          event.timestamp || new Date().toISOString(),
        ]
      );
    }

    query('UPDATE api_keys SET last_used_at = NOW() WHERE id = $1', [keyRecord.id]).catch(() => {});

    return NextResponse.json({ accepted: rawEvents.length }, { status: 202 });
  } catch (err) {
    console.error('Events error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
