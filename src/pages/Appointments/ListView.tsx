import { staffMembers as barbers } from '@/constants/barber';
import type { Appointment } from '@/types';
import { Clock, MoreHorizontal } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';

interface ListViewProps {
  appointments: Appointment[];
}

export const ListView = ({ appointments }: ListViewProps) => {
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (a.date !== b.date) return parseInt(a.date) - parseInt(b.date);
    return a.time.localeCompare(b.time);
  });

  return (
    <div className='space-y-4'>
      {/* Mobile Card View */}
      <div className='sm:hidden space-y-4'>
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map((appt) => {
            const barber = barbers.find((b) => b.id === appt.barberId);
            return (
              <Card
                key={appt.id}
                className='overflow-hidden bg-surface/40 border-white/5'
              >
                <CardContent className='p-4'>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex flex-col'>
                      <span className='font-bold text-lg text-white'>
                        Oct {appt.date}
                      </span>
                      <span className='text-sm text-primary font-medium flex items-center gap-1.5'>
                        <Clock className='w-3.5 h-3.5' /> {appt.time}
                      </span>
                    </div>
                    <Badge
                      variant={
                        appt.status === 'Confirmed'
                          ? 'success'
                          : appt.status === 'Pending'
                            ? 'warning'
                            : appt.status === 'Completed'
                              ? 'info'
                              : 'default'
                      }
                    >
                      {appt.status}
                    </Badge>
                  </div>

                  <div className='space-y-3 mb-4'>
                    <div>
                      <p className='text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1'>
                        Mijoz va Xizmat
                      </p>
                      <h4 className='font-bold text-white'>{appt.client}</h4>
                      <p className='text-sm text-gray-400'>{appt.service}</p>
                    </div>

                    <div className='flex justify-between items-end'>
                      <div>
                        <p className='text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1'>
                          Sartarosh
                        </p>
                        <div className='flex items-center gap-2'>
                          <img
                            src={barber?.avatar}
                            alt={barber?.name}
                            className='w-5 h-5 rounded-full'
                          />
                          <span className='text-sm text-gray-300'>
                            {barber?.name}
                          </span>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1'>
                          Narx
                        </p>
                        <p className='font-bold text-white'>
                          {formatCurrency(appt.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-2 pt-3 border-t border-white/5'>
                    <Button variant='secondary' className='flex-1 h-9 text-xs'>
                      Tahrirlash
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-9 w-9 text-gray-400'
                    >
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className='p-10 text-center text-gray-500 bg-surface/20 rounded-2xl border border-dashed border-white/10'>
            Ma'lumot topilmadi
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <Card className='hidden sm:block w-full overflow-hidden'>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-white/[0.02] border-b border-white/5 text-xs text-gray-400 font-bold uppercase tracking-wider'>
                  <th className='p-4 pl-6'>Sana va Vaqt</th>
                  <th className='p-4'>Mijoz</th>
                  <th className='p-4'>Xizmat</th>
                  <th className='p-4'>Sartarosh</th>
                  <th className='p-4'>Narx</th>
                  <th className='p-4'>Holat</th>
                  <th className='p-4 text-right'>Amallar</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/5'>
                {sortedAppointments.length > 0 ? (
                  sortedAppointments.map((appt) => {
                    const barber = barbers.find((b) => b.id === appt.barberId);
                    return (
                      <tr
                        key={appt.id}
                        className='group hover:bg-white/[0.02] transition-colors'
                      >
                        <td className='p-4 pl-6'>
                          <div className='flex flex-col'>
                            <span className='font-bold text-white'>
                              Oct {appt.date}
                            </span>
                            <span className='text-xs text-primary font-medium flex items-center gap-1'>
                              <Clock className='w-3 h-3' /> {appt.time}
                            </span>
                          </div>
                        </td>
                        <td className='p-4 font-medium text-white'>
                          {appt.client}
                        </td>
                        <td className='p-4 text-sm text-gray-300'>
                          {appt.service}
                        </td>
                        <td className='p-4'>
                          <div className='flex items-center gap-2'>
                            <img
                              src={barber?.avatar}
                              alt={barber?.name}
                              className='w-6 h-6 rounded-full'
                            />
                            <span className='text-sm text-gray-300'>
                              {barber?.name}
                            </span>
                          </div>
                        </td>
                        <td className='p-4 font-bold text-white'>
                          {formatCurrency(appt.price)}
                        </td>
                        <td className='p-4'>
                          <Badge
                            variant={
                              appt.status === 'Confirmed'
                                ? 'success'
                                : appt.status === 'Pending'
                                  ? 'warning'
                                  : appt.status === 'Completed'
                                    ? 'info'
                                    : 'default'
                            }
                          >
                            {appt.status}
                          </Badge>
                        </td>
                        <td className='p-4 text-right'>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 ml-auto text-gray-400 hover:text-white'
                          >
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className='p-10 text-center text-gray-500'>
                      Ma'lumot topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
