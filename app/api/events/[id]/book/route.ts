import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EventsDB } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized. Please sign in with your student account to book tickets.' },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const ticketCount = Number(body.ticketCount) || 1;

    if (ticketCount < 1 || ticketCount > 4) {
      return NextResponse.json(
        { error: 'You can book between 1 and 4 tickets per student account.' },
        { status: 400 }
      );
    }

    const booking = await EventsDB.bookTicket({
      eventId: id,
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      userDept: session.department,
      userSubjectId: session.srmSubjectId,
      ticketCount,
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to book tickets.' },
      { status: 400 }
    );
  }
}
