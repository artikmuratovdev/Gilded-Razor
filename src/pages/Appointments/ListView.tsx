import { Clock, MoreHorizontal } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';

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

export const ListView = () => {
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
              {sortedAppointments.map((appt) => {
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
                    <td className='p-4'>
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
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
