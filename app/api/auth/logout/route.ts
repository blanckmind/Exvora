import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  clearSessionCookie(response);
  return response;
}

export async function GET(req: NextRequest) {
  const endSessionUrl = process.env.SRM_END_SESSION_URL;
  const redirectUrl = endSessionUrl || '/';
  const response = NextResponse.redirect(new URL(redirectUrl, req.url));
  clearSessionCookie(response);
  return response;
}
