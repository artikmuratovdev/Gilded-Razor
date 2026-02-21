import { staffMembers } from '@/constants/barber';
import { useSearchParams } from 'react-router';
import { Button } from '../../components/ui/Button';
import { StaffGrid } from './StaffGrid';
import { StaffLeaderboard } from './StaffLeaderboard';
import { StaffStats } from './StaffStats';

export const StaffPage = () => {
  const [, setSearchParams] = useSearchParams();

  const handleOpenModal = () => {
    setSearchParams({ staff: 'new' });
  };

  return (
    <div className='space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500'>
      {/* Top Stats */}
      <StaffStats />

      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0'>
        <h2 className='text-lg sm:text-xl font-bold text-white'>
          Faol Sartaroshlar
        </h2>
        <Button
          variant='outline'
          size='sm'
          onClick={handleOpenModal}
          className='w-full sm:w-auto text-xs'
        >
          Barcha Navbatlar
        </Button>
      </div>

      {/* Barbers Grid */}
      <StaffGrid staffMembers={staffMembers} onAddStaff={handleOpenModal} />

      {/* Leaderboard Table */}
      <div className='pt-2'>
        <StaffLeaderboard staffMembers={staffMembers} />
      </div>
    </div>
  );
};
