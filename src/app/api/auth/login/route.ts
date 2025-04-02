import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Demo admin user
const demoAdmin = {
  id: '1',
  email: 'admin@example.com',
  // Password: admin123
  password: '$2a$10$XiPK2/L.XarDAwXzzGV2cOzCTAuqL9.wNh7E/pmuMj.TPFLm9IjbW',
  name: 'Admin User',
  role: 'admin',
  createdAt: new Date('2023-01-01').toISOString(),
  updatedAt: new Date('2023-01-01').toISOString()
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In a real app, we would query the database
    // For demo, check if it matches our demo admin
    const user = email === demoAdmin.email ? demoAdmin : null;

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'fallback-secret', // Use JWT_SECRET from env
      { expiresIn: '1d' }
    );

    // Return user data and token
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 