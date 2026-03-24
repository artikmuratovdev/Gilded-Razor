import { expensesSubItems, menuItems, staffSubItems } from '@/constants/menuItems';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
}

export const Sidebar = ({ currentPage, onNavigate, isOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isStaffActive = location.pathname.startsWith('/staff');
  const isExpensesActive = location.pathname.startsWith('/expenses');

  const [staffOpen, setStaffOpen] = useState(isStaffActive);
  const [expensesOpen, setExpensesOpen] = useState(isExpensesActive);


  const handleMainItemClick = (item: (typeof menuItems)[number]) => {
    if (item.id === 'staff') {
      setStaffOpen((prev) => !prev);
      return;
    }
    if (item.id === 'expenses') {
      setExpensesOpen((prev) => !prev);
      return;
    }
    onNavigate(item.id);
  };

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
            J
          </div>
          <div>
            <h1 className='font-bold text-lg tracking-tight text-white'>
              Jasur Barber
            </h1>
            <p className='text-[10px] font-bold uppercase tracking-widest text-gray-600'>
              Admin Paneli
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 py-2 px-3 space-y-1 overflow-y-auto custom-scrollbar'>
        {menuItems.slice(0, 8).map((item) => {
          const isStaff = item.id === 'staff';
          const isExpenses = item.id === 'expenses';
          const isExpandable = isStaff || isExpenses;
          const isParentActive = isStaff ? isStaffActive : isExpenses ? isExpensesActive : currentPage === item.id;
          const isExpanded = isStaff ? staffOpen : isExpenses ? expensesOpen : false;

          return (
            <div key={item.id}>
              <button
                onClick={() => handleMainItemClick(item)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group',
                  isParentActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-white hover:bg-white/5 hover:text-primary',
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5',
                    isParentActive
                      ? 'text-primary'
                      : 'group-hover:text-primary transition-colors',
                  )}
                />
                <span className='font-medium text-sm flex-1 text-left text-gold'>{item.label}</span>
                {isExpandable && (
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      isExpanded ? 'rotate-180' : 'rotate-0',
                      isParentActive ? 'text-primary' : 'text-gray-500 group-hover:text-white',
                    )}
                  />
                )}
              </button>

              {/* Sub-panel for Jamoa */}
              {isStaff && (
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    staffOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
                  )}
                >
                  <div className='ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-3'>
                    {staffSubItems.map((sub) => {
                      const isSubActive = sub.id === 'staff'
                        ? location.pathname === '/staff'
                        : location.pathname === sub.path;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            navigate(sub.path);
                            onNavigate(sub.id);
                          }}
                          className={cn(
                            'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-150 group text-sm',
                            isSubActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-white hover:bg-white/5 hover:text-primary',
                          )}
                        >
                          <sub.icon
                            className={cn(
                              'h-4 w-4 shrink-0',
                              isSubActive ? 'text-primary' : 'group-hover:text-primary transition-colors',
                            )}
                          />
                          <span className='font-medium'>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sub-panel for Xarajatlar */}
              {isExpenses && (
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    expensesOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0',
                  )}
                >
                  <div className='ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-3'>
                    {expensesSubItems.map((sub) => {
                      const isSubActive = location.pathname === sub.path;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            navigate(sub.path);
                            onNavigate(sub.id);
                          }}
                          className={cn(
                            'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-150 group text-sm',
                            isSubActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-white hover:bg-white/5 hover:text-primary',
                          )}
                        >
                          <sub.icon
                            className={cn(
                              'h-4 w-4 shrink-0',
                              isSubActive ? 'text-primary' : 'group-hover:text-primary transition-colors',
                            )}
                          />
                          <span className='font-medium'>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
