import { NextResponse } from 'next/server';
import { getSalesTrend } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'week';

    const salesTrend = await getSalesTrend(timeRange);
    return NextResponse.json(salesTrend);
  } catch (error) {
    console.error('Error fetching sales trend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales trend' },
      { status: 500 }
    );
  }
} 