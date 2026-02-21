import { NextRequest, NextResponse } from 'next/server';
import { createUser, createSession, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const user = await createUser(email, password);
    const token = await createSession(user.id);

    const response = NextResponse.json({ user: { id: user.id, email: user.email } });
    response.cookies.set(setSessionCookie(token));
    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.includes('duplicate key') || message.includes('unique constraint')) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }
    console.error('Signup error:', message);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
