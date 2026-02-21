import { NextRequest, NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const origin = new URL(request.url).origin;
  const sessionCookie = request.cookies.get('tc_session');

  if (sessionCookie?.value) {
    try {
      await destroySession(sessionCookie.value);
    } catch {}
  }

  const response = NextResponse.redirect(`${origin}/login`);
  response.cookies.set('tc_session', '', { maxAge: 0, path: '/' });
  return response;
}
