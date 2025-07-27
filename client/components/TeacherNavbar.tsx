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

        
        
        <LogoutButton />
      </div>
    </nav>
  );
}