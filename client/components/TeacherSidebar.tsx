'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  UserCheck, 
  User,
  ChevronRight,
  Clock
} from 'lucide-react';

const TeacherSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/teacher/classes', label: 'My Classes', icon: BookOpen },
    { href: '/teacher/students', label: 'Students', icon: GraduationCap },
    { href: '/teacher/attendance', label: 'Attendance', icon: UserCheck },
    { href: '/teacher/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-xl border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Teaching Hub</h2>
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
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-green-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-green-600' : 'text-gray-300 group-hover:text-green-500'}`} />
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-green-600" />
            <p className="text-sm text-green-700 font-medium">Today's Schedule</p>
          </div>
          <p className="text-xs text-green-600">Next class: Math - 10:30 AM</p>
          <div className="w-full bg-green-200 rounded-full h-1 mt-2">
            <div className="bg-green-600 h-1 rounded-full w-3/5"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TeacherSidebar;