// Simple mock implementation for token verification
// In a real application, this would use something like JWT verification

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

/**
 * Verifies a JWT token and returns the decoded payload
 */
export async function verifyToken(token: string): Promise<DecodedToken> {
  // This is a simplified mock implementation
  if (token.startsWith('demo_token_')) {
    return {
      id: '1',
      email: 'admin@example.com',
      role: 'admin',
    };
  }
  
  throw new Error('Invalid token');
}

/**
 * Creates a JWT token for a user
 */
export function createToken(payload: Omit<DecodedToken, 'iat' | 'exp'>): string {
  // In a real app, we would use jwt.sign here
  // For this demo, we're just returning a mock token
  return 'demo_token_' + Date.now();
}

export async function verifyAuth(token: string) {
  try {
    // For demo purposes, accept any token that starts with 'demo_token_'
    if (token.startsWith('demo_token_')) {
      return {
        id: '1',
        email: 'admin@example.com',
        role: 'admin',
        name: 'Admin User'
      };
    }
    return null;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
} 