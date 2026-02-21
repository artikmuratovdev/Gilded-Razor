import { staffMembers as barbers } from '@/constants/barber';
import type { Appointment } from '@/types';
import { format } from 'date-fns';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
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

interface DayViewProps {
  selectedDate: Date;
  appointments: Appointment[];
}

export const DayView = ({ selectedDate, appointments }: DayViewProps) => {
  const navigate = useNavigate();
  const dateStr = format(selectedDate, 'd');

  const handlePlusClick = (time: string, barberId: string) => {
    const dateFormatted = format(selectedDate, 'yyyy-MM-dd');
    // Vaqtni HH:mm formatiga o'tkazish (09:00 AM -> 09:00)
    let pTime = time.split(' ')[0];
    const modifier = time.split(' ')[1];
    let [hours, minutes] = pTime.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = (parseInt(hours) + 12).toString();
    const timeFormatted = `${hours.padStart(2, '0')}:${minutes}`;

    navigate(
      `?booking=new&date=${dateFormatted}&time=${timeFormatted}&barberId=${barberId}`,
    );
  };

  return (
    <div className='w-full'>
      {/* Mobile Day View: Vertical Timeline */}
      <div className='sm:hidden space-y-4'>
        {timeSlots.map((time) => {
          const timeAppointments = appointments.filter(
            (a) => a.time === time && a.date === dateStr,
          );

          return (
            <div key={time} className='relative pl-16 min-h-[80px]'>
              {/* Time axis */}
              <div className='absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center'>
                <span className='text-[10px] font-bold text-gray-500 whitespace-nowrap bg-surface-light px-1.5 py-0.5 rounded'>
                  {time.split(' ')[0]}
                </span>
                <div className='w-px flex-1 bg-white/5 my-2'></div>
              </div>

              {/* Appointments for this slot */}
              <div className='space-y-2 pb-4'>
                {timeAppointments.length > 0 ? (
                  timeAppointments.map((appt) => {
                    const barber = barbers.find((b) => b.id === appt.barberId);
                    return (
                      <div
                        key={appt.id}
                        className={cn(
                          'rounded-xl p-3 border shadow-md relative overflow-hidden group',
                          appt.color,
                        )}
                      >
                        <div className='flex justify-between items-start'>
                          <div>
                            <h4 className='font-bold text-sm text-white leading-tight'>
                              {appt.client}
                            </h4>
                            <p className='text-xs text-white/70'>
                              {appt.service}
                            </p>
                          </div>
                          <button className='text-white/50'>
                            <MoreHorizontal className='h-4 w-4' />
                          </button>
                        </div>
                        <div className='mt-3 flex items-center gap-2 pt-2 border-t border-white/10'>
                          <img
                            src={barber?.avatar}
                            alt={barber?.name}
                            className='w-4 h-4 rounded-full'
                          />
                          <span className='text-[10px] text-white/80 font-medium'>
                            {barber?.name}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <button
                    onClick={() => handlePlusClick(time, barbers[0].id)}
                    className='w-full py-3 rounded-xl border border-dashed border-white/5 text-gray-600 hover:text-gray-400 hover:border-white/10 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2 text-xs'
                  >
                    <Plus className='w-3 h-3' /> Bo'sh vaqt
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet/Desktop View: Grid */}
      <Card className='hidden sm:block overflow-hidden bg-surface/50 border-white/5 w-full'>
        <div className='overflow-x-auto custom-scrollbar w-full'>
          <div className='min-w-[600px]'>
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

            <div className='relative'>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className='grid grid-cols-[100px_1fr_1fr_1fr] min-h-[120px] border-b border-white/5 last:border-b-0'
                >
                  <div className='p-4 border-r border-white/5 text-xs text-gray-500 font-medium text-center sticky left-0 bg-surface/95 backdrop-blur-sm z-10'>
                    {time}
                  </div>

                  {barbers.map((barber) => {
                    const appt = appointments.find(
                      (a) =>
                        a.barberId === barber.id &&
                        a.time === time &&
                        a.date === dateStr,
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
                            style={{
                              height: `calc(${appt.duration}00% - 16px)`,
                            }}
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
                        {!appt && (
                          <div className='opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center pointer-events-none'>
                            <button
                              onClick={() => handlePlusClick(time, barber.id)}
                              className='pointer-events-auto h-8 px-4 text-xs bg-white/5 hover:bg-white/10 rounded-full text-white flex items-center gap-1.5 transition-all'
                            >
                              <Plus className='w-3 h-3' /> Qo'shish
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
