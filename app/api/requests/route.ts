import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { RequestsDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get('category') || undefined;
  const urgency = searchParams.get('urgency') || undefined;
  const search = searchParams.get('search') || undefined;

  const requests = await RequestsDB.getAll({ category, urgency, search });
  return NextResponse.json({ requests });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, category, urgency, preferredMode, location } = body;

    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required fields for campus request.' },
        { status: 400 }
      );
    }

    const newRequest = await RequestsDB.create({
      title,
      description,
      category,
      urgency: urgency || 'This Week',
      preferredMode: preferredMode || 'Exchange',
      location,
      requesterId: session.id,
      requesterName: session.name,
      requesterDept: session.department,
      requesterYear: session.year,
      requesterSubjectId: session.srmSubjectId,
    });

    return NextResponse.json({ success: true, request: newRequest }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to submit request.' },
      { status: 500 }
    );
  }
}
