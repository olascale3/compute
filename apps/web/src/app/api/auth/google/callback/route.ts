import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateOAuthUser, createSession, setSessionCookie } from '@/lib/auth';
import { queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(new URL('/login?error=oauth_denied', request.url));
    }

    if (!code || !state) {
      return NextResponse.redirect(new URL('/login?error=oauth_invalid', request.url));
    }

    const savedState = request.cookies.get('oauth_state')?.value;
    if (!savedState || savedState !== state) {
      return NextResponse.redirect(new URL('/login?error=oauth_state', request.url));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return NextResponse.redirect(new URL('/login?error=oauth_config', request.url));
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${request.headers.get('host')}`;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      console.error('Google token exchange failed:', await tokenRes.text());
      return NextResponse.redirect(new URL('/login?error=oauth_token', request.url));
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userInfoRes.ok) {
      return NextResponse.redirect(new URL('/login?error=oauth_userinfo', request.url));
    }

    const googleUser = await userInfoRes.json();

    if (!googleUser.email || !googleUser.verified_email) {
      return NextResponse.redirect(new URL('/login?error=oauth_noemail', request.url));
    }

    const user = await findOrCreateOAuthUser(
      'google',
      googleUser.id,
      googleUser.email,
      googleUser.name,
      googleUser.picture
    );

    const token = await createSession(user.id);

    const hasOrg = await queryOne(
      'SELECT org_id FROM org_members WHERE user_id = $1 LIMIT 1',
      [user.id]
    );

    const redirectTo = hasOrg ? '/dashboard' : '/onboarding';
    const response = NextResponse.redirect(new URL(redirectTo, request.url));
    response.cookies.set(setSessionCookie(token));
    response.cookies.delete('oauth_state');

    return response;
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return NextResponse.redirect(new URL('/login?error=oauth_error', request.url));
  }
}
