import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { ListingsDB, UsersDB } from '@/lib/db';
import { CategoryType, ExchangeMode } from '@/lib/db/mock-data';
import { CARTOON_SVGS } from '@/lib/cartoon-images';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get('category') || undefined;
  const exchangeType = searchParams.get('type') || searchParams.get('exchangeType') || undefined;
  const search = searchParams.get('search') || undefined;

  const listings = await ListingsDB.getAll({ category, exchangeType, search });
  return NextResponse.json({ listings });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      description,
      category,
      type,
      exchangeType,
      price,
      condition,
      location,
      images,
      preferredExchangeItem,
      shareDuration,
      skillDetails,
    } = body;

    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required listing fields: title, description, category, or location.' },
        { status: 400 }
      );
    }

    const defaultImg =
      category === 'Electronics'
        ? CARTOON_SVGS.electronics
        : category === 'Notes & Study Material'
        ? CARTOON_SVGS.notes
        : category === 'Event Tickets'
        ? CARTOON_SVGS.tickets
        : category === 'Skills'
        ? CARTOON_SVGS.skills
        : category === 'Give Away'
        ? CARTOON_SVGS.giveaway
        : CARTOON_SVGS.textbooks;

    const newListing = await ListingsDB.create({
      title,
      description,
      category: category as CategoryType,
      exchangeType: (exchangeType || type || 'Exchange') as ExchangeMode,
      price: Number(price) || 0,
      condition: condition || 'Good',
      location,
      preferredExchangeItem,
      shareDuration,
      skillDetails,
      images: Array.isArray(images) && images.length > 0 ? images : [defaultImg],
      sellerId: session.id,
      sellerName: session.name,
      sellerDept: session.department,
      sellerYear: session.year || 'Undergraduate',
      sellerSubjectId: session.srmSubjectId,
    });

    return NextResponse.json({ success: true, listing: newListing }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to create listing.' },
      { status: 500 }
    );
  }
}
