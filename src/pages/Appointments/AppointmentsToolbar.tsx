import { addDays, format, subDays } from 'date-fns';
import { uz } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
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
              onClick={() => setCalendarOpen((v) => !v)}
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

        {/* Right: View Toggle */}
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className='appearance-none h-9 pl-3 pr-8 rounded-xl border border-white/10 bg-surface text-sm text-gray-300 focus:outline-none focus:border-primary transition-colors cursor-pointer hover:border-white/20'
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
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2'>
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
        <div className='relative sm:hidden'>
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

      {/* Calendar Popover */}
      {calendarOpen && (
        <div
          ref={popoverRef}
          className='absolute top-[calc(100%+8px)] left-0 z-50 animate-in fade-in slide-in-from-top-2 duration-200'
          style={{ position: 'fixed', zIndex: 9999 }}
        >
          <CalendarPopover
            selectedDate={selectedDate}
            onSelect={(date) => {
              if (date) {
                onDateChange(date);
                setCalendarOpen(false);
              }
            }}
            onClose={() => setCalendarOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

/* ─── Calendar Popover Component ─── */
interface CalendarPopoverProps {
  selectedDate: Date;
  onSelect: (date: Date | undefined) => void;
  onClose: () => void;
}

const CalendarPopover = ({
  selectedDate,
  onSelect,
  onClose,
}: CalendarPopoverProps) => {
  return (
    <div
      className='rounded-2xl border border-white/10 shadow-2xl overflow-hidden'
      style={{
        background: 'hsl(var(--color-surface, 225 15% 12%))',
        backdropFilter: 'blur(20px)',
        minWidth: '280px',
      }}
    >
      {/* Header */}
      <div className='flex items-center justify-between px-4 pt-3 pb-1'>
        <span className='text-xs font-bold text-gray-400 uppercase tracking-wider'>
          Sana tanlash
        </span>
        <button
          onClick={onClose}
          className='h-6 w-6 rounded-md flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all'
        >
          <X className='h-3.5 w-3.5' />
        </button>
      </div>

      {/* DayPicker */}
      <DayPicker
        mode='single'
        selected={selectedDate}
        onSelect={onSelect}
        weekStartsOn={1}
        locale={uz}
        showOutsideDays
        classNames={{
          root: 'rdp-custom',
          month: 'rdp-month',
          month_caption: 'rdp-caption',
          caption_label: 'rdp-caption-label',
          nav: 'rdp-nav',
          button_previous: 'rdp-nav-btn',
          button_next: 'rdp-nav-btn',
          month_grid: 'rdp-table',
          weekdays: 'rdp-head_row',
          weekday: 'rdp-head_cell',
          week: 'rdp-row',
          day: 'rdp-cell',
          day_button: 'rdp-day',
          selected: 'rdp-day-selected',
          today: 'rdp-day-today',
          outside: 'rdp-day-outside',
          disabled: 'rdp-day-disabled',
        }}
        style={
          {
            '--rdp-accent-color': 'var(--color-primary, #c9a96e)',
            '--rdp-background-color': 'transparent',
          } as React.CSSProperties
        }
      />

      {/* Footer */}
      <div className='px-4 pb-3 flex justify-between items-center border-t border-white/5 pt-2'>
        <button
          onClick={() => onSelect(new Date())}
          className='text-xs font-semibold text-primary hover:text-primary/80 transition-colors'
        >
          Bugun
        </button>
        <button
          onClick={onClose}
          className='text-xs text-gray-500 hover:text-gray-300 transition-colors'
        >
          Yopish
        </button>
      </div>
    </div>
  );
};
