import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

interface AppointmentsToolbarProps {
  view: 'day' | 'week' | 'list';
  onViewChange: (view: 'day' | 'week' | 'list') => void;
}

export const AppointmentsToolbar = ({
  view,
  onViewChange,
}: AppointmentsToolbarProps) => {
  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
      <div className='flex items-center gap-4 bg-surface p-2 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto'>
        <Button variant='ghost' size='icon' className='h-8 w-8 shrink-0'>
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <div className='flex items-center gap-2 px-2 flex-1 justify-center md:justify-start'>
          <CalendarIcon className='h-4 w-4 text-primary' />
          <span className='text-sm font-bold text-white whitespace-nowrap'>
            Oct 24 - Oct 30, 2023
          </span>
        </div>
        <Button variant='ghost' size='icon' className='h-8 w-8 shrink-0'>
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <div className='hidden md:flex items-center bg-surface px-3 py-2 rounded-xl border border-white/5 focus-within:border-primary transition-all max-w-lg min-w-md'>
          <Search className='h-4 w-4 text-gray-500' />
          <input
            type='text'
            placeholder='Qidirish...'
            className='bg-transparent border-none outline-none text-md ml-2 w-full text-gray-200 placeholder-gray-500'
          />
        </div>
        <Button variant='secondary' size='icon' className='md:hidden'>
          <Search className='h-4 w-4' />
        </Button>
        <Button variant='secondary' className='gap-2 hidden sm:flex'>
          <Filter className='h-4 w-4' /> Filter
        </Button>

        <div className='bg-surface p-1 rounded-lg border border-white/5 flex text-xs font-medium'>
          <button
            onClick={() => onViewChange('list')}
            className={cn(
              'px-3 py-1.5 rounded-md transition-all',
              view === 'list'
                ? 'bg-primary text-background shadow-sm font-bold'
                : 'text-gray-400 hover:text-white',
            )}
          >
            Ro'yxat
          </button>
          <button
            onClick={() => onViewChange('day')}
            className={cn(
              'px-3 py-1.5 rounded-md transition-all',
              view === 'day'
                ? 'bg-primary text-background shadow-sm font-bold'
                : 'text-gray-400 hover:text-white',
            )}
          >
            Kun
          </button>
          <button
            onClick={() => onViewChange('week')}
            className={cn(
              'px-3 py-1.5 rounded-md transition-all',
              view === 'week'
                ? 'bg-primary text-background shadow-sm font-bold'
                : 'text-gray-400 hover:text-white',
            )}
          >
            Hafta
          </button>
        </div>
      </div>
    </div>
  );
};
