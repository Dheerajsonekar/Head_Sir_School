// Student Login - Fixed Version
"use client";
import { useState, useEffect } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function StudentLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const router = useRouter();
  const { login, user, initialized, isLoggingOut } = useAuth();

  // Check if user is already logged in and redirect
  useEffect(() => {
    console.log('🔐 StudentLogin - State:', {
      user: user?.name || 'none',
      initialized,
      isLoggingOut,
      pageReady
    });

    // Don't do anything while logging out
    if (isLoggingOut) {
      setPageReady(false);
      return;
    }

    // Wait for auth to be initialized
    if (!initialized) {
      setPageReady(false);
      return;
    }

    // Small delay to ensure auth state is stable
    const timer = setTimeout(() => {
      if (user) {
        console.log('👤 User already logged in, redirecting to dashboard');
        setShouldRedirect(true);
        setPageReady(false);
        
        // Redirect based on user role
        const dashboardPath = user.role === 'student' ? '/student/dashboard' : 
                             user.role === 'teacher' ? '/teacher/dashboard' : 
                             '/principal/dashboard';
        
        router.replace(dashboardPath);
      } else {
        console.log('👤 No user found, showing login form');
        setShouldRedirect(false);
        setPageReady(true);
      }
    }, 100); // Small delay to prevent flash

    return () => clearTimeout(timer);
  }, [user, initialized, isLoggingOut, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post("/student/login", formData);
      if (res.status === 200) {
        console.log('✅ Login successful, setting user data');
        login(res.data.user);
        
        // Small delay to prevent flash, then redirect
        setTimeout(() => {
          router.push("/student/dashboard");
        }, 100);
      }
    } catch (err: any) {
      console.error('❌ Login failed:', err);
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is not initialized, logging out, or redirecting
  if (!initialized || isLoggingOut || shouldRedirect || !pageReady) {
    const loadingMessage = isLoggingOut ? 'Signing out...' :
                          shouldRedirect ? 'Redirecting to dashboard...' :
                          !initialized ? 'Initializing...' :
                          'Loading...';

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-700 font-medium">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Don't render login form if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transform transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-105">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Student Login</h2>
            <p className="text-gray-600 mt-2">Access your learning portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Need help? Contact{" "}
              <a href="mailto:support@school.edu" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                IT Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}