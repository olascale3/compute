import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSession, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await verifyCredentials(email, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await createSession(user.id);

    const response = NextResponse.json({ user: { id: user.id, email: user.email } });
    response.cookies.set(setSessionCookie(token));
    return response;
  } catch (err: unknown) {
    console.error('Login error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
