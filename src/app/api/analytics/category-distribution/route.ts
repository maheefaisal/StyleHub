import { NextResponse } from 'next/server';
import { getCategoryDistribution } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'week';

    const categoryDistribution = await getCategoryDistribution(timeRange);
    return NextResponse.json(categoryDistribution);
  } catch (error) {
    console.error('Error fetching category distribution:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category distribution' },
      { status: 500 }
    );
  }
} 