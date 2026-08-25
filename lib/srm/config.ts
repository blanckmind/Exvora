/**
 * SRM Institutional Single Sign-On (SSO) Configuration
 *
 * CRITICAL ZERO-ASSUMPTION RULE:
 * This module strictly reads official configuration from environment variables.
 * It NEVER invents, fabricates, or guesses endpoints, client IDs, secrets, or certificates.
 */

export interface SrmSsoConfig {
  authMode: 'mock' | 'srm';
  issuer?: string;
  clientId?: string;
  clientSecret?: string;
  authorizationUrl?: string;
  tokenUrl?: string;
  userinfoUrl?: string;
  jwksUrl?: string;
  redirectUri: string;
  scopes: string;
  endSessionUrl?: string;
  sessionSecret: string;
}

export interface SrmConfigFieldStatus {
  key: string;
  label: string;
  required: boolean;
  isSet: boolean;
  maskedValue?: string;
  description: string;
}

export interface SrmReadinessReport {
  authMode: 'mock' | 'srm';
  isReadyForSrmProduction: boolean;
  missingRequiredFields: string[];
  fields: SrmConfigFieldStatus[];
  protocolRecommendations: {
    protocol: 'OpenID Connect (Authorization Code + PKCE)';
    recommendedScopes: string[];
    mandatoryClaims: string[];
    optionalClaims: string[];
  };
}

/**
 * Returns current configuration status and readiness report safely
 * without revealing client secrets or sensitive tokens.
 */
export function getSrmConfigReport(): SrmReadinessReport {
  const authMode = (process.env.AUTH_MODE === 'srm' ? 'srm' : 'mock') as 'mock' | 'srm';

  const fields: SrmConfigFieldStatus[] = [
    {
      key: 'AUTH_MODE',
      label: 'Authentication Mode',
      required: true,
      isSet: !!process.env.AUTH_MODE,
      maskedValue: process.env.AUTH_MODE || 'mock (default)',
      description: "Set to 'mock' for local development or 'srm' for live institutional OIDC.",
    },
    {
      key: 'SRM_ISSUER',
      label: 'OIDC Issuer URL',
      required: authMode === 'srm',
      isSet: !!process.env.SRM_ISSUER && process.env.SRM_ISSUER.trim().length > 0,
      maskedValue: process.env.SRM_ISSUER ? process.env.SRM_ISSUER.replace(/^(https?:\/\/[^/]+).*/, '$1/...') : undefined,
      description: 'Official SRM Identity Provider issuer URL (e.g. from OIDC Discovery).',
    },
    {
      key: 'SRM_CLIENT_ID',
      label: 'Client ID',
      required: authMode === 'srm',
      isSet: !!process.env.SRM_CLIENT_ID && process.env.SRM_CLIENT_ID.trim().length > 0,
      maskedValue: process.env.SRM_CLIENT_ID ? `${process.env.SRM_CLIENT_ID.slice(0, 4)}••••` : undefined,
      description: 'Unique client identifier issued by SRM IT for Exvora.',
    },
    {
      key: 'SRM_CLIENT_SECRET',
      label: 'Client Secret',
      required: false, // Optional if public client using strict PKCE, required if confidential client
      isSet: !!process.env.SRM_CLIENT_SECRET && process.env.SRM_CLIENT_SECRET.trim().length > 0,
      maskedValue: process.env.SRM_CLIENT_SECRET ? '••••••••••••••••' : undefined,
      description: 'Confidential client secret (never exposed to frontend/browser).',
    },
    {
      key: 'SRM_AUTHORIZATION_URL',
      label: 'Authorization Endpoint',
      required: authMode === 'srm',
      isSet: !!process.env.SRM_AUTHORIZATION_URL && process.env.SRM_AUTHORIZATION_URL.trim().length > 0,
      maskedValue: process.env.SRM_AUTHORIZATION_URL ? process.env.SRM_AUTHORIZATION_URL.replace(/^(https?:\/\/[^/]+).*/, '$1/...') : undefined,
      description: 'Official SRM institutional sign-in page URL where students authenticate.',
    },
    {
      key: 'SRM_TOKEN_URL',
      label: 'Token Endpoint',
      required: authMode === 'srm',
      isSet: !!process.env.SRM_TOKEN_URL && process.env.SRM_TOKEN_URL.trim().length > 0,
      maskedValue: process.env.SRM_TOKEN_URL ? process.env.SRM_TOKEN_URL.replace(/^(https?:\/\/[^/]+).*/, '$1/...') : undefined,
      description: 'Server-side endpoint for exchanging authorization code for ID/access tokens.',
    },
    {
      key: 'SRM_USERINFO_URL',
      label: 'UserInfo Endpoint',
      required: false,
      isSet: !!process.env.SRM_USERINFO_URL && process.env.SRM_USERINFO_URL.trim().length > 0,
      maskedValue: process.env.SRM_USERINFO_URL ? process.env.SRM_USERINFO_URL.replace(/^(https?:\/\/[^/]+).*/, '$1/...') : undefined,
      description: 'Optional OIDC UserInfo endpoint for authorized student claims.',
    },
    {
      key: 'SRM_JWKS_URL',
      label: 'JWKS Endpoint',
      required: false,
      isSet: !!process.env.SRM_JWKS_URL && process.env.SRM_JWKS_URL.trim().length > 0,
      maskedValue: process.env.SRM_JWKS_URL ? process.env.SRM_JWKS_URL.replace(/^(https?:\/\/[^/]+).*/, '$1/...') : undefined,
      description: 'JSON Web Key Set URL for cryptographic token signature verification.',
    },
    {
      key: 'SRM_REDIRECT_URI',
      label: 'Redirect URI',
      required: true,
      isSet: !!process.env.SRM_REDIRECT_URI,
      maskedValue: process.env.SRM_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
      description: 'Exact registered callback URL registered with SRM Identity Provider.',
    },
    {
      key: 'SESSION_SECRET',
      label: 'Session Encryption Key',
      required: true,
      isSet: !!process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 16,
      maskedValue: '••••••••[Configured]',
      description: 'Cryptographic key used to sign and encrypt Exvora session cookies.',
    },
  ];

  const requiredProductionKeys = [
    'SRM_AUTHORIZATION_URL',
    'SRM_TOKEN_URL',
    'SRM_CLIENT_ID',
  ];

  const missingRequiredFields = requiredProductionKeys.filter(
    (key) => !process.env[key] || process.env[key]!.trim().length === 0
  );

  const isReadyForSrmProduction = missingRequiredFields.length === 0;

  return {
    authMode,
    isReadyForSrmProduction,
    missingRequiredFields,
    fields,
    protocolRecommendations: {
      protocol: 'OpenID Connect (Authorization Code + PKCE)',
      recommendedScopes: ['openid', 'profile', 'email'],
      mandatoryClaims: ['sub (Stable SRM Student Identifier)'],
      optionalClaims: ['email', 'name', 'department', 'year_of_study'],
    },
  };
}

