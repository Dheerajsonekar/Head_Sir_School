'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  DollarSign, 
  FileText, 
  Calendar,
  User,
  ChevronRight,
  Trophy
} from 'lucide-react';

const StudentSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/courses', label: 'My Courses', icon: BookOpen },
    { href: '/student/fees', label: 'Fees', icon: DollarSign },
    { href: '/student/results', label: 'Results', icon: FileText },
    { href: '/student/attendance', label: 'Attendance', icon: Calendar },
    { href: '/student/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-xl border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Study Center</h2>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-purple-600' : 'text-gray-300 group-hover:text-purple-500'}`} />
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-purple-700 font-medium">Academic Progress</p>
          </div>
          <p className="text-xs text-purple-600">Current GPA: 3.8/4.0</p>
          <div className="w-full bg-purple-200 rounded-full h-1 mt-2">
            <div className="bg-purple-600 h-1 rounded-full w-4/5"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StudentSidebar;