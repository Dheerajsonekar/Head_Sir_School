"use client";

import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface AppLoadingWrapperProps {
  children: ReactNode;
}

const AppLoadingWrapperSchool = ({ children }: AppLoadingWrapperProps) => {
  const { loading, initialized, isLoggingOut } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle navigation loading state
  useEffect(() => {
    const handleStart = () => setIsNavigating(true);
    const handleComplete = () => setIsNavigating(false);

    // Listen for route changes
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      handleStart();
      return originalPush.apply(router, args);
    };

    router.replace = (...args) => {
      handleStart();
      return originalReplace.apply(router, args);
    };

    // Clear navigation loading when pathname changes
    handleComplete();

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [pathname, router]);

  // Add click listeners to navigation links
  useEffect(() => {
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      
      if (link && link.getAttribute('href') !== pathname) {
        setIsNavigating(true);
        
        // Set a timeout to hide loading if navigation takes too long
        const timeout = setTimeout(() => {
          setIsNavigating(false);
        }, 3000);

        // Clear timeout when component unmounts or pathname changes
        return () => clearTimeout(timeout);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname]);

  // Show loading screen while auth is being initialized, during logout, or navigation
  if (!initialized || loading || isLoggingOut || isNavigating) {
    let loadingMessage = 'Initializing your session...';
    
    if (isLoggingOut) {
      loadingMessage = 'Signing out...';
    } else if (isNavigating) {
      loadingMessage = 'Loading page...';
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-center">
          <div className="relative">
            {/* Animated logo/icon */}
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
            </div>
            
            {/* Loading spinner */}
            {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div>
            </div> */}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-2">
            Dr. Rajendra Prasad Vidylaya
          </h2>
          <p className="text-gray-600 animate-pulse">
            {loadingMessage}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AppLoadingWrapperSchool;