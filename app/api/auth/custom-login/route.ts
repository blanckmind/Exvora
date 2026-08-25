import { NextRequest, NextResponse } from 'next/server';
import { UsersDB } from '@/lib/db';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const { emailOrRegNo, password } = await req.json();

    if (!emailOrRegNo) {
      return NextResponse.json(
        { error: 'Please enter your SRM Email or Student Register Number.' },
        { status: 400 }
      );
    }

    const user = await UsersDB.findByEmailOrRegNo(emailOrRegNo);
    if (!user) {
      return NextResponse.json(
        { error: 'No student account found with this Register Number or Email. Please create an account.' },
        { status: 404 }
      );
    }

    const sessionPayload = {
      id: user.id,
      srmSubjectId: user.srm_subject_id,
      email: user.email,
      name: user.name,
      department: user.department,
      year: user.year,
      authProvider: 'mock' as const,
      createdAt: Date.now(),
    };

    const token = await createSessionToken(sessionPayload);
    const res = NextResponse.json({ success: true, user: sessionPayload });
    await setSessionCookie(res, token);
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Authentication failed.' },
      { status: 500 }
    );
  }
}
