import { NextRequest, NextResponse } from 'next/server';
import * as oidcClient from 'openid-client';
import { getOidcConfig } from '@/lib/replit-auth';
import { destroySession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('tc_session')?.value;
    if (sessionToken) {
      await destroySession(sessionToken);
    }

    const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || '';
    const postLogoutUri = `https://${host}`;

    let logoutUrl: string;
    try {
      const config = await getOidcConfig();
      const endSessionUrl = oidcClient.buildEndSessionUrl(config, {
        client_id: process.env.REPL_ID!,
        post_logout_redirect_uri: postLogoutUri,
      });
      logoutUrl = endSessionUrl.href;
    } catch {
      logoutUrl = '/';
    }

    const response = NextResponse.redirect(logoutUrl);
    response.cookies.delete('tc_session');

    return response;
  } catch (err) {
    console.error('Logout error:', err);
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('tc_session');
    return response;
  }
}
