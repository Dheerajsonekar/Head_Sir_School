'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  GraduationCap,
  Users,
  ClipboardList,
  BarChart3,
  Loader2
} from 'lucide-react';
import { useState } from 'react';

const PrincipalSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const menuItems = [
    { href: '/principal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/principal/teachers', label: 'Manage Teachers', icon: Users },
    { href: '/principal/students', label: 'Manage Students', icon: GraduationCap },
    { href: '/principal/tasks', label: 'Assign Tasks', icon: ClipboardList },
    { href: '/principal/reports', label: 'Reports', icon: BarChart3 },
    { href: '/principal/profile', label: 'Profile', icon: User },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    // Don't show loading if it's the current page
    if (pathname === href) {
      return;
    }

    // Set loading state for this specific link
    setLoadingLink(href);
    
    // Close mobile menu when link is clicked
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }

    // Navigate programmatically to handle loading state
    e.preventDefault();
    router.push(href);

    // Clear loading state after a reasonable timeout (fallback)
    setTimeout(() => {
      setLoadingLink(null);
    }, 3000);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Loading Overlay - positioned to cover only main content area, avoiding navbar */}
      {loadingLink && (
        <div className="fixed top-22 left-0 lg:left-64 right-0 bottom-0 bg-gray-50 z-[60] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading {menuItems.find(item => item.href === loadingLink)?.label?.toLowerCase() || 'page'}...
            </p>
          </div>
        </div>
      )}

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
              const isLoading = loadingLink === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(item.href, e)}
                  className={`
                    flex items-center justify-between px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive
                      ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                    }
                    ${isLoading ? 'opacity-75 cursor-not-allowed' : 'active:bg-purple-100 touch-manipulation'}
                  `}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin text-purple-600" />
                    ) : (
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'}`} />
                    )}
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                  {!isLoading && (
                    <ChevronRight className={`w-4 h-4 transition-transform flex-shrink-0 ${isActive ? 'text-purple-600' : 'text-gray-300 group-hover:text-purple-500'}`} />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default PrincipalSidebar;