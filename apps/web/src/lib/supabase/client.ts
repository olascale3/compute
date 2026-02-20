'use client';

import { createBrowserClient } from '@supabase/ssr';

let _client: ReturnType<typeof createBrowserClient> | null = null;
let _configured = false;

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url.startsWith('https://');
}

export function createClient() {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !url.startsWith('https://') || !key) {
    _configured = false;
    _client = createBrowserClient('https://localhost.invalid', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.placeholder');
    return _client;
  }

  _configured = true;
  _client = createBrowserClient(url, key);
  return _client;
}
