// components/Navbar.tsx
"use client";

import StudentSidebar from "./StudentSidebar";
import TeacherSidebar from  "./TeacherSidebar";
import PrincipalSidebar from "./PrincipalSidebar";
import Navbar from "./Navbar";
import { useAuth } from "../context/authContext";

const DynamicSidebar = () => {
  const { user } = useAuth();

  if (user?.role === "student") return <StudentSidebar />;
  if (user?.role === "teacher") return <TeacherSidebar/>;
  if (user?.role === "principal") return <PrincipalSidebar />;

  return <Navbar />;
};

export default DynamicSidebar;
