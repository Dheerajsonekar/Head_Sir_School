"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/utils/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'principal';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  isLoggingOut: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const checkAuth = async () => {
    try {
      console.log('🔍 Checking authentication status...');
      
      // Don't check if we're logging out
      if (isLoggingOut) {
        console.log('🚪 Currently logging out, skipping auth check');
        return;
      }

      const response = await api.get('/auth/verify');
      
      if (response.data.user) {
        console.log('✅ User authenticated:', response.data.user.name);
        setUser(response.data.user);
      } else {
        console.log('❌ No user found in response');
        setUser(null);
      }
    } catch (error: any) {
      console.log('❌ Auth check failed:', error);
      
      // Only clear user if it's a 401 error (unauthorized)
      if (error.response?.status === 401) {
        console.log('🔒 401 error - clearing user data');
        setUser(null);
        // Clear cookies on 401
        if (typeof document !== 'undefined') {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
          document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
        }
      } else {
        // For network errors or other issues, don't clear the user
        console.log('🌐 Network or other error, keeping current user state');
      }
    } finally {
      if (!isLoggingOut) {
        setLoading(false);
        setInitialized(true);
      }
    }
  };

  const login = (userData: User) => {
    console.log('🔐 Logging in user:', userData.name);
    setUser(userData);
    setLoading(false);
    setInitialized(true);
  };

  const logout = async () => {
    try {
      console.log('🚪 Starting logout process...');
      
      // Set logout state immediately to prevent any auth checks
      setIsLoggingOut(true);
      setLoading(true);
      
      // Clear user data immediately
      setUser(null);
      
      // Clear cookies immediately with more comprehensive clearing
      if (typeof document !== 'undefined') {
        const domain = window.location.hostname;
        const cookies = ['token', 'auth', 'session', 'jwt'];
        
        cookies.forEach(cookieName => {
          // Clear for current domain
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
          // Clear for parent domain (if subdomain)
          if (domain.includes('.')) {
            const parentDomain = '.' + domain.split('.').slice(-2).join('.');
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${parentDomain};`;
          }
        });
      }
      
      // Make logout API call (don't wait for it)
      api.post('/auth/logout').catch((error) => {
        console.error('Logout API call failed (non-blocking):', error);
      });
      
      // Redirect after a short delay to ensure state is updated
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
    } catch (error) {
      console.error('Logout process failed:', error);
      // Even if logout fails, clear local state and redirect
      setUser(null);
      setIsLoggingOut(false);
      setLoading(false);
      window.location.href = '/';
    }
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only check auth after component mounts and not during logout
  useEffect(() => {
    if (mounted && !initialized && !isLoggingOut) {
      checkAuth();
    }
  }, [mounted, initialized, isLoggingOut]);

  // Handle 401 responses globally, but be more careful
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Only handle 401 if we have a user and we're not already logging out
        if (error.response?.status === 401 && user && mounted && initialized && !isLoggingOut) {
          console.log('🔒 Token expired detected via interceptor, logging out...');
          
          // Use a flag to prevent multiple logout calls
          if (!isLoggingOut) {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [user, mounted, initialized, isLoggingOut]);

  // Handle page visibility change to recheck auth when user comes back
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user && initialized && !isLoggingOut) {
        // Silently check auth when page becomes visible again
        checkAuth().catch(() => {
          // If auth check fails when page becomes visible, user might have been logged out elsewhere
          console.log('👁️ Auth check failed on visibility change');
        });
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, [user, initialized, isLoggingOut]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <AuthContext.Provider value={{
        user: null,
        loading: true,
        initialized: false,
        isLoggingOut: false,
        login: () => {},
        logout: () => Promise.resolve(),
        checkAuth: () => Promise.resolve(),
      }}>
        {children}
      </AuthContext.Provider>
    );
  }

  const contextValue: AuthContextType = {
    user,
    loading,
    initialized,
    isLoggingOut,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};