// hooks/useNavigationLoading.ts
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export const useNavigationLoading = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Function to manually trigger navigation loading
  const startNavigation = useCallback(() => {
    setIsNavigating(true);
  }, []);

  const stopNavigation = useCallback(() => {
    setIsNavigating(false);
  }, []);

  // Enhanced navigation function with loading state
  const navigateWithLoading = useCallback((url: string) => {
    setIsNavigating(true);
    router.push(url);
  }, [router]);

  // Stop loading when pathname changes
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // Auto-stop loading after a timeout (fallback)
  useEffect(() => {
    if (isNavigating) {
      const timeout = setTimeout(() => {
        setIsNavigating(false);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isNavigating]);

  return {
    isNavigating,
    startNavigation,
    stopNavigation,
    navigateWithLoading
  };
};