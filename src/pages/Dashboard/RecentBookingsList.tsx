import { Button } from '@/components/ui/Button';
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import type { Booking } from '../../types';

const recentBookings: Booking[] = [
  {
    id: '1',
    clientName: 'James Wilson',
    clientAvatar: 'https://picsum.photos/seed/james/100',
    service: 'Fade va soqol tekislash',
    barber: 'Marcus Cole',
    barberInitials: 'MC',
    date: '24-okt, 2023',
    time: '10:00',
    status: 'Completed',
  },
  {
    id: '2',
    clientName: 'Elena Rodriguez',
    clientAvatar: 'https://picsum.photos/seed/elena/100',
    service: 'Bolalar soch turmagi',
    barber: 'Alex Smith',
    barberInitials: 'AS',
    date: '24-okt, 2023',
    time: '14:30',
    status: 'Pending',
  },
  {
    id: '3',
    clientName: 'Robert Brown',
    clientAvatar: 'https://picsum.photos/seed/robert/100',
    service: 'Qirollik soqol olishi',
    barber: 'Marcus Cole',
    barberInitials: 'MC',
    date: '24-okt, 2023',
    time: '16:00',
    status: 'Confirmed',
  },
  {
    id: '4',
    clientName: 'Mike K.',
    clientAvatar: '',
    service: 'Issiq sochiqli soqol olish',
    barber: 'Marcus Cole',
    barberInitials: 'MK',
    date: '24-okt, 2023',
    time: '13:00',
    status: 'Confirmed',
  },
  {
    id: '5',
    clientName: 'Sara Johnson',
    clientAvatar: 'https://picsum.photos/seed/sara/100',
    service: "Soch bo'yash",
    barber: 'Alex Smith',
    barberInitials: 'AS',
    date: '25-okt, 2023',
    time: '11:00',
    status: 'Pending',
  },
  {
    id: '6',
    clientName: 'David Lee',
    clientAvatar: 'https://picsum.photos/seed/david/100',
    service: 'Klassik soch turmagi',
    barber: 'Marcus Cole',
    barberInitials: 'MC',
    date: '25-okt, 2023',
    time: '15:00',
    status: 'Confirmed',
  },
];

const statusVariant = (status: Booking['status']) => {
  if (status === 'Completed') return 'success';
  if (status === 'Pending') return 'warning';
  if (status === 'Confirmed') return 'success';
  return 'info';
};

const BookingRow = ({ booking }: { booking: Booking }) => (
  <div className='flex items-center gap-4 py-2 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-primary/20 group'>
    {booking.clientAvatar ? (
      <img
        src={booking.clientAvatar}
        alt={booking.clientName}
        className='w-12 h-12 rounded-full object-cover flex-shrink-0'
      />
    ) : (
      <div className='w-12 h-12 rounded-full bg-surface-light flex items-center justify-center text-white font-bold flex-shrink-0'>
        {booking.barberInitials}
      </div>
    )}
    <div className='flex-1 min-w-0'>
      <h4 className='text-sm font-bold text-white truncate'>
        {booking.clientName}
      </h4>
      <p className='text-xs text-gray-400'>
        {booking.service} • {booking.barber}
      </p>
    </div>
    <div className='flex flex-col items-end gap-1'>
      <span className='text-xs text-gray-400'>{booking.date}</span>
      <span className='text-xs font-bold text-white'>{booking.time}</span>
      <Badge variant={statusVariant(booking.status)} className='text-[10px]'>
        {booking.status === 'Completed'
          ? 'Yakunlangan'
          : booking.status === 'Pending'
            ? 'Kutilmoqda'
            : booking.status === 'Confirmed'
              ? 'Tasdiqlangan'
              : booking.status === 'Check-In'
                ? 'Keldi'
                : booking.status}
      </Badge>
    </div>
  </div>
);

export const RecentBookingsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className='h-[420px] flex flex-col'>
        <CardContent className=' p-6 flex-1 flex flex-col'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='text-lg font-bold text-white'>Navbatdagilar</h3>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant='secondary'
              size='sm'
              className='rounded-full'
            >
              Barchasini Ko'rish
            </Button>
          </div>

          <div className='flex-1 overflow-y-auto space-y-2 custom-scrollbar'>
            {recentBookings.slice(0, 4).map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Bookings Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Barcha So'nggi Bronlar"
        description={`${recentBookings.length} ta bron mavjud`}
        icon={<CalendarDays className='h-8 w-8 text-primary' />}
      >
        <div className='space-y-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar'>
          {recentBookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </div>
      </Modal>
    </>
  );
};
