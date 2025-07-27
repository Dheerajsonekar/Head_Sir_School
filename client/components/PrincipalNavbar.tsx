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
            <p className="text-blue-200 text-sm">Administrative Control Panel</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/admin/profile" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
          <Link 
            href="/admin/settings" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <button className="relative p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </nav>
        
        <LogoutButton />
      </div>
    </header>
  );
};

export default PrincipalNavbar;