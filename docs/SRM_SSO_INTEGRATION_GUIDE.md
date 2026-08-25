# Exvora — Official SRMIST Institutional Single Sign-On (SSO) Integration Specification

## 1. Executive Summary
**Exvora** is the official campus resource exchange, academic textbook/hardware circularity, and peer collaboration platform designed for students of SRM Institute of Science and Technology (SRMIST).

This document outlines the security architecture and technical parameters required by the **SRMIST Identity & Access Management (IAM)** and IT department to onboard Exvora onto SRM's official Single Sign-On (SSO) infrastructure.

---

## 2. Zero-Assumption Rule Compliance
In strict adherence to security best practices:
- **No Passwords**: Student credentials (passwords, OTPs, PINs) are entered strictly on SRM's official authentication page. Exvora never receives, intercepts, or retains student passwords.
- **Independent Database**: Exvora maintains its own application database and does not connect directly to SRM's internal student database.
- **Zero Fabrication**: Exvora's codebase does not use fabricated or unapproved endpoints. When credentials are not yet provisioned, the application operates in an isolated development mock mode (`AUTH_MODE=mock`).

---

## 3. Preferred Protocol: OpenID Connect (OIDC)

### 3.1 Flow
- **Protocol**: OpenID Connect Core 1.0 (Authorization Code Flow with PKCE)
- **PKCE Method**: `S256` (SHA-256 code challenge)
- **State & Nonce**: Cryptographically generated 192-bit random values validated on callback to prevent CSRF and replay attacks.
- **Client Type**: Confidential Client (Authorization code exchanged with `client_secret` server-to-server) or Public Client with strict PKCE.

### 3.2 Registered Endpoints Required from SRM IT
| Parameter | Description | Example Placeholder |
| :--- | :--- | :--- |
| `SRM_ISSUER` | OIDC Issuer Identifier | `https://sso.srmist.edu.in` |
| `SRM_AUTHORIZATION_URL` | Institutional User Login Screen | `https://sso.srmist.edu.in/oauth2/authorize` |
| `SRM_TOKEN_URL` | Server-Side Code Exchange Endpoint | `https://sso.srmist.edu.in/oauth2/token` |
| `SRM_JWKS_URL` | Public Key Set for Token Signature Check | `https://sso.srmist.edu.in/.well-known/jwks.json` |
| `SRM_USERINFO_URL` | User Profile / Claims Endpoint (Optional) | `https://sso.srmist.edu.in/oauth2/userinfo` |
| `SRM_CLIENT_ID` | Issued Client Identifier | *(Issued by SRM IT)* |
| `SRM_CLIENT_SECRET` | Confidential Client Secret | *(Issued by SRM IT)* |

---

## 4. Redirect Callback URIs to Whitelist in SRM IdP

SRM IT administrators should register the following Redirect URIs for Exvora:

- **Local Development**: `http://localhost:3000/api/auth/callback`
- **Staging / QA**: `https://staging-exvora.srmist.edu.in/api/auth/callback`
- **Production**: `https://exvora.srmist.edu.in/api/auth/callback`

---

## 5. Requested Scopes & Claims

### Scopes
```text
openid profile email
```

### Identity Claims Mapping
| Claim | Type | Required | Mapping in Exvora | Description |
| :--- | :--- | :--- | :--- | :--- |
| `sub` | String | **Yes (Mandatory)** | `srm_subject_id` | Stable, immutable student identifier (e.g., Student Registration Number). |
| `email` | String | **Recommended** | `email` | Official SRM email address (`*@srmist.edu.in`). |
| `name` | String | **Recommended** | `name` | Full display name of the student. |
| `department` / `branch` | String | Optional | `department` | Academic branch (e.g., Computer Science, Mechanical). |
| `year` / `year_of_study` | String | Optional | `year` | Year of study (e.g., 2nd Year, 4th Year). |

---

## 6. Environment Configuration (.env.local)

Once official parameters are provided by SRM IT, configure `.env.local`:

```env
# Switch mode from 'mock' to 'srm'
AUTH_MODE=srm

# Application URL
NEXT_PUBLIC_APP_URL=https://exvora.srmist.edu.in

# Server Session Encryption Key
SESSION_SECRET=a_random_cryptographic_key_at_least_32_characters_long

# Official SRM SSO Parameters
SRM_ISSUER=https://sso.srmist.edu.in
SRM_CLIENT_ID=your_assigned_client_id
SRM_CLIENT_SECRET=your_assigned_client_secret
SRM_AUTHORIZATION_URL=https://sso.srmist.edu.in/oauth2/authorize
SRM_TOKEN_URL=https://sso.srmist.edu.in/oauth2/token
SRM_USERINFO_URL=https://sso.srmist.edu.in/oauth2/userinfo
SRM_JWKS_URL=https://sso.srmist.edu.in/.well-known/jwks.json
SRM_REDIRECT_URI=https://exvora.srmist.edu.in/api/auth/callback
SRM_SCOPES=openid profile email
SRM_END_SESSION_URL=https://sso.srmist.edu.in/oauth2/logout
```

---

## 7. Security Architecture & Threat Model Mitigations

1. **Password Leakage Prevention**: Exvora has no password input fields for SRM credentials. All authentication redirects to SRM's official domain.
2. **CSRF Mitigation**: State parameter is cryptographically generated, stored in a short-lived `HttpOnly` cookie, and compared on callback.
3. **Replay Attack Mitigation**: Cryptographic nonce generated per session and validated against the decoded ID Token payload.
4. **Token Security**: Tokens are exchanged solely server-to-server. Client secrets and raw access tokens are never transmitted to the browser or stored in `localStorage`.
5. **Session Management**: Session tokens are encrypted and transmitted solely via `HttpOnly`, `SameSite=Lax`, `Secure` (production) cookies.

---

## 8. Verification & Diagnostics
Administrators can check live integration health at any time by navigating to:
```text
https://exvora.srmist.edu.in/admin/sso-status
```
