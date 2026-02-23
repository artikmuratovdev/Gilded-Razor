import { staffMembers } from '@/constants/barber';
import { StaffGrid } from './StaffGrid';
import { StaffLeaderboard } from './StaffLeaderboard';
import { StaffStats } from './StaffStats';

export const StaffPage = () => {
  return (
    <div className='space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500'>
      {/* Top Stats */}
      <StaffStats />

      <h2 className='text-lg sm:text-xl font-bold text-white'>
        Faol Sartaroshlar
      </h2>
      {/* Barbers Grid */}
      <StaffGrid staffMembers={staffMembers} />

      {/* Leaderboard Table */}
      <div className='pt-2'>
        <StaffLeaderboard staffMembers={staffMembers} />
      </div>
    </div>
  );
};
