import type { Staff } from '@/types';
import { Clock, Plus, Scissors } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';

interface StaffGridProps {
  staffMembers: Staff[];
  onAddStaff: () => void;
}

export const StaffGrid = ({ staffMembers, onAddStaff }: StaffGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
      {staffMembers.map((staff) => (
        <Card
          key={staff.id}
          className='overflow-hidden group hover:border-primary/50 transition-colors'
        >
          <CardContent className='p-6'>
            <div className='flex justify-between items-start mb-6'>
              <div className='relative'>
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className='w-16 h-16 rounded-2xl object-cover border-2 border-white/5'
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-surface flex items-center justify-center ${staff.status === 'Available' ? 'bg-green-500' : staff.status === 'In Session' ? 'bg-blue-500' : 'bg-gray-500'}`}
                >
                  {staff.status === 'In Session' && (
                    <Scissors className='w-3 h-3 text-white' />
                  )}
                </div>
              </div>
              <div className='text-right'>
                <Badge
                  variant={
                    staff.status === 'Available'
                      ? 'success'
                      : staff.status === 'In Session'
                        ? 'info'
                        : 'default'
                  }
                  className='mb-2'
                >
                  {staff.status === 'Available'
                    ? 'MAVJUD'
                    : staff.status === 'In Session'
                      ? 'SESSIYADA'
                      : 'TANAFFUSDA'}
                </Badge>
                <p className='text-[10px] text-gray-400 font-bold uppercase'>
                  Bugungi Daromad
                </p>
                <p className='text-lg font-bold text-white'>
                  {formatCurrency(staff.todayRevenue)}
                </p>
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-bold text-white'>{staff.name}</h3>
              <p className='text-sm text-primary font-medium'>{staff.role}</p>
            </div>

            <div className='bg-surface-light rounded-xl p-3 mb-4 border border-white/5'>
              <p className='text-[10px] text-gray-400 font-bold uppercase mb-1'>
                {staff.status === 'Available'
                  ? 'Keyingi Uchrashuv'
                  : staff.status === 'In Session'
                    ? 'Joriy Sessiya'
                    : 'Holat Eslatmasi'}
              </p>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-white'>
                  {staff.status === 'Available'
                    ? '10:30 AM • Robert B.'
                    : staff.status === 'In Session'
                      ? '10:15 da Tugaydi'
                      : '15 daqiqadan keyin'}
                </span>
                {staff.status === 'Available' && (
                  <Badge variant='gold' className='text-[10px]'>
                    Hot Shave
                  </Badge>
                )}
                {staff.status === 'In Session' && (
                  <Badge variant='info' className='text-[10px]'>
                    Fade Cut
                  </Badge>
                )}
                {staff.status === 'On Break' && (
                  <Clock className='w-4 h-4 text-gray-400' />
                )}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <Button variant='outline' className='w-full text-xs h-9'>
                Jadval
              </Button>
              <Button variant='ghost' className='w-full text-xs h-9'>
                Profil
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add New Card */}
      <button
        onClick={onAddStaff}
        className='rounded-2xl border border-dashed border-white/10 bg-surface/50 hover:bg-surface hover:border-primary/50 transition-all flex flex-col items-center justify-center p-6 text-center group cursor-pointer h-full min-h-[300px]'
      >
        <div className='w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4'>
          <Plus className='w-6 h-6 text-gray-400 group-hover:text-primary' />
        </div>
        <h3 className='text-lg font-bold text-white group-hover:text-primary transition-colors'>
          Yangi Jamoa A'zosini Qo'shish
        </h3>
        <p className='text-sm text-gray-500 mt-2'>
          Sartaroshxona jamoangizni kengaytiring
        </p>
      </button>
    </div>
  );
};
