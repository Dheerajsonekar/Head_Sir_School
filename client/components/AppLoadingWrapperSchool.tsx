"use client";

import { useAuth } from "@/context/authContext";
import { ReactNode } from "react";

interface AppLoadingWrapperProps {
  children: ReactNode;
}

const AppLoadingWrapperSchool = ({ children }: AppLoadingWrapperProps) => {
  const { loading, initialized, isLoggingOut } = useAuth();

  // Show loading screen while auth is being initialized or during logout
  if (!initialized || loading || isLoggingOut) {
    const loadingMessage = isLoggingOut ? 'Signing out...' : 'Initializing your session...';
    
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
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div>
            </div>
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