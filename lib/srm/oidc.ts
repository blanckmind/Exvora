import crypto from 'crypto';
import * as jose from 'jose';
import { SrmSsoConfig } from './config';

export interface SrmAuthParams {
  state: string;
  nonce: string;
  codeVerifier: string;
  codeChallenge: string;
}

export interface VerifiedSrmIdentity {
  srmSubjectId: string;
  email?: string;
  name?: string;
  department?: string;
  year?: string;
  rawClaims: Record<string, any>;
}

export interface SrmTokenResponse {
  access_token?: string;
  token_type?: string;
  id_token?: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
  [key: string]: any;
}

/**
 * Base64URL encoding helper
 */
function base64UrlEncode(buffer: Buffer): string {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Generates cryptographic PKCE code verifier and challenge (S256)
 */
export function generatePkcePair(): { codeVerifier: string; codeChallenge: string } {
  const verifierBuffer = crypto.randomBytes(32);
  const codeVerifier = base64UrlEncode(verifierBuffer);
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  const codeChallenge = base64UrlEncode(hash);
  return { codeVerifier, codeChallenge };
}

/**
 * Generates secure random strings for CSRF state and OIDC nonce
 */
export function generateSecureRandom(bytes = 24): string {
  return base64UrlEncode(crypto.randomBytes(bytes));
}

/**
 * Prepares the complete cryptographic parameters for an OIDC session request
 */
export function createOidcAuthSession(): SrmAuthParams {
  const { codeVerifier, codeChallenge } = generatePkcePair();
  const state = generateSecureRandom(24);
  const nonce = generateSecureRandom(24);
  return { state, nonce, codeVerifier, codeChallenge };
}

/**
 * Builds the official SRM Authorization URL with PKCE, state, and nonce
 */
export function buildSrmAuthorizationUrl(
  config: SrmSsoConfig,
  params: SrmAuthParams
): string {
  if (!config.authorizationUrl) {
    throw new Error('SRM_AUTHORIZATION_URL is not configured.');
  }

  const url = new URL(config.authorizationUrl);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', config.clientId || '');
  url.searchParams.set('redirect_uri', config.redirectUri);
  url.searchParams.set('scope', config.scopes);
  url.searchParams.set('state', params.state);
  url.searchParams.set('nonce', params.nonce);
  url.searchParams.set('code_challenge', params.codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');

  return url.toString();
}

/**
 * Exchanges authorization code for tokens securely on the server
 */
export async function exchangeCodeForTokens(
  config: SrmSsoConfig,
  code: string,
  codeVerifier: string
): Promise<SrmTokenResponse> {
  if (!config.tokenUrl) {
    throw new Error('SRM_TOKEN_URL is not configured.');
  }

  const bodyParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: config.redirectUri,
    client_id: config.clientId || '',
    code_verifier: codeVerifier,
  });

  if (config.clientSecret) {
    bodyParams.set('client_secret', config.clientSecret);
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers,
    body: bodyParams.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown token error');
    throw new Error(`Token exchange failed with status ${response.status}: ${errorText}`);
  }

  return (await response.json()) as SrmTokenResponse;
}

/**
 * Validates OIDC ID Token and extracts claims
 */
export async function validateIdToken(
  idToken: string,
  config: SrmSsoConfig,
  expectedNonce: string
): Promise<VerifiedSrmIdentity> {
  let claims: Record<string, any>;

  if (config.jwksUrl) {
    const JWKS = jose.createRemoteJWKSet(new URL(config.jwksUrl));
    const verifyOptions: jose.JWTVerifyOptions = {};
    if (config.issuer) {
      verifyOptions.issuer = config.issuer;
    }
    if (config.clientId) {
      verifyOptions.audience = config.clientId;
    }

    const { payload } = await jose.jwtVerify(idToken, JWKS, verifyOptions);
    claims = payload;
  } else {
    // If JWKS is not configured, decode claims but validate standard payload assertions
    claims = jose.decodeJwt(idToken);
  }

  // Nonce validation (critical against replay attacks)
  if (claims.nonce && claims.nonce !== expectedNonce) {
    throw new Error('OIDC nonce mismatch: Token does not match initial authorization request.');
  }

  // Expiration validation
  const now = Math.floor(Date.now() / 1000);
  if (claims.exp && claims.exp < now) {
    throw new Error('OIDC ID token has expired.');
  }

  // Subject ID is mandatory
  const srmSubjectId = claims.sub || claims.id || claims.student_id;
  if (!srmSubjectId) {
    throw new Error('Missing stable subject identifier (sub) in SRM authentication response.');
  }

  return {
    srmSubjectId: String(srmSubjectId),
    email: claims.email || claims.mail,
    name: claims.name || claims.display_name || claims.preferred_username || claims.given_name,
    department: claims.department || claims.dept || claims.branch,
    year: claims.year || claims.year_of_study || claims.batch,
    rawClaims: claims,
  };
}

/**
 * Fetches additional claims from OIDC UserInfo endpoint if available
 */
export async function fetchUserInfo(
  userinfoUrl: string,
  accessToken: string
): Promise<Record<string, any>> {
  const response = await fetch(userinfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`UserInfo request failed with status ${response.status}`);
  }

  return await response.json();
}
