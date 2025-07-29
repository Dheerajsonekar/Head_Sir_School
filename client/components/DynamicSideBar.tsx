// components/DynamicSideBar.tsx
"use client";

import StudentSidebar from "./StudentSidebar";
import TeacherSidebar from  "./TeacherSidebar";
import PrincipalSidebar from "./PrincipalSidebar";
import Navbar from "./Navbar";
import { useAuth } from "@/context/authContext";

const DynamicSidebar = () => {
  const { user, loading, initialized } = useAuth();

  // Show loading skeleton while auth is being checked
  if (!initialized || loading) {
    return (
      <aside className="w-64 min-h-screen bg-white shadow-xl border-r border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            {/* Skeleton loading */}
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </aside>
    );
  }

  // Render appropriate sidebar based on user role
  if (user?.role === "student") return <StudentSidebar />;
  if (user?.role === "teacher") return <TeacherSidebar/>;
  if (user?.role === "principal") return <PrincipalSidebar />;

  // Fallback to regular navbar if no user or unknown role
  return <Navbar />;
};

export default DynamicSidebar;