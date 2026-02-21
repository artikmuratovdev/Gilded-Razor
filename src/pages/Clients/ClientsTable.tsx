import type { Client } from '@/types';
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

interface ClientsTableProps {
  data: Client[];
}

export const ClientsTable = ({ data }: ClientsTableProps) => {
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
            {data.map((client) => (
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
        <span>
          {data.length} ta mijozdan {data.length > 0 ? '1' : '0'}-{data.length}{' '}
          ta ko'rsatilmoqda
        </span>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm' disabled>
            Oldingi
          </Button>
          <Button variant='outline' size='sm' disabled={data.length < 5}>
            Keyingi
          </Button>
        </div>
      </div>
    </>
  );
};
