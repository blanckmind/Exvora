import { NextRequest, NextResponse } from 'next/server';
import { EventsDB } from '@/lib/db';
import { getSession } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Please sign in to list ticket passes on marketplace.' }, { status: 401 });
    }

    const { bookingId, exchangeType, price, preferredExchangeItem, notes } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required.' }, { status: 400 });
    }

    const newListing = await EventsDB.listPassForExchange({
      bookingId,
      user: {
        id: session.id,
        name: session.name,
        department: session.department,
        year: session.year,
        srmSubjectId: session.srmSubjectId,
      },
      exchangeType: exchangeType || 'Give Away',
      price: price ? Number(price) : undefined,
      preferredExchangeItem,
      notes,
    });

    return NextResponse.json({
      success: true,
      message: 'Ticket pass successfully listed on the Exvora campus exchange!',
      listing: newListing,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to list pass on marketplace.' },
      { status: 400 }
    );
  }
}
