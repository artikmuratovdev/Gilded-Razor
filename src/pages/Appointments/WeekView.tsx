import type { Appointment } from '@/types';
import { addDays, format, isSameDay, startOfWeek } from 'date-fns';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '../../lib/utils';

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

interface WeekViewProps {
  selectedDate: Date;
  appointments: Appointment[];
}

export const WeekView = ({ selectedDate, appointments }: WeekViewProps) => {
  const navigate = useNavigate();
  const start = startOfWeek(selectedDate, { weekStartsOn: 1 });

  const handlePlusClick = (time: string, dateObj: Date) => {
    const dateFormatted = format(dateObj, 'yyyy-MM-dd');
    let pTime = time.split(' ')[0];
    const modifier = time.split(' ')[1];
    let [hours, minutes] = pTime.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = (parseInt(hours) + 12).toString();
    const timeFormatted = `${hours.padStart(2, '0')}:${minutes}`;

    navigate(`?booking=new&date=${dateFormatted}&time=${timeFormatted}`);
  };

  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(start, i);
    return {
      dateObj: date,
      day: format(date, 'EEE'),
      date: format(date, 'd'),
    };
  });

  return (
    <div className='w-full'>
      {/* Mobile Week View: Day-by-day list */}
      <div className='sm:hidden space-y-6'>
        {daysOfWeek.map((d) => {
          const isSelected = isSameDay(d.dateObj, selectedDate);
          const dayAppointments = appointments.filter((a) => a.date === d.date);

          return (
            <div key={d.date} className='space-y-3'>
              <div
                className={cn(
                  'flex items-center justify-between p-3 rounded-xl border',
                  isSelected
                    ? 'bg-primary/10 border-primary/20'
                    : 'bg-surface/40 border-white/5',
                )}
              >
                <div className='flex items-center gap-3'>
                  <span
                    className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                      isSelected
                        ? 'bg-primary text-background'
                        : 'bg-white/5 text-white',
                    )}
                  >
                    {d.date}
                  </span>
                  <div>
                    <p className='text-xs font-bold uppercase text-gray-400'>
                      {d.day}
                    </p>
                    <p className='text-[10px] text-gray-500'>
                      {dayAppointments.length} ta uchrashuv
                    </p>
                  </div>
                </div>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => handlePlusClick('09:00 AM', d.dateObj)}
                  className='h-8 w-8 rounded-full bg-white/5'
                >
                  <Plus className='w-4 h-4' />
                </Button>
              </div>

              <div className='space-y-2 pl-4 border-l-2 border-white/5 ml-4'>
                {dayAppointments.length > 0 ? (
                  dayAppointments.map((appt) => (
                    <div
                      key={appt.id}
                      className={cn(
                        'rounded-xl p-3 border shadow-md flex items-center justify-between group',
                        appt.color,
                      )}
                    >
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <span className='text-[10px] font-bold bg-black/20 px-1.5 py-0.5 rounded text-white/90'>
                            {appt.time}
                          </span>
                          <h4 className='font-bold text-sm text-white truncate'>
                            {appt.client}
                          </h4>
                        </div>
                        <p className='text-xs text-white/70 truncate'>
                          {appt.service}
                        </p>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-white/40'
                      >
                        <Plus className='h-4 w-4 rotate-45' />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className='text-[10px] text-gray-600 italic py-2'>
                    Bu kunda uchrashuvlar yo'q
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet/Desktop View: Grid */}
      <Card className='hidden sm:block overflow-hidden bg-surface/50 border-white/5 w-full'>
        <div className='overflow-x-auto custom-scrollbar w-full'>
          <div className='min-w-[700px]'>
            <div
              className='grid border-b border-white/5 bg-surface sticky top-0 z-20'
              style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}
            >
              <div className='p-4 border-r border-white/5 flex items-center justify-center text-xs font-bold text-gray-500 uppercase'>
                Vaqt
              </div>
              {daysOfWeek.map((d) => {
                const isSelected = isSameDay(d.dateObj, selectedDate);
                return (
                  <div
                    key={d.day}
                    className={cn(
                      'p-4 border-r border-white/5 last:border-r-0 flex flex-col items-center justify-center gap-1',
                      isSelected ? 'bg-primary/5' : '',
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs font-bold uppercase',
                        isSelected ? 'text-primary' : 'text-gray-500',
                      )}
                    >
                      {d.day}
                    </span>
                    <span
                      className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                        isSelected
                          ? 'bg-primary text-background'
                          : 'text-white',
                      )}
                    >
                      {d.date}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className='relative'>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className='grid min-h-[100px] border-b border-white/5 last:border-b-0'
                  style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}
                >
                  <div className='p-4 border-r border-white/5 text-xs text-gray-500 font-medium text-center sticky left-0 bg-surface/95 backdrop-blur-sm z-10'>
                    {time}
                  </div>
                  {daysOfWeek.map((d) => {
                    const dayAppointments = appointments.filter(
                      (a) => a.date === d.date && a.time === time,
                    );

                    const isSelected = isSameDay(d.dateObj, selectedDate);

                    return (
                      <div
                        key={d.day}
                        className={cn(
                          'border-r border-white/5 last:border-r-0 p-1 relative group transition-colors',
                          isSelected ? 'bg-primary/[0.02]' : '',
                        )}
                      >
                        {dayAppointments.map((appt) => (
                          <div
                            key={appt.id}
                            className={cn(
                              'mb-1 rounded-lg p-2 border text-xs shadow-md cursor-pointer hover:brightness-110 transition-all',
                              appt.color,
                            )}
                          >
                            <div className='font-bold truncate'>
                              {appt.client}
                            </div>
                            <div className='opacity-80 truncate text-[10px]'>
                              {appt.service}
                            </div>
                          </div>
                        ))}
                        {dayAppointments.length === 0 && (
                          <div className='opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center pointer-events-none'>
                            <button
                              onClick={() => handlePlusClick(time, d.dateObj)}
                              className='pointer-events-auto h-6 w-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all'
                            >
                              <Plus className='w-3 h-3' />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