/**
 * Returns validated configuration or throws if in SRM mode with incomplete configuration.
 */
export function getSrmConfig(): SrmSsoConfig {
  const authMode = (process.env.AUTH_MODE === 'srm' ? 'srm' : 'mock') as 'mock' | 'srm';
  const redirectUri = process.env.SRM_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
  const scopes = process.env.SRM_SCOPES || 'openid profile email';
  const sessionSecret = process.env.SESSION_SECRET || 'dev_insecure_default_secret_key_exvora_32bytes!';

  if (authMode === 'srm') {
    const report = getSrmConfigReport();
    if (!report.isReadyForSrmProduction) {
      throw new Error(
        `SRM SSO configuration is incomplete. Missing parameters: ${report.missingRequiredFields.join(
          ', '
        )}. In accordance with the Zero-Assumption Rule, no endpoints or credentials are fabricated.`
      );
    }
  }

  return {
    authMode,
    issuer: process.env.SRM_ISSUER,
    clientId: process.env.SRM_CLIENT_ID,
    clientSecret: process.env.SRM_CLIENT_SECRET,
    authorizationUrl: process.env.SRM_AUTHORIZATION_URL,
    tokenUrl: process.env.SRM_TOKEN_URL,
    userinfoUrl: process.env.SRM_USERINFO_URL,
    jwksUrl: process.env.SRM_JWKS_URL,
    redirectUri,
    scopes,
    endSessionUrl: process.env.SRM_END_SESSION_URL,
    sessionSecret,
  };
}
