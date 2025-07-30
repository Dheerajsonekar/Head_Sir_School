"use client";

import { usePathname } from "next/navigation";
import { useNavigationLoading } from "@/hooks/useNavigationLoading";
import { useAuth } from "@/context/authContext";

// Import different navbars
import StudentNavbar from "./StudentNavbar";
import TeacherNavbar from "./TeacherNavbar";
import PrincipalNavbar from "./PrincipalNavbar";
import Navbar from "./Navbar";

const DynamicNavbar = () => {
  const pathname = usePathname();
  const { startNavigation } = useNavigationLoading();
  const { user } = useAuth();

  const hideNavbarRoutes = [
    '/student/login',
    '/teacher/login',
    '/principal/login',
    '/admin/login',
  ];

  const shouldHideNavbar = hideNavbarRoutes.some(route => pathname.startsWith(route));

  if (shouldHideNavbar) {
    return null;
  }

  if ( user?.role === 'student') {
    return <StudentNavbar  />;
  }

  if (user?.role === 'teacher') {
    return <TeacherNavbar  />;
  }

  if ( user?.role === 'principal') {
    return <PrincipalNavbar  />;
  }

  // fallback to default before login
  return <Navbar onNavigate={startNavigation} />;
};

export default DynamicNavbar;
