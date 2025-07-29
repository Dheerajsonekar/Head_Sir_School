"use client";

import DynamicSidebar from "@/components/DynamicSideBar";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLoadingWrapperStudent from '@/components/AppLoadingWrapperStudent';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, initialized, isLoggingOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ONLY redirect if auth is fully initialized AND there's no user AND we're not logging out
    if (initialized && !loading && !user && !isLoggingOut) {
      console.log('❌ No authenticated user found, redirecting to login');
      router.push("/student/login");
    }
  }, [user, loading, initialized, isLoggingOut, router]);

  // Show loading while auth is initializing, logging out, or during the loading state
  if (!initialized || loading || isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {isLoggingOut ? 'Signing out...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Don't render content until we're sure user is authenticated
 

  // Only render the layout if user is authenticated
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <AppLoadingWrapperStudent>
          <DynamicSidebar />
          <main className="flex-1 p-4">{children}</main>
        </AppLoadingWrapperStudent>
      </div>
    </div>
  );
}