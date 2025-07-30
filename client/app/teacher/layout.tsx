"use client";


import DynamicSidebar from "@/components/DynamicSideBar";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLoadingWrapperTeacher from "@/components/AppLoadingWrapperTeacher";
import App from "next/app";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push("/teacher/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>

      </div>
    );
  }

  

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex flex-1">
        
        <DynamicSidebar />
        <main className="flex-1 p-4">{children}</main>
        
      </div>
    </div>
  );
}