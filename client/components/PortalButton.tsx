"use client";

import { Loader2 } from "lucide-react";
import { usePortalNavigation } from "../hooks/usePortalNavigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PortalButtonProps {
  type: 'student' | 'teacher' | 'principal';
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isMobile?: boolean;
}

export const PortalButton = ({ 
  type, 
  icon, 
  children, 
  className = "", 
  onClick,
  isMobile = false 
}: PortalButtonProps) => {
  const { navigateToPortal, isPortalLoading } = usePortalNavigation();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    if (onClick) onClick();
    setClicked(true);
    
    // Show immediate feedback
    setTimeout(() => {
      navigateToPortal(type);
    }, 50); // Very small delay for visual feedback
  };

  // Handle mouse enter for even faster preloading
  const handleMouseEnter = () => {
    const routes = {
      student: '/student/login',
      teacher: '/teacher/login', 
      principal: '/principal/login'
    };
    router.prefetch(routes[type]);
  };

  const isLoading = isPortalLoading(type) || clicked;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={isLoading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-medium
        transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        icon
      )}
      <span className={isMobile ? "" : "hidden xl:inline"}>
        {isLoading ? `Loading ${type}...` : children}
      </span>
      {!isMobile && (
        <span className="xl:hidden">
          {isLoading ? "Loading..." : type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      )}
    </button>
  );
};
