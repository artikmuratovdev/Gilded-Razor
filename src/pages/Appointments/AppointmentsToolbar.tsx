import { addDays, format, subDays } from 'date-fns';
import { uz } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from '../../components/ui/calendar';
import { Button } from '../../components/ui/Button';

interface AppointmentsToolbarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

const STATUS_OPTIONS = [
  { value: '', label: 'Barchasi' },
  { value: 'pending', label: 'Kutilmoqda' },
  { value: 'confirmed', label: 'Tasdiqlangan' },
  { value: 'cancelled', label: 'Bekor qilingan' },
  { value: 'completed', label: 'Bajarilgan' },
  { value: 'no_show', label: 'Kelmagan' },
] as const;

export const AppointmentsToolbar = ({
  selectedDate,
  onDateChange,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: AppointmentsToolbarProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const [search, setSearch] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrev = () => {
    onDateChange(subDays(selectedDate, 1));
  };

  const handleNext = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const getDateLabel = () => {
    return format(selectedDate, 'd MMMM, yyyy', { locale: uz });
  };

  const isToday =
    format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        {/* Left: Date navigation */}
        <div className='flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar'>
          <div className='flex items-center bg-surface p-1.5 rounded-xl border border-white/5 gap-1'>
            <Button
              variant='ghost'
              size='icon'
              onClick={handlePrev}
              className='h-8 w-8 shrink-0 hover:bg-white/5 rounded-lg'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>

            {/* Calendar trigger */}
            <button
              ref={triggerRef}
              onClick={() => {
                if (triggerRef.current) {
                  const rect = triggerRef.current.getBoundingClientRect();
                  setPopoverPos({ top: rect.bottom + 8, left: rect.left });
                }
                setCalendarOpen((v) => !v);
              }}
              className='flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer group'
            >
              <CalendarIcon className='h-4 w-4 text-primary group-hover:scale-110 transition-transform' />
              <span className='text-sm font-bold text-white whitespace-nowrap'>
                {getDateLabel()}
              </span>
            </button>

            <Button
              variant='ghost'
              size='icon'
              onClick={handleNext}
              className='h-8 w-8 shrink-0 hover:bg-white/5 rounded-lg'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          {/* Today button */}
          {!isToday && (
            <Button
              variant='ghost'
              size='sm'
              onClick={handleToday}
              className='text-xs text-primary hover:text-primary border border-primary/20 hover:bg-primary/10 rounded-lg px-3 h-8 shrink-0 animate-in fade-in slide-in-from-left-2 duration-200'
            >
              Bugun
            </Button>
          )}
        </div>

        <div className='flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2'>
        <div className='flex items-center bg-surface px-3 py-2.5 rounded-xl border border-white/5 focus-within:border-primary transition-all flex-1'>
          <Search className='h-4 w-4 text-gray-500 shrink-0' />
          <input
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder='Mijoz yoki xizmat bo`yicha qidirish...'
            className='bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-200 placeholder-gray-500'
          />
        </div>

        {/* Status filter select (mobile — full width, desktop — auto) */}
        <div className='relative'>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className='appearance-none w-full h-10 pl-3 pr-8 rounded-xl border border-white/10 bg-surface text-sm text-gray-300 focus:outline-none focus:border-primary transition-colors cursor-pointer'
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className='bg-surface text-gray-200'>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400' />
        </div>
      </div>
      </div>

      {/* Search + Status Filter Row */}
      

      {/* Calendar Popover */}
      {calendarOpen && (
        <div
          ref={popoverRef}
          className='animate-in fade-in slide-in-from-top-2 duration-200'
          style={{ position: 'fixed', top: popoverPos.top, left: popoverPos.left, zIndex: 9999 }}
        >
          <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={(date) => {
              if (date) {
                onDateChange(date);
                setCalendarOpen(false);
              }
            }}  
        weekStartsOn={1}
        locale={uz}
        showOutsideDays
        className='p-2'
      />
        </div>
      )}
    </div>
  );
};