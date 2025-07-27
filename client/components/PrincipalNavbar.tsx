'use client';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { Bell, Settings, User } from 'lucide-react';

const PrincipalNavbar = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg border-b border-blue-700">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Principal Dashboard</h1>
            <p className="text-blue-200 text-sm">Dr. Rajendra Prasad vidyalaya</p>
          </div>
        </div>
        
        
        
        <LogoutButton />
      </div>
    </header>
  );
};

export default PrincipalNavbar;