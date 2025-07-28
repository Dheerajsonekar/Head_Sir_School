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
    { href: '/teacher/task', label: 'Task', icon: UserCheck },
    { href: '/teacher/classes', label: 'My Classes', icon: BookOpen },
    { href: '/teacher/students', label: 'Students', icon: GraduationCap },
    { href: '/teacher/attendance', label: 'Attendance', icon: UserCheck },
    { href: '/teacher/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-xl border-r border-gray-200">
      <div className="p-6">
        
        
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
      
      
    </aside>
  );
};

export default TeacherSidebar;