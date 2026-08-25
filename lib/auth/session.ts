import * as jose from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export interface UserSession {
  id: string;
  srmSubjectId: string;
  email: string;
  name: string;
  department: string;
  year: string;
  authProvider: 'srm' | 'mock';
  createdAt: number;
}

const SESSION_COOKIE_NAME = 'exvora_session';
const OIDC_STATE_COOKIE = 'exvora_oidc_state';
const OIDC_NONCE_COOKIE = 'exvora_oidc_nonce';
const OIDC_VERIFIER_COOKIE = 'exvora_oidc_verifier';

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || 'dev_insecure_default_secret_key_exvora_32bytes!';
  return new TextEncoder().encode(secret.padEnd(32, '!').slice(0, 32));
}

/**
 * Creates a signed JWT session token
 */
export async function createSessionToken(user: UserSession): Promise<string> {
  const secretKey = getSecretKey();
  return await new jose.SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

/**
 * Verifies a signed session token
 */
export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jose.jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as UserSession;
  } catch (err) {
    return null;
  }
}

/**
 * Reads and verifies the current session from incoming cookies (Server Component / Route Handler)
 */
export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) return null;
  return await verifySessionToken(sessionToken);
}

/**
 * Sets the session cookie on a NextResponse object
 */
export function setSessionCookie(response: NextResponse, sessionToken: string): void {
  const isProduction = process.env.NODE_ENV === 'production';
  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Clears the session cookie
 */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

/**
 * Stores temporary OIDC state, nonce, and PKCE verifier in HttpOnly cookies during authorization flow
 */
export function setOidcTransientCookies(
  response: NextResponse,
  state: string,
  nonce: string,
  codeVerifier: string
): void {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 15, // 15 minutes
  };

  response.cookies.set(OIDC_STATE_COOKIE, state, cookieOptions);
  response.cookies.set(OIDC_NONCE_COOKIE, nonce, cookieOptions);
  response.cookies.set(OIDC_VERIFIER_COOKIE, codeVerifier, cookieOptions);
}

/**
 * Reads stored OIDC state, nonce, and PKCE verifier
 */
export async function getOidcTransientCookies(): Promise<{
  state?: string;
  nonce?: string;
  codeVerifier?: string;
}> {
  const cookieStore = await cookies();
  return {
    state: cookieStore.get(OIDC_STATE_COOKIE)?.value,
    nonce: cookieStore.get(OIDC_NONCE_COOKIE)?.value,
    codeVerifier: cookieStore.get(OIDC_VERIFIER_COOKIE)?.value,
  };
}

/**
 * Clears temporary OIDC cookies after callback processing
 */
export function clearOidcTransientCookies(response: NextResponse): void {
  const clearOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  };

  response.cookies.set(OIDC_STATE_COOKIE, '', clearOptions);
  response.cookies.set(OIDC_NONCE_COOKIE, '', clearOptions);
  response.cookies.set(OIDC_VERIFIER_COOKIE, '', clearOptions);
}
