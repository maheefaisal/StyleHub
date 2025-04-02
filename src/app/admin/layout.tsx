"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart,
  Settings,
  Menu,
  X,
  LogOut,
  Loader,
  Home,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { useToast } from '@/lib/toastContext';
import ThemeToggle from "@/components/ThemeToggle";
import SidebarLink from "@/components/admin/SidebarLink";
import { Avatar } from '@/components/ui/Avatar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Get auth context
  const { user, logout, loading, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  
  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle logout action
  const handleLogout = () => {
    // Show a success toast notification
    showToast('Successfully logged out!', 'success');
    
    // Clear the cookies properly
    document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    // Then use the context logout function
    logout();
    
    // Redirect will be handled by the auth context, but just to be sure after a short delay
    setTimeout(() => {
      window.location.href = '/admin/login';
    }, 300);
  };

  // Ensure auth token is properly set (debug helper)
  useEffect(() => {
    // Check authentication state
    console.log('Admin layout auth state:', { 
      loading, 
      isAuthenticated, 
      hasToken: !!user?.id,
      hasCookie: document.cookie.includes('auth_token'),
      pathname
    });
    
    // If authenticated but no cookie, fix it
    if (isAuthenticated && !document.cookie.includes('auth_token')) {
      console.log('Fixing missing cookie - setting auth_token from localStorage');
      const token = localStorage.getItem('auth_token');
      if (token) {
        document.cookie = `auth_token=${token}; path=/; max-age=${60*60*24*7}`; // 7 days
      }
    }
  }, [isAuthenticated, loading, pathname, user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== '/admin/login') {
      console.log('Not authenticated, redirecting to login');
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, pathname, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, don't render anything
  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  // If on login page, render children without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed inset-y-0 z-50 hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Dashboard
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            <li>
              <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />} text="Dashboard" />
            </li>
            <li>
              <SidebarLink href="/admin/products" icon={<Package size={18} />} text="Products" />
            </li>
            <li>
              <SidebarLink href="/admin/categories" icon={<Layers size={18} />} text="Categories" />
            </li>
            <li>
              <SidebarLink href="/admin/orders" icon={<ShoppingCart size={18} />} text="Orders" />
            </li>
            <li>
              <SidebarLink href="/admin/customers" icon={<Users size={18} />} text="Customers" />
            </li>
          </ul>
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-1">
              <li>
                <SidebarLink href="/admin/settings" icon={<Settings size={18} />} text="Settings" />
              </li>
              <li>
                <SidebarLink href="/" icon={<Home size={18} />} text="Back to Site" />
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                >
                  <div className="text-gray-500 dark:text-gray-400">
                    <LogOut size={18} />
                  </div>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar size={32} />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'admin@example.com'}</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile sidebar (can be implemented with a drawer/mobile menu button) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-14 flex items-center justify-between px-4">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="text-lg font-bold text-gray-800 dark:text-white">Admin</div>
        <ThemeToggle />
      </div>

      {/* Mobile sidebar menu */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900/50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="py-4 px-3">
              <ul className="space-y-1">
                <li>
                  <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />} text="Dashboard" />
                </li>
                <li>
                  <SidebarLink href="/admin/products" icon={<Package size={18} />} text="Products" />
                </li>
                <li>
                  <SidebarLink href="/admin/categories" icon={<Layers size={18} />} text="Categories" />
                </li>
                <li>
                  <SidebarLink href="/admin/orders" icon={<ShoppingCart size={18} />} text="Orders" />
                </li>
                <li>
                  <SidebarLink href="/admin/customers" icon={<Users size={18} />} text="Customers" />
                </li>
              </ul>
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <ul className="space-y-1">
                  <li>
                    <SidebarLink href="/admin/settings" icon={<Settings size={18} />} text="Settings" />
                  </li>
                  <li>
                    <SidebarLink href="/" icon={<Home size={18} />} text="Back to Site" />
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    >
                      <div className="text-gray-500 dark:text-gray-400">
                        <LogOut size={18} />
                      </div>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 