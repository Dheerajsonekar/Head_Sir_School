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
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    console.log('🛡️ ProtectedRoute - user:', user, 'loading:', loading);
    
    // Wait for loading to complete
    if (loading) {
      return;
    }

    // No user - redirect to login
    if (!user) {
      console.log('❌ No user, redirecting to:', redirectTo);
      router.replace(redirectTo);
      return;
    }

    // Check role if specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      console.log('🚫 Wrong role, redirecting. User role:', user.role, 'Allowed:', allowedRoles);
      router.replace(redirectTo);
      return;
    }

    // User is authorized
    console.log('✅ User authorized');
    setIsAuthorized(true);
  }, [user, loading, router, allowedRoles, redirectTo]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading while redirecting
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;