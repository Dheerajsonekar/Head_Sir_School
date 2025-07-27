"use client";

import { useAuth } from "@/context/authContext";
import { useState } from "react";

const LogoutButton = () => {
  const { logout, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    setIsLoggingOut(true);
    try {
      console.log('Starting logout process...');
      await logout();
      console.log('Logout completed');
      // The logout function handles the redirect and page reload
    } catch (err) {
      console.error("Logout error:", err);
      // Reset loading state if logout fails
      setIsLoggingOut(false);
      alert("Logout failed. Please try again.");
    }
  };

  // Don't render if no user is logged in
  if (!user) {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
    >
      {isLoggingOut && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      )}
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;