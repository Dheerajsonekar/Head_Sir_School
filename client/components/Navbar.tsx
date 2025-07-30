"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown, User, Shield, GraduationCap } from "lucide-react";
import { PortalButton } from "./PortalButton";

interface NavbarProps {
  onNavigate?: (loading: boolean) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleAdminDropdown = () => setIsAdminDropdownOpen((prev) => !prev);

  const isActive = (path: string) => pathname === path;

  // Enhanced navigation handler for regular pages
  const handleNavClick = (path: string, callback?: () => void) => {
    if (path !== pathname) {
      // Trigger loading state
      if (onNavigate) onNavigate(true);

      // Execute callback (like closing menus) immediately
      if (callback) callback();

      // Navigate
      router.push(path);
    } else if (callback) {
      callback();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900">
                Dr. Rajendra Prasad
              </div>
              <div className="text-xs font-medium text-gray-600">
                Purva Madhyamik Vidyalaya
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('/')}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive('/')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              Home
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive('/about')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              About
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
            </button>

            <button
              onClick={() => handleNavClick('/admissions')}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive('/admissions')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              Admissions
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive('/contact')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              Contact
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
            </button>

            <div className="hidden lg:flex items-center space-x-3">
              {/* Student Portal - Using PortalButton */}
              {/* Student Portal - Using PortalButton for consistency */}
              <PortalButton
                type="student"
                icon={<User size={16} />}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              >
                <span className="hidden xl:inline">Student Portal</span>
                <span className="xl:hidden">Student</span>
              </PortalButton>


              {/* Admin Portal with Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleAdminDropdown}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                >
                  <Shield size={16} />
                  <span className="hidden xl:inline">Admin Portal</span>
                  <span className="xl:hidden">Admin</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isAdminDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Admin Dropdown Menu */}
                {isAdminDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
                    <PortalButton
                      type="teacher"
                      icon={<User size={16} className="text-green-600 group-hover:scale-110 transition-transform" />}
                      className="w-full justify-start text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 shadow-none hover:shadow-none transform-none hover:scale-100 rounded-none hover:rounded-lg px-4 py-3"
                      onClick={() => setIsAdminDropdownOpen(false)}
                      isMobile={true}
                    >
                      Teacher Login
                    </PortalButton>

                    <PortalButton
                      type="principal"
                      icon={<Shield size={16} className="text-purple-600 group-hover:scale-110 transition-transform" />}
                      className="w-full justify-start text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:text-purple-700 shadow-none hover:shadow-none transform-none hover:scale-100 rounded-none hover:rounded-lg px-4 py-3"
                      onClick={() => setIsAdminDropdownOpen(false)}
                      isMobile={true}
                    >
                      Principal Login
                    </PortalButton>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white rounded-b-2xl shadow-2xl border-t border-gray-100 mx-4 mb-4">
            <div className="px-6 py-4 space-y-3">
              {/* Mobile Navigation Links */}
              <button
                onClick={() => handleNavClick('/', () => setIsOpen(false))}
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${isActive('/')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('/about', () => setIsOpen(false))}
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${isActive('/about')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
              >
                About
              </button>

              <button
                onClick={() => handleNavClick('/admissions', () => setIsOpen(false))}
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${isActive('/admissions')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
              >
                Admissions
              </button>

              <button
                onClick={() => handleNavClick('/contact', () => setIsOpen(false))}
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${isActive('/contact')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
              >
                Contact
              </button>

              {/* Mobile Student Portal - Using PortalButton */}
              <PortalButton
                type="student"
                icon={<User size={16} />}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg w-full justify-start"
                onClick={() => setIsOpen(false)}
                isMobile={true}
              >
                Student Portal
              </PortalButton>

              {/* Mobile Admin Portal */}
              <div className="space-y-2">
                <button
                  onClick={toggleAdminDropdown}
                  className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    <Shield size={16} />
                    Admin Portal
                  </span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isAdminDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mobile Admin Dropdown - Using PortalButtons */}
                {isAdminDropdownOpen && (
                  <div className="ml-4 space-y-2">
                    <PortalButton
                      type="teacher"
                      icon={<User size={16} />}
                      className="bg-gradient-to-r from-green-50 to-green-100 text-green-700 hover:from-green-100 hover:to-green-200 w-full justify-start"
                      onClick={() => {
                        setIsAdminDropdownOpen(false);
                        setIsOpen(false);
                      }}
                      isMobile={true}
                    >
                      Teacher Login
                    </PortalButton>

                    <PortalButton
                      type="principal"
                      icon={<Shield size={16} />}
                      className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 hover:from-purple-100 hover:to-purple-200 w-full justify-start"
                      onClick={() => {
                        setIsAdminDropdownOpen(false);
                        setIsOpen(false);
                      }}
                      isMobile={true}
                    >
                      Principal Login
                    </PortalButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;