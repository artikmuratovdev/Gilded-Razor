import {
  Calendar,
  Mail,
  MessageSquare,
  Pencil,
  Phone,
  Star,
  Trash2,
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';

const clients = [
  {
    id: 1,
    name: 'James Wilson',
    email: 'j.wilson@example.com',
    phone: '+1 (555) 012-3456',
    avatar: 'https://picsum.photos/seed/james/100',
    lastVisit: 'Oct 24, 2023',
    totalSpend: 1250,
    visits: 12,
    status: 'VIP',
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    phone: '+1 (555) 098-7654',
    avatar: 'https://picsum.photos/seed/elena/100',
    lastVisit: 'Oct 20, 2023',
    totalSpend: 450,
    visits: 4,
    status: 'Regular',
  },
  {
    id: 3,
    name: 'Robert Brown',
    email: 'r.brown@example.com',
    phone: '+1 (555) 111-2222',
    avatar: 'https://picsum.photos/seed/robert/100',
    lastVisit: 'Oct 15, 2023',
    totalSpend: 890,
    visits: 8,
    status: 'Returning',
  },
  {
    id: 4,
    name: 'Sarah Miller',
    email: 'sarah.m@example.com',
    phone: '+1 (555) 333-4444',
    avatar: 'https://picsum.photos/seed/sarah/100',
    lastVisit: 'Sep 30, 2023',
    totalSpend: 2100,
    visits: 18,
    status: 'VIP',
  },
  {
    id: 5,
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    phone: '+1 (555) 555-6666',
    avatar: 'https://picsum.photos/seed/michael/100',
    lastVisit: 'Oct 25, 2023',
    totalSpend: 120,
    visits: 2,
    status: 'New',
  },
];

export const ClientsTable = () => {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='text-xs text-gray-500 font-bold uppercase tracking-wider bg-surface-light/30'>
              <th className='p-4 pl-6'>Mijoz Profili</th>
              <th className='p-4'>Aloqa Ma'lumoti</th>
              <th className='p-4'>Tarix</th>
              <th className='p-4'>Holat</th>
              <th className='p-4 pr-6 text-right'>Amallar</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-white/5'>
            {clients.map((client) => (
              <tr
                key={client.id}
                className='group hover:bg-white/[0.02] transition-colors'
              >
                <td className='p-4 pl-6'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <p className='font-bold text-white text-sm'>
                        {client.name}
                      </p>
                      <div className='flex items-center gap-1 text-xs text-primary'>
                        <Star className='w-3 h-3 fill-current' />
                        <span>{client.visits} Ta Tashrif</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className='p-4'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                      <Mail className='w-3 h-3' /> {client.email}
                    </div>
                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                      <Phone className='w-3 h-3' /> {client.phone}
                    </div>
                  </div>
                </td>
                <td className='p-4'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                      <Calendar className='w-3 h-3' /> Oxirgi:{' '}
                      {client.lastVisit}
                    </div>
                    <div className='text-sm font-bold text-white'>
                      {formatCurrency(client.totalSpend)}{' '}
                      <span className='text-xs font-normal text-gray-500'>
                        jami
                      </span>
                    </div>
                  </div>
                </td>
                <td className='p-4'>
                  <Badge
                    variant={
                      client.status === 'VIP'
                        ? 'gold'
                        : client.status === 'New'
                          ? 'success'
                          : 'default'
                    }
                  >
                    {client.status}
                  </Badge>
                </td>
                <td className='p-4 pr-6 text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10'
                      title='Xabar Yuborish'
                    >
                      <MessageSquare className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-gray-400 hover:text-white'
                      title='Profilni Tahrirlash'
                    >
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10'
                      title="Mijozni O'chirish"
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='p-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-400'>
        <span>128 ta mijozdan 1-5 ta ko'rsatilmoqda</span>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm' disabled>
            Oldingi
          </Button>
          <Button variant='outline' size='sm'>
            Keyingi
          </Button>
        </div>
      </div>
    </>
  );
};
