import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import type { Staff } from '../../types';
import { AddStaffModal, type StaffForm } from './AddStaffModal';
import { StaffGrid } from './StaffGrid';
import { StaffLeaderboard } from './StaffLeaderboard';
import { StaffStats } from './StaffStats';

const staffMembers: Staff[] = [
  {
    id: '1',
    name: 'Marcus Cole',
    role: 'Master Barber',
    avatar: 'https://picsum.photos/seed/marcus/150',
    status: 'Available',
    todayRevenue: 420,
    rating: 5.0,
  },
  {
    id: '2',
    name: 'Alex Smith',
    role: 'Stylist',
    avatar: 'https://picsum.photos/seed/alex/150',
    status: 'In Session',
    currentSessionEnd: '10:15 AM',
    todayRevenue: 285.5,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Jay Parker',
    role: 'Barber',
    avatar: 'https://picsum.photos/seed/jay/150',
    status: 'On Break',
    nextAppointment: '15 mins',
    todayRevenue: 150,
    rating: 4.5,
  },
];

export const StaffPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data: StaffForm) => {
    console.log('Adding staff:', data);
    setIsModalOpen(false);
    // In a real app, you'd add this to state/db
  };

  return (
    <div className='space-y-8 animate-in fade-in zoom-in-95 duration-500'>
      {/* Top Stats */}
      <StaffStats />

      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold text-white'>Faol Sartaroshlar</h2>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setIsModalOpen(true)}
        >
          Barcha Navbatlar
        </Button>
      </div>

      {/* Barbers Grid */}
      <StaffGrid
        staffMembers={staffMembers}
        onAddStaff={() => setIsModalOpen(true)}
      />

      {/* Leaderboard Table */}
      <StaffLeaderboard staffMembers={staffMembers} />

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
};
