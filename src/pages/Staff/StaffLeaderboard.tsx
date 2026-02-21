import type { Staff } from '@/types';
import { Star } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

interface StaffLeaderboardProps {
  staffMembers: Staff[];
}

export const StaffLeaderboard = ({ staffMembers }: StaffLeaderboardProps) => {
  return (
    <Card>
      <CardContent className='p-0'>
        <div className='p-6 border-b border-white/5 flex justify-between items-center'>
          <h3 className='font-bold text-white'>
            Haftalik Ko'rsatkich Reytingi
          </h3>
          <div className='flex gap-2'>
            <Button variant='secondary' size='sm' className='rounded-full'>
              Oxirgi 7 Kun
            </Button>
            <Button variant='secondary' size='sm' className='rounded-full'>
              Hisobotni Yuklash
            </Button>
          </div>
        </div>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b border-white/5 text-xs text-gray-500 font-bold uppercase tracking-wider'>
              <th className='p-4 pl-6'>Reyting va Sartarosh</th>
              <th className='p-4'>Bronlar</th>
              <th className='p-4'>O'rt. Reyting</th>
              <th className='p-4'>Daromad</th>
              <th className='p-4 pr-6 text-right'>Samaradorlik</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-white/5'>
            {staffMembers.map((staff, idx) => (
              <tr key={staff.id} className='hover:bg-white/5 transition-colors'>
                <td className='p-4 pl-6 flex items-center gap-4'>
                  <span
                    className={`text-sm font-bold ${idx === 0 ? 'text-primary' : 'text-gray-500'}`}
                  >
                    #{idx + 1}
                  </span>
                  <div className='flex items-center gap-3'>
                    <img
                      src={staff.avatar}
                      alt='av'
                      className='w-8 h-8 rounded-full'
                    />
                    <span className='text-sm font-bold text-white'>
                      {staff.name}
                    </span>
                  </div>
                </td>
                <td className='p-4 text-sm text-gray-300'>48</td>
                <td className='p-4 text-sm font-bold text-primary flex items-center gap-1'>
                  5.0 <Star className='w-3 h-3 fill-current' />
                </td>
                <td className='p-4 text-sm font-bold text-white'>$2,840</td>
                <td className='p-4 pr-6 text-right'>
                  <Badge variant='success'>98%</Badge>
                </td>
              </tr>
            ))}
            <tr className='hover:bg-white/5 transition-colors'>
              <td className='p-4 pl-6 flex items-center gap-4'>
                <span className='text-sm font-bold text-gray-500'>#3</span>
                <div className='flex items-center gap-3'>
                  <img
                    src='https://picsum.photos/seed/jay/150'
                    alt='av'
                    className='w-8 h-8 rounded-full'
                  />
                  <span className='text-sm font-bold text-white'>
                    Jay Parker
                  </span>
                </div>
              </td>
              <td className='p-4 text-sm text-gray-300'>42</td>
              <td className='p-4 text-sm font-bold text-primary flex items-center gap-1'>
                4.8 <Star className='w-3 h-3 fill-current' />
              </td>
              <td className='p-4 text-sm font-bold text-white'>$2,150</td>
              <td className='p-4 pr-6 text-right'>
                <Badge variant='success'>94%</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
