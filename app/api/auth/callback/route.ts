import { NextRequest, NextResponse } from 'next/server';
import { getSrmConfig } from '@/lib/srm/config';
import {
  exchangeCodeForTokens,
  validateIdToken,
  fetchUserInfo,
  VerifiedSrmIdentity,
} from '@/lib/srm/oidc';
import {
  getOidcTransientCookies,
  clearOidcTransientCookies,
  createSessionToken,
  setSessionCookie,
} from '@/lib/auth/session';
import { UsersDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // Handle IdP returned cancellation or access rejection
  if (error) {
    const errorUrl = new URL('/auth/error', req.url);
    errorUrl.searchParams.set('error', error === 'access_denied' ? 'cancelled' : 'idp_error');
    return NextResponse.redirect(errorUrl);
  }

  if (!code || !state) {
    const errorUrl = new URL('/auth/error', req.url);
    errorUrl.searchParams.set('error', 'invalid_callback');
    return NextResponse.redirect(errorUrl);
  }

  const { state: storedState, nonce: storedNonce, codeVerifier } = await getOidcTransientCookies();

  // Validate CSRF state
  if (!storedState || storedState !== state) {
    const errorUrl = new URL('/auth/error', req.url);
    errorUrl.searchParams.set('error', 'state_mismatch');
    return NextResponse.redirect(errorUrl);
  }

  if (!storedNonce || !codeVerifier) {
    const errorUrl = new URL('/auth/error', req.url);
    errorUrl.searchParams.set('error', 'session_expired');
    return NextResponse.redirect(errorUrl);
  }

  try {
    const config = getSrmConfig();

    // 1. Exchange authorization code for token response
    const tokenResponse = await exchangeCodeForTokens(config, code, codeVerifier);

    if (!tokenResponse.id_token && !tokenResponse.access_token) {
      throw new Error('No ID token or access token received from SRM token endpoint.');
    }

    let identity: VerifiedSrmIdentity;

    if (tokenResponse.id_token) {
      // 2. Validate cryptographic ID token and assert nonce/claims
      identity = await validateIdToken(tokenResponse.id_token, config, storedNonce);
    } else {
      // If access token only and userinfo endpoint configured
      if (!config.userinfoUrl || !tokenResponse.access_token) {
        throw new Error('Missing ID token and no userinfo endpoint available to verify student identity.');
      }
      const userinfo = await fetchUserInfo(config.userinfoUrl, tokenResponse.access_token);
      const srmSubjectId = userinfo.sub || userinfo.id || userinfo.student_id;
      if (!srmSubjectId) {
        throw new Error('SRM UserInfo response missing stable subject identifier (sub).');
      }
      identity = {
        srmSubjectId: String(srmSubjectId),
        email: userinfo.email || userinfo.mail,
        name: userinfo.name || userinfo.display_name,
        department: userinfo.department || userinfo.dept,
        year: userinfo.year || userinfo.batch,
        rawClaims: userinfo,
      };
    }

    // 3. Upsert user in Exvora application database (independent of SRM DB)
    const exvoraUser = await UsersDB.upsertFromSrmIdentity(identity);

    // 4. Create secure application session
    const sessionJwt = await createSessionToken({
      id: exvoraUser.id,
      srmSubjectId: exvoraUser.srm_subject_id,
      email: exvoraUser.email,
      name: exvoraUser.name,
      department: exvoraUser.department,
      year: exvoraUser.year,
      authProvider: 'srm',
      createdAt: Date.now(),
    });

    const response = NextResponse.redirect(new URL('/dashboard', req.url));
    setSessionCookie(response, sessionJwt);
    clearOidcTransientCookies(response);

    return response;
  } catch (err: any) {
    console.error('[Auth Callback Error]:', err?.message || err);
    const errorUrl = new URL('/auth/error', req.url);
    errorUrl.searchParams.set('error', 'auth_failed');
    return NextResponse.redirect(errorUrl);
  }
}
