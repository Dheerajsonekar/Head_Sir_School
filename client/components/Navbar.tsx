"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown, User, Shield, GraduationCap } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleAdminDropdown = () => setIsAdminDropdownOpen((prev) => !prev);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
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
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              href="/"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive('/')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              Home
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive('/about')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              About
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
            </Link>
            <Link
              href="/admissions"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive('/admissions')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              Admissions
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive('/contact')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
            >
              Contact
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
            </Link>


            <div className="hidden lg:flex items-center space-x-3">
              {/* Student Portal */}
              <Link
                href="/student/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
              >
                <User size={16} />
                <span className="hidden xl:inline">Student Portal</span>
                <span className="xl:hidden">Student</span>
              </Link>

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
                    <Link
                      href="/teacher/login"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 transition-all duration-200 group"
                      onClick={() => setIsAdminDropdownOpen
                        (false)}
                    >
                      <User size={16} className="text-green-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Teacher Login</span>
                    </Link>
                    <Link
                      href="/principal/login"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 hover:text-purple-700 transition-all duration-200 group"
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      <Shield size={16} className="text-purple-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Principal Login</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Portal Buttons */}


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
              <Link
                href="/"
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${isActive('/')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${isActive('/about')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/admissions"
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${isActive('/admissions')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Admissions
              </Link>
              <Link
                href="/contact"
                className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200 ${isActive('/contact')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Student Portal */}
              <Link
                href="/student/login"
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                <User size={16} />
                Student Portal
              </Link>

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

                {/* Mobile Admin Dropdown */}
                {isAdminDropdownOpen && (
                  <div className="ml-4 space-y-2">
                    <Link
                      href="/teacher/login"
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 font-medium"
                      onClick={() => {
                        setIsAdminDropdownOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      <User size={16} />
                      Teacher Login
                    </Link>
                    <Link
                      href="/principal/login"
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200 font-medium"
                      onClick={() => {
                        setIsAdminDropdownOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      <Shield size={16} />
                      Principal Login
                    </Link>
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