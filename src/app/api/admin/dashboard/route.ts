import { NextRequest, NextResponse } from "next/server";
import { verifyToken, verifyAuth } from "@/lib/auth";
import { parseDbJson } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication - check both Authorization header and cookie
    let token: string | undefined;
    
    // Check Authorization header first
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      token = authHeader.split(' ')[1];
    }
    
    // If no token in header, try to get from cookies
    if (!token) {
      token = request.cookies.get('auth_token')?.value;
    }
    
    // For demo purposes - accept the demo token without verification
    if (!token) {
      console.log('No auth token found in dashboard API request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // For demo purposes, we'll skip verification if it starts with demo_token
    let verified = false;
    if (token.startsWith('demo_token_')) {
      verified = true;
    } else {
      // Otherwise verify the token normally
      const decoded = await verifyAuth(token);
      verified = !!decoded;
    }
    
    if (!verified) {
      console.log('Invalid token provided to dashboard API');
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get data from our mock Prisma client
    const [products, orders, users] = await Promise.all([
      prisma.product.findMany(),
      prisma.order.findMany(),
      prisma.user.findMany()
    ]);
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    // Calculate previous period metrics for comparison
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    
    const currentPeriodOrders = orders.filter(order => new Date(order.createdAt) >= monthAgo);
    const previousPeriodOrders = orders.filter(order => 
      new Date(order.createdAt) >= twoMonthsAgo && 
      new Date(order.createdAt) < monthAgo
    );
    
    const currentPeriodRevenue = currentPeriodOrders.reduce((sum, order) => sum + order.total, 0);
    const previousPeriodRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.total, 0);
    
    const revenueChange = previousPeriodRevenue === 0 ? 100 :
      ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;
    
    const ordersChange = previousPeriodOrders.length === 0 ? 100 :
      ((currentPeriodOrders.length - previousPeriodOrders.length) / previousPeriodOrders.length) * 100;
    
    // Calculate customer metrics
    const currentPeriodCustomers = users.filter(user => 
      user.role === 'user' && new Date(user.createdAt) >= monthAgo
    ).length;
    
    const previousPeriodCustomers = users.filter(user => 
      user.role === 'user' && 
      new Date(user.createdAt) >= twoMonthsAgo && 
      new Date(user.createdAt) < monthAgo
    ).length;
    
    const customersChange = previousPeriodCustomers === 0 ? 100 :
      ((currentPeriodCustomers - previousPeriodCustomers) / previousPeriodCustomers) * 100;
    
    // Create dashboard data using actual data
    const dashboardData = {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: totalRevenue,
      totalCustomers: users.filter(user => user.role === 'user').length,
      metrics: {
        products: {
          total: products.length,
          change: 0, // We don't track product changes over time in this demo
          trend: 'up'
        },
        orders: {
          total: orders.length,
          change: ordersChange,
          trend: ordersChange >= 0 ? 'up' : 'down'
        },
        revenue: {
          total: totalRevenue,
          change: revenueChange,
          trend: revenueChange >= 0 ? 'up' : 'down'
        },
        customers: {
          total: users.filter(user => user.role === 'user').length,
          change: customersChange,
          trend: customersChange >= 0 ? 'up' : 'down'
        }
      },
      recentOrders: orders
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(order => ({
          id: order.id,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : order.createdAt,
          customerName: order.customer?.name || 'Unknown Customer'
        })),
      recentProducts: products
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          inStock: product.inventory > 0,
          images: product.images,
          createdAt: product.createdAt instanceof Date ? product.createdAt.toISOString() : product.createdAt,
          categoryName: product.category || product.categoryName
        }))
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 