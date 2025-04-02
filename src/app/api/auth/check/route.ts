import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Demo admin user
const demoAdmin = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // For development, accept demo tokens
    if (token.startsWith('demo_token_')) {
      return NextResponse.json(demoAdmin);
    }

    // Verify the token
    try {
      const decoded = await verifyToken(token);
      
      // For demo purposes, any valid token returns the admin user
      return NextResponse.json(demoAdmin);
    } catch (tokenError) {
      console.error('Token verification error:', tokenError);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
} 