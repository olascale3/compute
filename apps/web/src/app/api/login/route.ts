import { NextRequest, NextResponse } from 'next/server';
import * as oidcClient from 'openid-client';
import { getOidcConfig } from '@/lib/replit-auth';

export async function GET(request: NextRequest) {
  try {
    const config = await getOidcConfig();

    const codeVerifier = oidcClient.randomPKCECodeVerifier();
    const codeChallenge = await oidcClient.calculatePKCECodeChallenge(codeVerifier);
    const state = oidcClient.randomState();

    const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || '';
    const callbackUrl = `https://${host}/api/callback`;

    const authUrl = oidcClient.buildAuthorizationUrl(config, {
      redirect_uri: callbackUrl,
      scope: 'openid email profile',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state,
      prompt: 'login consent',
    });

    const response = NextResponse.redirect(authUrl.href);

    const isSecure = process.env.NODE_ENV === 'production';

    response.cookies.set('oidc_code_verifier', codeVerifier, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 600,
    });

    response.cookies.set('oidc_state', state, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 600,
    });

    return response;
  } catch (err) {
    console.error('Replit login error:', err);
    return NextResponse.redirect(new URL('/login?error=oidc_error', request.url));
  }
}
