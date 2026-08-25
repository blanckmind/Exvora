import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { ExchangesDB, ListingsDB } from '@/lib/db';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }

  try {
    const { listingId, message, offeredItem, offeredItemOrSkill, contactNumber } = await req.json();

    if (!listingId || !message) {
      return NextResponse.json(
        { error: 'Listing ID and message are required.' },
        { status: 400 }
      );
    }

    const listing = await ListingsDB.getById(listingId);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found.' }, { status: 404 });
    }

    if (listing.sellerId === session.id) {
      return NextResponse.json(
        { error: 'You cannot send an exchange request for your own listing.' },
        { status: 400 }
      );
    }

    const proposal = await ExchangesDB.create({
      listingId: listing.id,
      listingTitle: listing.title,
      senderId: session.id,
      senderName: session.name,
      senderEmail: session.email,
      senderDept: session.department,
      recipientId: listing.sellerId,
      message,
      offeredItemOrSkill: offeredItemOrSkill || offeredItem || '',
      contactNumber: contactNumber || '',
    });

    return NextResponse.json({ success: true, proposal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to submit exchange proposal.' },
      { status: 500 }
    );
  }
}
