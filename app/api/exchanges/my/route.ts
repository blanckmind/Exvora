import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { ExchangesDB, ListingsDB } from '@/lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { sent, received } = await ExchangesDB.getForUser(session.id);
  const myListings = await ListingsDB.getBySellerId(session.id);

  return NextResponse.json({
    sent,
    received,
    myListings,
  });
}
