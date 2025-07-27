'use client';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { BookOpen, Bell, Calendar, User } from 'lucide-react';

const StudentNavbar = () => {
  return (
    <header className="w-full bg-gradient-to-r from-purple-700 to-purple-800 text-white shadow-lg border-b border-purple-600">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Student Portal</h1>
            <p className="text-purple-200 text-sm">Learning Dashboard</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/student/dashboard" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
          >
            <Calendar className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/student/courses" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses</span>
          </Link>
          <Link 
            href="/student/profile" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
          <button className="relative p-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </nav>
        
        <LogoutButton />
      </div>
    </header>
  );
};

export default StudentNavbar;