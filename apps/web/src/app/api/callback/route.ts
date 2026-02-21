import { NextRequest, NextResponse } from 'next/server';
import * as oidcClient from 'openid-client';
import { getOidcConfig } from '@/lib/replit-auth';
import { findOrCreateOAuthUser, createSession, setSessionCookie } from '@/lib/auth';
import { queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const config = await getOidcConfig();

    const codeVerifier = request.cookies.get('oidc_code_verifier')?.value;
    const expectedState = request.cookies.get('oidc_state')?.value;

    if (!codeVerifier || !expectedState) {
      return NextResponse.redirect(new URL('/login?error=oidc_state', request.url));
    }

    const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || '';
    const currentUrl = new URL(request.url);
    currentUrl.protocol = 'https:';
    currentUrl.host = host;

    const tokens = await oidcClient.authorizationCodeGrant(
      config,
      currentUrl,
      {
        pkceCodeVerifier: codeVerifier,
        expectedState: expectedState,
      }
    );

    const claims = tokens.claims();

    if (!claims) {
      return NextResponse.redirect(new URL('/login?error=oidc_claims', request.url));
    }

    const sub = claims.sub as string;
    const email = (claims as Record<string, unknown>).email as string | undefined;
    const firstName = (claims as Record<string, unknown>).first_name as string | undefined;
    const lastName = (claims as Record<string, unknown>).last_name as string | undefined;
    const profileImage = (claims as Record<string, unknown>).profile_image_url as string | undefined;

    if (!email) {
      return NextResponse.redirect(new URL('/login?error=oidc_noemail', request.url));
    }

    const displayName = [firstName, lastName].filter(Boolean).join(' ') || undefined;

    const user = await findOrCreateOAuthUser(
      'replit',
      sub,
      email,
      displayName,
      profileImage
    );

    const token = await createSession(user.id);

    const hasOrg = await queryOne(
      'SELECT org_id FROM org_members WHERE user_id = $1 LIMIT 1',
      [user.id]
    );

    const redirectTo = hasOrg ? '/dashboard' : '/onboarding';
    const response = NextResponse.redirect(new URL(redirectTo, request.url));
    response.cookies.set(setSessionCookie(token));
    response.cookies.delete('oidc_code_verifier');
    response.cookies.delete('oidc_state');

    return response;
  } catch (err) {
    console.error('Replit OIDC callback error:', err);
    return NextResponse.redirect(new URL('/login?error=oidc_error', request.url));
  }
}
