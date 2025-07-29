"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'teacher' | 'principal')[];
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = "/" 
}: ProtectedRouteProps) => {
  const { user, loading, initialized, isLoggingOut } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    console.log('🛡️ ProtectedRoute - State:', {
      user: user?.name || 'none',
      loading,
      initialized,
      isLoggingOut,
      authCheckComplete
    });

    // Don't do anything while logging out
    if (isLoggingOut) {
      setShouldRender(false);
      setAuthCheckComplete(false);
      return;
    }

    // Wait for auth to be fully initialized
    if (!initialized || loading) {
      setShouldRender(false);
      setAuthCheckComplete(false);
      return;
    }

    // Mark auth check as complete
    setAuthCheckComplete(true);

    // Give a small delay after initialization to prevent flashing
    const timer = setTimeout(() => {
      // No user after initialization is complete - redirect to login
      if (!user) {
        console.log('❌ No user after auth initialization, redirecting to:', redirectTo);
        setIsRedirecting(true);
        setShouldRender(false);
        router.replace(redirectTo);
        return;
      }

      // Check role if specified
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        console.log('🚫 Wrong role, redirecting. User role:', user.role, 'Allowed:', allowedRoles);
        setIsRedirecting(true);
        setShouldRender(false);
        router.replace(redirectTo);
        return;
      }

      // User is authorized
      console.log('✅ User authorized, rendering content');
      setIsRedirecting(false);
      setShouldRender(true);
    }, 100); // Small delay to prevent flash

    return () => clearTimeout(timer);
  }, [user, loading, initialized, isLoggingOut, router, allowedRoles, redirectTo]);

  // Show loading while checking authentication or during transitions
  if (!initialized || loading || isLoggingOut || !authCheckComplete || isRedirecting) {
    const loadingMessage = isLoggingOut ? 'Signing out...' : 
                          isRedirecting ? 'Redirecting...' : 
                          !initialized ? 'Initializing...' :
                          'Checking authorization...';
                          
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Additional safety check - don't render until we're absolutely sure
  if (!shouldRender || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // User is authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;