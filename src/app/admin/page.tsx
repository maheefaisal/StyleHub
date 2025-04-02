"use client";

import { useState, useEffect } from 'react';
import { 
  Box, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getFirstImageUrl } from '@/lib/utils';

interface DashboardMetric {
  total: number;
  change: number;
  trend: 'up' | 'down';
}

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  metrics: {
    products: DashboardMetric;
    orders: DashboardMetric;
    revenue: DashboardMetric;
    customers: DashboardMetric;
  };
  recentOrders: Array<{
    id: string;
    total: number;
    status: string;
    createdAt: string;
    customerName: string;
  }>;
  recentProducts: Array<{
    id: string;
    name: string;
    price: number;
    inStock: boolean;
    images: string[];
    createdAt: string;
    categoryName: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  // Add debug output
  useEffect(() => {
    console.log('Dashboard auth state:', { 
      isAuthenticated, 
      hasToken: !!token,
      user,
      cookieToken: document.cookie.includes('auth_token')
    });
    
    // If not authenticated, redirect to login after a short delay
    if (!isAuthenticated && !token) {
      const timer = setTimeout(() => {
        window.location.href = '/admin/login';
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    // If authenticated but cookie is missing, fix it
    if (isAuthenticated && token && !document.cookie.includes('auth_token')) {
      console.log('Setting missing auth cookie from localStorage');
      document.cookie = `auth_token=${token}; path=/; max-age=${60*60*24*7}`; // 7 days
    }
  }, [isAuthenticated, token, user]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        console.log('No token available, skipping data fetch');
        return;
      }
      
      setLoading(true);
      try {
        // Fetch dashboard stats
        console.log('Fetching dashboard data with token');
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          // Add cache control to avoid stale data
          cache: 'no-store'
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Dashboard API error:', response.status, errorText);
          throw new Error(`Failed to fetch dashboard data: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('Dashboard data fetched successfully:', data);
        setStats(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
        
        // Try to fetch with cookie auth if header auth failed
        if (!document.cookie.includes('auth_token') && token) {
          console.log('Setting cookie and retrying...');
          document.cookie = `auth_token=${token}; path=/; max-age=${60*60*24*7}`;
          // Retry after a short delay
          setTimeout(fetchDashboardData, 1000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Please log in to access this page</h2>
          <Link
            href="/admin/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Error loading dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">No data available</h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`text-sm font-medium flex items-center ${
              stats.metrics.products.trend === 'up' 
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.metrics.products.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {Math.abs(stats.metrics.products.change).toFixed(1)}%
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            {stats.metrics.products.total}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className={`text-sm font-medium flex items-center ${
              stats.metrics.orders.trend === 'up' 
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.metrics.orders.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {Math.abs(stats.metrics.orders.change).toFixed(1)}%
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            {stats.metrics.orders.total}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className={`text-sm font-medium flex items-center ${
              stats.metrics.revenue.trend === 'up' 
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.metrics.revenue.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {Math.abs(stats.metrics.revenue.change).toFixed(1)}%
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            ${stats.metrics.revenue.total.toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
        </div>

        {/* Total Customers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className={`text-sm font-medium flex items-center ${
              stats.metrics.customers.trend === 'up' 
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.metrics.customers.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {Math.abs(stats.metrics.customers.change).toFixed(1)}%
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            {stats.metrics.customers.total}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Customers</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b dark:border-gray-700 last:border-0">
                    <td className="py-3 text-sm text-gray-900 dark:text-white">{order.id}</td>
                    <td className="py-3 text-sm text-gray-900 dark:text-white">{order.customerName}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-900 dark:text-white">${order.total.toFixed(2)}</td>
                    <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Product</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Added</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentProducts.map((product) => (
                  <tr key={product.id} className="border-b dark:border-gray-700 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center">
                        <img 
                          src={getFirstImageUrl(product.images)} 
                          alt={product.name}
                          className="w-8 h-8 rounded object-cover mr-3"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-900 dark:text-white">{product.categoryName}</td>
                    <td className="py-3 text-sm text-gray-900 dark:text-white">${product.price.toFixed(2)}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 