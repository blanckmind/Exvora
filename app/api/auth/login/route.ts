import { NextRequest, NextResponse } from 'next/server';
import { getSrmConfig, getSrmConfigReport } from '@/lib/srm/config';
import { createOidcAuthSession, buildSrmAuthorizationUrl } from '@/lib/srm/oidc';
import { setOidcTransientCookies } from '@/lib/auth/session';

export async function GET(req: NextRequest) {
  try {
    const authMode = process.env.AUTH_MODE === 'srm' ? 'srm' : 'mock';

    if (authMode === 'mock') {
      // In mock development mode, redirect user to the mock student selection portal
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('mode', 'mock');
      return NextResponse.redirect(loginUrl);
    }

    // SRM Production Mode
    const report = getSrmConfigReport();
    if (!report.isReadyForSrmProduction) {
      // Critical Zero-Assumption Rule: Never fabricate or guess missing endpoints
      const errorUrl = new URL('/auth/error', req.url);
      errorUrl.searchParams.set('error', 'configuration_missing');
      return NextResponse.redirect(errorUrl);
    }

    const config = getSrmConfig();
    const oidcSession = createOidcAuthSession();
    const authorizationUrl = buildSrmAuthorizationUrl(config, oidcSession);

    const response = NextResponse.redirect(authorizationUrl);

    // Save state, nonce, and PKCE verifier securely in HttpOnly cookies
    setOidcTransientCookies(
      response,
      oidcSession.state,
      oidcSession.nonce,
      oidcSession.codeVerifier
    );

    return response;
  } catch (error: any) {
    console.error('[Auth Login Error]:', error?.message || error);
    const errorUrl = new URL('/auth/error', req.url);
    errorUrl.searchParams.set('error', 'auth_init_failed');
    return NextResponse.redirect(errorUrl);
  }
}
