import { NextRequest, NextResponse } from 'next/server';
import { EventsDB } from '@/lib/db';
import { getSession } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Please sign in to transfer ticket passes.' }, { status: 401 });
    }

    const { bookingId, targetIdentifier, reason } = await req.json();

    if (!bookingId || !targetIdentifier) {
      return NextResponse.json(
        { error: 'Please provide the ticket booking ID and recipient student register number or email.' },
        { status: 400 }
      );
    }

    const result = await EventsDB.transferBooking({
      bookingId,
      currentUserId: session.id,
      targetIdentifier: targetIdentifier.trim(),
      reason,
    });

    return NextResponse.json({
      success: true,
      message: `Pass successfully transferred to ${result.recipientUser.name} (${result.recipientUser.srm_subject_id}).`,
      updatedBooking: result.updatedBooking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to transfer ticket pass.' },
      { status: 400 }
    );
  }
}
