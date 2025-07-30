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
  Trophy,
  Menu,
  X,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { useState } from 'react';

const TeacherSidebar = () => {
  const pathname = usePathname();
   const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/teacher/task', label: 'Task', icon: UserCheck },
    { href: '/teacher/classes', label: 'My Classes', icon: BookOpen },
    { href: '/teacher/students', label: 'Students', icon: GraduationCap },
    { href: '/teacher/attendance', label: 'Attendance', icon: UserCheck },
    { href: '/teacher/profile', label: 'Profile', icon: User },
  ];

   const handleLinkClick = () => {
    // Close mobile menu when link is clicked
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button - positioned above sidebar */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-600" />
        ) : (
          <Menu className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 min-h-screen bg-white shadow-xl border-r border-gray-200
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-6 h-full overflow-y-auto pt-16 lg:pt-6">
          
          <nav className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center justify-between px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                    }
                    active:bg-purple-100 touch-manipulation
                  `}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'}`} />
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-gray-300 group-hover:text-purple-500'}`} />
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;

