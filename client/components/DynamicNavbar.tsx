// components/DynamicNavbar.tsx
"use client";

import StudentNavbar from "./StudentNavbar";
import TeacherNavbar from "./TeacherNavbar";
import PrincipalNavbar from "./PrincipalNavbar";
import Navbar from "./Navbar";
import { useAuth } from "@/context/authContext";

const DynamicNavbar = () => {
  const { user, loading } = useAuth();

  // ⭐ CRITICAL: Show loading state while checking auth
  if (loading) {
    return (
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ⭐ ONLY render role-specific navbar AFTER loading is complete
  if (user?.role === "student") return <StudentNavbar />;
  if (user?.role === "teacher") return <TeacherNavbar />;
  if (user?.role === "principal") return <PrincipalNavbar />;

  return <Navbar />;
};

export default DynamicNavbar;