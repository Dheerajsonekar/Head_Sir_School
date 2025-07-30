"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

export const usePortalNavigation = () => {
  const [loadingPortal, setLoadingPortal] = useState<string | null>(null);
  const router = useRouter();

  // Preload portal pages on component mount
  useEffect(() => {
    const preloadRoutes = [
      '/student/login',
      '/teacher/login', 
      '/principal/login'
    ];

    // Preload routes after a small delay to not block initial page load
    const timer = setTimeout(() => {
      preloadRoutes.forEach(route => {
        router.prefetch(route);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  const navigateToPortal = useCallback((portalType: 'student' | 'teacher' | 'principal') => {
    // Set loading state immediately
    setLoadingPortal(portalType);
    
    const routes = {
      student: '/student/login',
      teacher: '/teacher/login', 
      principal: '/principal/login'
    };
    
    // Navigate immediately (no delay)
    router.push(routes[portalType]);
    
    // Clear loading state after a reasonable time
    const clearTimer = setTimeout(() => {
      setLoadingPortal(null);
    }, 2000);

    return () => clearTimeout(clearTimer);
  }, [router]);

  const isPortalLoading = useCallback((portalType: string) => {
    return loadingPortal === portalType;
  }, [loadingPortal]);

  return {
    navigateToPortal,
    isPortalLoading,
    loadingPortal
  };
};
