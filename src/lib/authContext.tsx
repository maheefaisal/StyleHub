"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from './auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper for cookie management
const cookieHelper = {
  set: (name: string, value: string, days: number) => {
    if (typeof window === 'undefined') return;
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  },
  get: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  remove: (name: string) => {
    if (typeof window === 'undefined') return;
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};

// Helper to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check both localStorage and cookies for token
        const storedToken = localStorage.getItem('auth_token') || cookieHelper.get('auth_token');
        
        if (storedToken) {
          // Make sure token is in both places for consistency
          localStorage.setItem('auth_token', storedToken);
          cookieHelper.set('auth_token', storedToken, 7);
          
          // Verify the token
          const decoded = await verifyToken(storedToken);
          if (decoded) {
            setUser({
              id: decoded.id,
              email: decoded.email,
              role: decoded.role,
              name: 'Admin User' // For demo purposes
            });
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            // Invalid token, clear everything
            localStorage.removeItem('auth_token');
            cookieHelper.remove('auth_token');
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear everything on error
        localStorage.removeItem('auth_token');
        cookieHelper.remove('auth_token');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, using hardcoded credentials
      if (email === 'admin@example.com' && password === 'admin123') {
        const newToken = 'demo_token_' + Date.now();
        const user = {
          id: '1',
          email: email,
          role: 'admin',
          name: 'Admin User'
        };

        // First set token in cookies as it's more sensitive to timing
        cookieHelper.set('auth_token', newToken, 7); // Store for 7 days
        
        // Then save to localStorage for persistence
        try {
          localStorage.setItem('auth_token', newToken);
        } catch (storageError) {
          console.error('Failed to save token to localStorage:', storageError);
          // Continue anyway as the cookie is set
        }
        
        // Update state
        setUser(user);
        setToken(newToken);
        setIsAuthenticated(true);

        console.log('Login successful, token set in both cookie and localStorage');

        // Redirect to admin dashboard with force refresh option
        router.push('/admin', { forceOptimisticNavigation: true });
        
        // Use a more reliable approach with full page reload
        setTimeout(() => {
          window.location.href = '/admin';
        }, 300);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    
    // Clear cookies as well
    cookieHelper.remove('auth_token');
    
    // Clear state
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    // Redirect to login with a page reload
    setTimeout(() => {
      window.location.href = '/admin/login';
    }, 100);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        loading, 
        isAuthenticated, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 