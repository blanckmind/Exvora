import { NextResponse } from 'next/server';
import { getSrmConfigReport } from '@/lib/srm/config';

export async function GET() {
  const report = getSrmConfigReport();
  return NextResponse.json(report);
}
