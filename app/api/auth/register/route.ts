import { NextRequest, NextResponse } from 'next/server';
import { UsersDB } from '@/lib/db';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, department, year, srmSubjectId, campus, avatar, password } = body;

    if (!name || !email || !department || !year || !srmSubjectId) {
      return NextResponse.json(
        { error: 'Please provide Name, SRM Email, Department, Year, and Student Register Number.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await UsersDB.findBySubjectId(srmSubjectId.trim().toUpperCase());
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this Student Register Number already exists. Please sign in.' },
        { status: 409 }
      );
    }

    const newUser = await UsersDB.register({
      name,
      email,
      department,
      year,
      srmSubjectId,
      campus,
      avatar,
      password,
    });

    const sessionPayload = {
      id: newUser.id,
      srmSubjectId: newUser.srm_subject_id,
      email: newUser.email,
      name: newUser.name,
      department: newUser.department,
      year: newUser.year,
      authProvider: 'mock' as const,
      createdAt: Date.now(),
    };

    const token = await createSessionToken(sessionPayload);
    const res = NextResponse.json({ success: true, user: sessionPayload }, { status: 201 });
    await setSessionCookie(res, token);
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Registration failed.' },
      { status: 500 }
    );
  }
}
