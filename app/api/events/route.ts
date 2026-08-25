import { NextRequest, NextResponse } from 'next/server';
import { EventsDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  const events = await EventsDB.getAll({ category, search });
  return NextResponse.json({ events });
}
