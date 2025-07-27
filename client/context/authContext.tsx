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
  const [mounted, setMounted] = useState(false);

  const checkAuth = async () => {
    try {
      console.log('🔍 Checking authentication status...');
      const response = await api.get('/auth/verify');
      
      if (response.data.user) {
        console.log('✅ User authenticated:', response.data.user.name);
        setUser(response.data.user);
      } else {
        console.log('❌ No user found');
        setUser(null);
      }
    } catch (error) {
      console.log('❌ Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User) => {
    console.log('🔐 Logging in user:', userData.name);
    setUser(userData);
    setLoading(false);
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out...');
      setLoading(true);
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      setUser(null);
      setLoading(false);
      // Force a full page reload to clear all state
      window.location.href = '/';
    }
  };

  // ⭐ CRITICAL: Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ⭐ CRITICAL: Only check auth after component mounts (client-side)
  useEffect(() => {
    if (mounted) {
      checkAuth();
    }
  }, [mounted]);

  // ⭐ CRITICAL: Handle 401 responses globally
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && user && mounted) {
          console.log('🔒 Token expired, logging out...');
          setUser(null);
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [user, mounted]);

  // ⭐ Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <AuthContext.Provider value={{
        user: null,
        loading: true,
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