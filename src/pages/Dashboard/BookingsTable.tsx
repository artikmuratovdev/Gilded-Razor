import type { Booking } from '@/types';
import { AlertTriangle, Download, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

const recentBookings: Booking[] = [
  {
    id: '1',
    clientName: 'James Wilson',
    clientAvatar: 'https://picsum.photos/seed/james/100',
    service: 'Fade & Beard Trim',
    barber: 'Marcus Cole',
    barberInitials: 'MC',
    date: 'Oct 24, 2023',
    time: '10:00 AM',
    status: 'Completed',
  },
  {
    id: '2',
    clientName: 'Elena Rodriguez',
    clientAvatar: 'https://picsum.photos/seed/elena/100',
    service: "Kid's Cut",
    barber: 'Alex Smith',
    barberInitials: 'AS',
    date: 'Oct 24, 2023',
    time: '02:30 PM',
    status: 'Pending',
  },
  {
    id: '3',
    clientName: 'Robert Brown',
    clientAvatar: 'https://picsum.photos/seed/robert/100',
    service: 'Royal Shave',
    barber: 'Marcus Cole',
    barberInitials: 'MC',
    date: 'Oct 24, 2023',
    time: '04:00 PM',
    status: 'Confirmed',
  },
];

export const BookingsTable = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);

  return (
    <>
      <Card>
        <CardContent className='p-0'>
          <div className='p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <h3 className='text-lg font-bold text-white'>Batafsil Bronlar</h3>
            <div className='flex items-center gap-2'>
              <Button variant='secondary' size='sm' className='rounded-full'>
                <Download className='h-4 w-4 mr-2' /> Eksport
              </Button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-white/[0.02] border-b border-white/5'>
                  <th className='p-4 pl-6 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Mijoz
                  </th>
                  <th className='p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Xizmat
                  </th>
                  <th className='p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Sartarosh
                  </th>
                  <th className='p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Sana va Vaqt
                  </th>
                  <th className='p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Holat
                  </th>
                  <th className='p-4 pr-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right'>
                    Amal
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/5'>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className='group hover:bg-white/[0.02] transition-colors'
                  >
                    <td className='p-4 pl-6'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={booking.clientAvatar}
                          alt='avatar'
                          className='w-9 h-9 rounded-full object-cover'
                        />
                        <div>
                          <p className='text-sm font-bold text-white'>
                            {booking.clientName}
                          </p>
                          <p className='text-xs text-gray-400'>
                            #{booking.id}BK-2024
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='p-4'>
                      <span className='text-sm text-gray-300'>
                        {booking.service}
                      </span>
                    </td>
                    <td className='p-4'>
                      <div className='flex items-center gap-2'>
                        <div className='w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary'>
                          {booking.barberInitials}
                        </div>
                        <span className='text-sm text-gray-300'>
                          {booking.barber}
                        </span>
                      </div>
                    </td>
                    <td className='p-4'>
                      <p className='text-sm font-medium text-white'>
                        {booking.date}
                      </p>
                      <p className='text-xs text-gray-500'>{booking.time}</p>
                    </td>
                    <td className='p-4'>
                      <Badge
                        variant={
                          booking.status === 'Completed'
                            ? 'success'
                            : booking.status === 'Pending'
                              ? 'warning'
                              : booking.status === 'Confirmed'
                                ? 'success'
                                : 'info'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className='p-4 pr-6 text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-gray-400 hover:text-white'
                          title='Bronni Tahrirlash'
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Pencil className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10'
                          title='Bronni Bekor Qilish'
                          onClick={() => {
                            setBookingToDelete(booking);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Booking Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title='Bronni Tahrirlash'
        description="Bron ma'lumotlarini yangilang."
        icon={<Pencil className='text-primary h-8 w-8' />}
      >
        {selectedBooking && (
          <form
            className='space-y-6'
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditModalOpen(false);
            }}
          >
            <Input
              label='Mijoz Ismi'
              defaultValue={selectedBooking.clientName}
            />
            <div className='grid grid-cols-2 gap-6'>
              <Input label='Xizmat' defaultValue={selectedBooking.service} />
              <Select label='Holat' defaultValue={selectedBooking.status}>
                <option value='Confirmed'>Tasdiqlangan</option>
                <option value='Pending'>Kutilmoqda</option>
                <option value='Completed'>Yakunlangan</option>
                <option value='Check-In'>Keldi</option>
              </Select>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <Input label='Sana' defaultValue={selectedBooking.date} />
              <Input label='Vaqt' defaultValue={selectedBooking.time} />
            </div>
            <Select label='Sartarosh' defaultValue={selectedBooking.barber}>
              <option>Marcus Cole</option>
              <option>Alex Smith</option>
              <option>Jay Parker</option>
            </Select>

            <div className='pt-6 flex justify-end gap-4 border-t border-white/5'>
              <Button
                type='button'
                variant='ghost'
                onClick={() => setIsEditModalOpen(false)}
              >
                Bekor Qilish
              </Button>
              <Button type='submit' variant='default'>
                O'zgarishlarni Saqlash
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Booking Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title='Bronni Bekor Qilish'
        description={`${bookingToDelete?.clientName} uchun bronni bekor qilishni xohlaysizmi? Bu amalni ortga qaytarib bo'lmaydi.`}
        icon={<AlertTriangle className='text-red-500 h-8 w-8' />}
      >
        <div className='pt-6 flex justify-end gap-4 border-t border-white/5'>
          <Button variant='ghost' onClick={() => setIsDeleteModalOpen(false)}>
            Bronni Saqlash
          </Button>
          <Button
            variant='destructive'
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Ha, Bekor Qilish
          </Button>
        </div>
      </Modal>
    </>
  );
};
