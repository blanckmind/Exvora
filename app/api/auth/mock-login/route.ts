import { NextRequest, NextResponse } from 'next/server';
import { MOCK_STUDENTS, createMockSessionForStudent } from '@/lib/auth/mock';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';
import { UsersDB } from '@/lib/db';

export async function POST(req: NextRequest) {
  const authMode = process.env.AUTH_MODE || 'mock';
  if (authMode === 'srm' && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Mock login is disabled in production SRM SSO mode.' },
      { status: 403 }
    );
  }

  try {
    const { studentIndex } = await req.json();
    const student = MOCK_STUDENTS[studentIndex] || MOCK_STUDENTS[0];

    // Upsert into Exvora DB
    const exvoraUser = await UsersDB.upsertFromSrmIdentity({
      srmSubjectId: student.srmSubjectId,
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
    });

    const mockSession = createMockSessionForStudent(student);
    mockSession.id = exvoraUser.id;

    const sessionJwt = await createSessionToken(mockSession);

    const response = NextResponse.json({
      success: true,
      user: mockSession,
      redirectTo: '/dashboard',
    });

    setSessionCookie(response, sessionJwt);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to initialize mock session.' },
      { status: 500 }
    );
  }
}
