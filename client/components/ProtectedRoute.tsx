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

  useEffect(() => {
    console.log('🛡️ ProtectedRoute - user:', user, 'loading:', loading, 'initialized:', initialized, 'isLoggingOut:', isLoggingOut);
    
    // Don't do anything until auth is initialized or if we're logging out
    if (!initialized || loading || isLoggingOut) {
      setShouldRender(false);
      return;
    }

    // No user - redirect to login
    if (!user) {
      console.log('❌ No user, redirecting to:', redirectTo);
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
    console.log('✅ User authorized');
    setIsRedirecting(false);
    setShouldRender(true);
  }, [user, loading, initialized, isLoggingOut, router, allowedRoles, redirectTo]);

  // Show loading while checking authentication, during redirect, or while logging out
  if (!initialized || loading || isRedirecting || isLoggingOut) {
    const loadingMessage = isLoggingOut ? 'Signing out...' : 
                          isRedirecting ? 'Redirecting...' : 'Loading...';
                          
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Don't render until we're sure the user should see this content
  if (!shouldRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User is authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;