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
      
      // Check if we have a token in cookies first (faster check)
      const cookies = document.cookie;
      const hasToken = cookies.includes('token') || cookies.includes('auth');
      
      if (!hasToken) {
        console.log('❌ No auth token found in cookies');
        setUser(null);
        setLoading(false);
        setInitialized(true);
        return;
      }

      const response = await api.get('/auth/verify');
      
      if (response.data.user) {
        console.log('✅ User authenticated:', response.data.user.name);
        setUser(response.data.user);
      } else {
        console.log('❌ No user found');
        setUser(null);
      }
    } catch (error: any) {
      console.log('❌ Auth check failed:', error);
      // If it's a 401, clear any stale cookies
      if (error.response?.status === 401) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
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
      console.log('🚪 Logging out...');
      // Set logout state to prevent error screens
      setIsLoggingOut(true);
      setLoading(true);
      setUser(null);
      
      // Clear cookies immediately
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // Make logout API call in background
      api.post('/auth/logout').catch((error) => {
        console.error('Logout API call failed:', error);
      });
      
      // Immediate redirect without waiting for API
      window.location.href = '/';
    } catch (error) {
      console.error('Logout process failed:', error);
      // Still redirect even if something goes wrong
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

  // Only check auth after component mounts (client-side)
  useEffect(() => {
    if (mounted && !initialized) {
      checkAuth();
    }
  }, [mounted, initialized]);

  // Handle 401 responses globally
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && user && mounted && initialized && !isLoggingOut) {
          console.log('🔒 Token expired, logging out...');
          setIsLoggingOut(true);
          setUser(null);
          // Clear cookies
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [user, mounted, initialized, isLoggingOut]);

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