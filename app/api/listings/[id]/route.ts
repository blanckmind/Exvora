import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { ListingsDB } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listing = await ListingsDB.getById(id);
  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  return NextResponse.json({ listing });
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
  const deleted = await ListingsDB.delete(id, session.id);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Listing not found or you are not authorized to delete it.' },
      { status: 403 }
    );
  }
  return NextResponse.json({ success: true });
}
