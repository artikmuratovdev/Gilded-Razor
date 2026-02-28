import { menuItems } from '@/constants/menuItems';
import { cn } from '../../lib/utils';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
}

export const Sidebar = ({ currentPage, onNavigate, isOpen }: SidebarProps) => {

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-72 bg-surface-light/50 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      {/* Logo */}
      <div className='h-21 flex items-center px-8 border-b border-white/5'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-linear-to-br from-primary to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20'>
            G
          </div>
          <div>
            <h1 className='font-bold text-lg tracking-tight text-white'>
              Gilded Razor
            </h1>
            <p className='text-[10px] font-bold uppercase tracking-widest text-gray-600'>
              Admin Paneli
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 py-2 px-3 space-y-1 overflow-y-auto custom-scrollbar'>
        {menuItems.slice(0,6).map(
          (
            item, // Display first 5 items for 'Main Menu'
          ) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group',
                currentPage === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white',
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5',
                  currentPage === item.id
                    ? 'text-primary'
                    : 'group-hover:text-primary transition-colors',
                )}
              />
              <span className='font-medium text-sm'>{item.label}</span>
              {/* {item.id === 'appointments' && ( // Re-add badge for appointments if needed, based on original code
                <span className='ml-auto bg-primary text-background font-bold text-[10px] px-2 py-0.5 rounded-full'>
                  12
                </span>
              )} */}
            </button>
          ),
        )}
      </nav>

      {/* Settings */}
      {/* <div className='p-4 border-t border-white/5'>
        <button
          onClick={() => onNavigate('settings')}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
            currentPage === 'settings'
              ? 'bg-primary/10 text-primary'
              : 'text-gray-500 hover:bg-white/5 hover:text-white',
          )}
        >
          <Settings
            className={cn(
              'h-5 w-5',
              currentPage === 'settings'
                ? 'text-primary'
                : 'group-hover:text-primary transition-colors',
            )}
          />
          <span className='font-medium text-sm'>Sozlamalar</span>
        </button>
      </div> */}
    </aside>
  );
};
