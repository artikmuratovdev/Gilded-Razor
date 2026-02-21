import { Plus } from 'lucide-react';
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

const daysOfWeek = [
  { day: 'Mon', date: '23' },
  { day: 'Tue', date: '24' },
  { day: 'Wed', date: '25' },
  { day: 'Thu', date: '26' },
  { day: 'Fri', date: '27' },
  { day: 'Sat', date: '28' },
  { day: 'Sun', date: '29' },
];

const appointments = [
  {
    id: 1,
    barberId: '1',
    client: 'James Wilson',
    service: 'Fade & Beard',
    date: '24',
    time: '10:00 AM',
    duration: 2,
    status: 'Confirmed',
    price: 45,
    color: 'bg-primary/20 border-primary/50 text-primary-foreground',
  },
  {
    id: 2,
    barberId: '2',
    client: 'Elena R.',
    service: 'Kids Cut',
    date: '24',
    time: '02:00 PM',
    duration: 1,
    status: 'Confirmed',
    price: 30,
    color: 'bg-blue-500/20 border-blue-500/50 text-blue-100',
  },
  {
    id: 5,
    barberId: '1',
    client: 'Sarah M.',
    service: 'Coloring',
    date: '25',
    time: '11:00 AM',
    duration: 2,
    status: 'Confirmed',
    price: 120,
    color: 'bg-orange-500/20 border-orange-500/50 text-orange-100',
  },
  {
    id: 6,
    barberId: '2',
    client: 'David L.',
    service: 'Haircut',
    date: '26',
    time: '01:00 PM',
    duration: 1,
    status: 'Confirmed',
    price: 40,
    color: 'bg-blue-500/20 border-blue-500/50 text-blue-100',
  },
];

export const WeekView = () => {
  return (
    <Card className='overflow-hidden bg-surface/50 border-white/5 w-full'>
      <div className='overflow-x-auto custom-scrollbar w-full'>
        <div className='min-w-[700px]'>
          {/* Header Row */}
          <div
            className='grid border-b border-white/5 bg-surface sticky top-0 z-20'
            style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}
          >
            <div className='p-4 border-r border-white/5 flex items-center justify-center text-xs font-bold text-gray-500 uppercase'>
              Vaqt
            </div>
            {daysOfWeek.map((d) => (
              <div
                key={d.day}
                className={cn(
                  'p-4 border-r border-white/5 last:border-r-0 flex flex-col items-center justify-center gap-1',
                  d.date === '24' ? 'bg-primary/5' : '',
                )}
              >
                <span
                  className={cn(
                    'text-xs font-bold uppercase',
                    d.date === '24' ? 'text-primary' : 'text-gray-500',
                  )}
                >
                  {d.day}
                </span>
                <span
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                    d.date === '24'
                      ? 'bg-primary text-background'
                      : 'text-white',
                  )}
                >
                  {d.date}
                </span>
              </div>
            ))}
          </div>

          {/* Grid */}
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

                  return (
                    <div
                      key={d.day}
                      className={cn(
                        'border-r border-white/5 last:border-r-0 p-1 relative group transition-colors',
                        d.date === '24' ? 'bg-primary/[0.02]' : '',
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
                          <Button
                            size='icon'
                            variant='ghost'
                            className='pointer-events-auto h-6 w-6 rounded-full bg-white/5 hover:bg-white/10'
                          >
                            <Plus className='w-3 h-3' />
                          </Button>
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
  );
};
