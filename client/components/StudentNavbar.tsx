'use client';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { BookOpen, Bell, Calendar, User } from 'lucide-react';

const StudentNavbar = () => {
  return (
    <header className="w-full bg-gradient-to-r from-purple-700 to-purple-800 text-white shadow-lg border-b border-purple-600">
      <div className="px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 md:w-6 md:h-6" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold">Student Portal</h1>
            <p className="text-purple-200 text-xs md:text-sm">Dr Rajendra Prasad </p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-1 md:space-x-2">
          
          <div className="scale-90 md:scale-100">
            <LogoutButton />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default StudentNavbar;