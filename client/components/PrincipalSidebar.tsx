'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  ClipboardList, 
  BarChart3, 
  User,
  ChevronRight 
} from 'lucide-react';

const PrincipalSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/principal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/principal/teachers', label: 'Manage Teachers', icon: Users },
    { href: '/principal/students', label: 'Manage Students', icon: GraduationCap },
    { href: '/principal/tasks', label: 'Assign Tasks', icon: ClipboardList },
    { href: '/principal/reports', label: 'Reports', icon: BarChart3 },
    { href: '/principal/profile', label: 'Profile', icon: User },
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
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-blue-600' : 'text-gray-300 group-hover:text-blue-500'}`} />
              </Link>
            );
          })}
        </nav>
      </div>
      
      
    </aside>
  );
};

export default PrincipalSidebar;