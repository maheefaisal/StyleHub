import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Routes that don't require authentication
const publicRoutes = ['/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get auth token from cookies
  const authToken = request.cookies.get('auth_token')?.value || request.headers.get('authorization')?.split(' ')[1];
  
  // Check if this is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  
  // Skip middleware for API routes and public assets
  if (
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next') || 
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }
  
  // Special handling for admin routes
  if (isAdminRoute) {
    // If user is on login page and already has auth token, redirect to admin dashboard
    if (isLoginPage && authToken) {
      console.log('User already logged in, redirecting to admin dashboard');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    // If user is trying to access admin routes without auth token, redirect to login
    if (!isLoginPage && !authToken) {
      console.log('No auth token found, redirecting to login');
      // Pass the original path as a query parameter for redirecting back after login
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Run this middleware on admin routes
export const config = {
  matcher: ['/admin/:path*']
}; 