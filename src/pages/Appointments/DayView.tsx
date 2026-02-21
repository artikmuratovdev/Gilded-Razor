import { MoreHorizontal, Plus } from 'lucide-react';
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

const barbers = [
  {
    id: '1',
    name: 'Marcus Cole',
    avatar: 'https://picsum.photos/seed/marcus/50',
  },
  { id: '2', name: 'Alex Smith', avatar: 'https://picsum.photos/seed/alex/50' },
  { id: '3', name: 'Jay Parker', avatar: 'https://picsum.photos/seed/jay/50' },
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
    id: 3,
    barberId: '1',
    client: 'Robert Brown',
    service: 'Royal Shave',
    date: '24',
    time: '04:00 PM',
    duration: 1,
    status: 'Pending',
    price: 55,
    color: 'bg-purple-500/20 border-purple-500/50 text-purple-100',
  },
  {
    id: 4,
    barberId: '3',
    client: 'Mike K.',
    service: 'Buzz Cut',
    date: '24',
    time: '09:00 AM',
    duration: 1,
    status: 'Completed',
    price: 25,
    color: 'bg-green-500/20 border-green-500/50 text-green-100',
  },
];

export const DayView = () => {
  return (
    <Card className='overflow-hidden bg-surface/50 border-white/5 w-full'>
      <div className='overflow-x-auto custom-scrollbar w-full'>
        <div className='min-w-[600px]'>
          {/* Header Row */}
          <div className='grid grid-cols-[100px_1fr_1fr_1fr] border-b border-white/5 bg-surface sticky top-0 z-10'>
            <div className='p-4 border-r border-white/5 flex items-center justify-center text-xs font-bold text-gray-500 uppercase'>
              Vaqt
            </div>
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className='p-4 border-r border-white/5 last:border-r-0 flex items-center gap-3 justify-center'
              >
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className='w-8 h-8 rounded-full'
                />
                <span className='font-bold text-sm text-white'>
                  {barber.name}
                </span>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className='relative'>
            {timeSlots.map((time) => (
              <div
                key={time}
                className='grid grid-cols-[100px_1fr_1fr_1fr] min-h-[120px] border-b border-white/5 last:border-b-0'
              >
                {/* Time Label */}
                <div className='p-4 border-r border-white/5 text-xs text-gray-500 font-medium text-center sticky left-0 bg-surface/95 backdrop-blur-sm z-10'>
                  {time}
                </div>

                {/* Columns */}
                {barbers.map((barber) => {
                  const appt = appointments.find(
                    (a) =>
                      a.barberId === barber.id &&
                      a.time === time &&
                      a.date === '24',
                  );
                  return (
                    <div
                      key={barber.id}
                      className='border-r border-white/5 last:border-r-0 p-2 relative group hover:bg-white/[0.01] transition-colors'
                    >
                      {appt && (
                        <div
                          className={cn(
                            'absolute top-2 left-2 right-2 rounded-xl p-3 border shadow-lg cursor-pointer hover:scale-[1.02] transition-transform z-10',
                            appt.color,
                          )}
                          style={{ height: `calc(${appt.duration}00% - 16px)` }}
                        >
                          <div className='flex justify-between items-start'>
                            <span className='text-xs font-bold bg-black/20 px-1.5 py-0.5 rounded text-white/90'>
                              {appt.time}
                            </span>
                            <button className='text-white/50 hover:text-white'>
                              <MoreHorizontal className='h-4 w-4' />
                            </button>
                          </div>
                          <div className='mt-2'>
                            <h4 className='font-bold text-sm text-white leading-tight'>
                              {appt.client}
                            </h4>
                            <p className='text-xs text-white/70 mt-0.5'>
                              {appt.service}
                            </p>
                          </div>
                        </div>
                      )}
                      {/* Empty slot hover effect */}
                      {!appt && (
                        <div className='opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center pointer-events-none'>
                          <Button
                            size='sm'
                            variant='ghost'
                            className='pointer-events-auto h-8 text-xs bg-white/5 hover:bg-white/10 rounded-full'
                          >
                            <Plus className='w-3 h-3 mr-1' /> Qo'shish
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Current Time Line Indicator */}
            <div className='absolute left-[100px] right-0 top-[280px] border-t-2 border-red-500 z-0 pointer-events-none opacity-50'>
              <div className='absolute -left-[6px] -top-[5px] w-2.5 h-2.5 rounded-full bg-red-500' />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
