"use client";

import DynamicSidebar from "@/components/DynamicSideBar";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



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


 

  // Only render the layout if user is authenticated
  return (
    <div className="min-h-screen flex flex-col">
       
      <div className="flex flex-1">
        
          {/* Render the sidebar only if the user is authenticated */}
          <DynamicSidebar />
        
          <main className="flex-1 p-4">{children}</main>

        
      </div>
    </div>
  );
}