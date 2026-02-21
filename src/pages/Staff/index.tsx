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
    <div className='space-y-8 animate-in fade-in zoom-in-95 duration-500'>
      {/* Top Stats */}
      <StaffStats />

      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold text-white'>Faol Sartaroshlar</h2>
        <Button variant='outline' size='sm' onClick={handleOpenModal}>
          Barcha Navbatlar
        </Button>
      </div>

      {/* Barbers Grid */}
      <StaffGrid staffMembers={staffMembers} onAddStaff={handleOpenModal} />

      {/* Leaderboard Table */}
      <StaffLeaderboard staffMembers={staffMembers} />
    </div>
  );
};
