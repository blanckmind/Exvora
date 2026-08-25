import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { UsersDB } from '@/lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = await UsersDB.findById(session.id);
  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.id,
      srmSubjectId: session.srmSubjectId,
      name: session.name,
      email: session.email,
      department: session.department,
      year: session.year,
      campus: user?.campus || 'SRMIST Main Campus',
      avatar: user?.avatar,
      authProvider: session.authProvider,
    },
  });
}
