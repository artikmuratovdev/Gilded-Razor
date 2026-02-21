import {
  Bell,
  Download,
  Menu,
  Package,
  Plus,
  Search,
  UserPlus,
} from 'lucide-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../ui/Button';
import { Sidebar } from './Sidebar';
import { setMenuLabel } from '@/constants/menuItems';

interface MainLayoutProps {
  children: React.ReactNode;
  onNewBooking?: () => void;
  onNewStaff?: () => void;
  onNewClient?: () => void;
  onNewProduct?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onNewBooking,
  onNewStaff,
  onNewClient,
  onNewProduct,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPage = location.pathname.slice(1) || 'dashboard';

  // Dynamic Header Action Configuration
  const getHeaderAction = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'appointments':
        return {
          label: 'Yangi Bron',
          icon: Plus,
          onClick: onNewBooking || (() => {}),
        };
      case 'staff':
        return {
          label: "Xodim Qo'shish",
          icon: UserPlus,
          onClick: onNewStaff || (() => {}),
        };
      case 'clients':
        return {
          label: "Mijoz Qo'shish",
          icon: UserPlus,
          onClick: onNewClient || (() => {}),
        };
      case 'inventory':
        return {
          label: "Mahsulot Qo'shish",
          icon: Package,
          onClick: onNewProduct || (() => {}),
        };
      case 'reports':
        return {
          label: 'PDF Eksport',
          icon: Download,
          onClick: () => console.log('Exporting report...'),
        };
      default:
        return null;
    }
  };

  const headerAction = getHeaderAction();

  return (
    <div className='min-h-screen bg-background text-gray-100 flex font-sans selection:bg-primary selection:text-white'>
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          navigate(`/${page}`);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
      />

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className='flex-1 flex flex-col min-h-screen lg:pl-72 transition-all duration-300'>
        {/* Header */}
        <header className='sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between gap-4'>
          <button
            className='lg:hidden p-2 text-gray-400 hover:bg-white/5 rounded-lg'
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className='h-6 w-6' />
          </button>

          <div className='hidden sm:block'>
            <h2 className='text-2xl font-bold text-white capitalize'>
              {setMenuLabel(currentPage)?.title || 'Dashboard'}
            </h2>
            <p className='text-sm text-gray-400'>
              {setMenuLabel(currentPage)?.description || 'Dashboard description'}
            </p>
          </div>

          <div className='flex items-center gap-4 ml-auto'>
            <div className='hidden md:flex items-center bg-surface px-4 py-2.5 rounded-full border border-white/5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary w-64 transition-all shadow-sm group'>
              <Search className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
              <input
                type='text'
                placeholder='Qidirish...'
                className='bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-200 placeholder-gray-500 focus:ring-0'
              />
            </div>

            <button className='relative p-2.5 text-gray-400 hover:bg-white/5 rounded-full transition-colors'>
              <Bell className='h-6 w-6' />
              <span className='absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-background'></span>
            </button>

            {headerAction && (
              <Button
                onClick={headerAction.onClick}
                className='gap-2 shadow-glow'
              >
                <headerAction.icon className='h-5 w-5' />
                <span className='hidden sm:inline'>{headerAction.label}</span>
              </Button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className='p-6 lg:p-10 max-w-400 mx-auto w-full flex-1'>
          {children}
        </div>
      </main>
    </div>
  );
};
