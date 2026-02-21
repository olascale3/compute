import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateOAuthUser, createSession, setSessionCookie } from '@/lib/auth';
import { queryOne } from '@/lib/db';

interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

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

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return NextResponse.redirect(new URL('/login?error=oauth_config', request.url));
    }

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL('/login?error=oauth_token', request.url));
    }

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
      console.error('GitHub token error:', tokenData.error_description);
      return NextResponse.redirect(new URL('/login?error=oauth_token', request.url));
    }

    const accessToken = tokenData.access_token;

    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/vnd.github+json' },
    });
    if (!userRes.ok) {
      return NextResponse.redirect(new URL('/login?error=oauth_userinfo', request.url));
    }
    const ghUser = await userRes.json();

    let email = ghUser.email;
    if (!email) {
      const emailsRes = await fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/vnd.github+json' },
      });
      if (emailsRes.ok) {
        const emails: GitHubEmail[] = await emailsRes.json();
        const primary = emails.find((e) => e.primary && e.verified);
        email = primary?.email || emails.find((e) => e.verified)?.email;
      }
    }

    if (!email) {
      return NextResponse.redirect(new URL('/login?error=oauth_noemail', request.url));
    }

    const user = await findOrCreateOAuthUser(
      'github',
      String(ghUser.id),
      email,
      ghUser.name || ghUser.login,
      ghUser.avatar_url
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
    console.error('GitHub OAuth callback error:', err);
    return NextResponse.redirect(new URL('/login?error=oauth_error', request.url));
  }
}
