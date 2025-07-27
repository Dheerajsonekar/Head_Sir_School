'use client';

import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { GraduationCap, Bell, Calendar, User } from 'lucide-react';

export default function TeacherNavbar() {
  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-800 text-white shadow-lg border-b border-green-600">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Teacher Panel</h1>
            <p className="text-green-200 text-sm">Education Management</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/teacher/dashboard" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <Calendar className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/teacher/students" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Students</span>
          </Link>
          <Link 
            href="/teacher/attendance" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <User className="w-4 h-4" />
            <span>Attendance</span>
          </Link>
          <button className="relative p-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
        
        <LogoutButton />
      </div>
    </nav>
  );
}