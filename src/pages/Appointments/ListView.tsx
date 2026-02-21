import { barbers } from '@/constants/barber';
import { Clock, MoreHorizontal } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';

interface ListViewProps {
  appointments: any[];
}

export const ListView = ({ appointments }: ListViewProps) => {
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (a.date !== b.date) return parseInt(a.date) - parseInt(b.date);
    return a.time.localeCompare(b.time);
  });

  return (
    <Card className='w-full'>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse min-w-[600px]'>
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
  );
};
