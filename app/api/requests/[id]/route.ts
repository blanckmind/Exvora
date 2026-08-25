import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { RequestsDB } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const request = await RequestsDB.getById(id);
  if (!request) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }
  return NextResponse.json({ request });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const deleted = await RequestsDB.delete(id, session.id);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Request not found or you are not authorized to delete it.' },
      { status: 403 }
    );
  }
  return NextResponse.json({ success: true });
}
