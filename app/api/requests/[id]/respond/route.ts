import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { RequestsDB, ExchangesDB } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }

  const { id } = await params;
  const request = await RequestsDB.getById(id);
  if (!request) {
    return NextResponse.json({ error: 'Request not found.' }, { status: 404 });
  }

  if (request.requesterId === session.id) {
    return NextResponse.json(
      { error: 'You cannot submit an offer to your own request.' },
      { status: 400 }
    );
  }

  try {
    const { message, offeredItemOrSkill, contactNumber } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const proposal = await ExchangesDB.create({
      requestId: request.id,
      requestTitle: request.title,
      senderId: session.id,
      senderName: session.name,
      senderEmail: session.email,
      senderDept: session.department,
      recipientId: request.requesterId,
      message,
      offeredItemOrSkill: offeredItemOrSkill || '',
      contactNumber: contactNumber || '',
    });

    return NextResponse.json({ success: true, proposal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to submit response.' },
      { status: 500 }
    );
  }
}
