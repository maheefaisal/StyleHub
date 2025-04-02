import { NextResponse } from 'next/server';
import { getTopProducts } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'week';

    const topProducts = await getTopProducts(timeRange);
    return NextResponse.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top products' },
      { status: 500 }
    );
  }
} 