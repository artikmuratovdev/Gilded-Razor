import type { AppoitmentRes } from '@/app/api/appoitmentsApi/type';
import Pagination from '@/components/Pagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import usePaginatedAppointments from '@/hooks/usePaginatedAppointments';
import useSetDate from '@/hooks/useSetDate';
import { useSetStatusAppointmentMutation } from '@/app/api/appoitmentsApi/appoitmentsApi';
import { toast } from 'sonner';
import {
  CheckCircle,
  Clock,
  MoreHorizontal,
  Pencil,
  Trash2,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';
import {
  DeleteAppointmentModal,
  EditAppointmentModal,
} from './AppointmentModals';
import { AppointmentsToolbar } from './AppointmentsToolbar';
import { Spinner } from '@/components/ui/spinner';
import { format } from 'date-fns';

export const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'cancelled' | 'completed' | 'confirmed' | 'no_show' | 'pending' | string>('');
  const [editTarget, setEditTarget] = useState<AppoitmentRes['data'][0] | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<
    AppoitmentRes['data'][0] | null
  >(null);
  const [page, setPage] = useState(1);

  const [setStatus] = useSetStatusAppointmentMutation();

  const handleSetStatus = async (id: number, status: 'confirmed' | 'cancelled') => {
    try {
      await setStatus({ id, body: { status } }).unwrap();
      toast.success(status === 'confirmed' ? 'Tasdiqlandi' : 'Bekor qilindi');
    } catch {
      toast.error('Xatolik yuz berdi');
    }
  };

  const { data: appointmentsData, isLoading } = usePaginatedAppointments({
    page,
    searchQuery,
    page_size: 10,
    date_from: format(selectedDate, 'yyyy-MM-dd'),
    status: statusFilter || undefined,
  });

  console.log(appointmentsData?.pagination);
  console.log('editTarget', editTarget);
  console.log('Date', format(selectedDate,'yyyy-MM-dd'));
  console.log('Date', selectedDate);

  if (isLoading || !appointmentsData) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner className='h-8 w-8 text-primary' />
      </div>
    );
  }

  return (
    <div
      className='space-y-4 sm:space-y-6 animate-in fade-in
    slide-in-from-bottom-4 duration-500 w-full max-w-full'
    >
      <div className='relative'>
        <AppointmentsToolbar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={(s) => { setStatusFilter(s); setPage(1); }}
        />
      </div>

      <div className='min-h-150 w-full max-w-full'>
        <div className='space-y-4'>
          {/* Mobile Card View */}
          <div className='sm:hidden space-y-4'>
            {appointmentsData && appointmentsData.data.length > 0 ? (
              appointmentsData.data.map((appt) => {
                return (
                  <Card
                    key={appt.id}
                    className='overflow-hidden bg-surface/40 border-white/5'
                  >
                    <CardContent className='p-4'>
                      <div className='flex justify-between items-start mb-4'>
                        <div className='flex flex-col'>
                          <span className='font-bold text-lg text-white'>
                            {appt.date}
                          </span>
                          <span className='text-sm text-primary font-medium flex items-center gap-1.5'>
                            <Clock className='w-3.5 h-3.5' />{' '}
                            {appt.start_time.slice(0, 5)}
                          </span>
                        </div>
                        <Badge
                          variant={
                            appt.status === 'confirmed'
                              ? 'info'
                              : appt.status === 'pending'
                                ? 'warning'
                                : appt.status === 'cancelled'
                                  ? 'danger'
                                  : appt.status === 'no_show'
                                    ? 'default'
                                    : appt.status === 'completed'
                                      ? 'success'
                                      : 'default'
                          }
                        >
                          {appt.status_display}
                        </Badge>
                      </div>

                      <div className='space-y-3 mb-4'>
                        <div>
                          <p className='text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1'>
                            Mijoz va Xizmat
                          </p>
                          <h4 className='font-bold text-white'>
                            {appt.client_name}
                          </h4>
                          <p className='text-sm text-gray-400'>
                            {appt.service_name}
                          </p>
                        </div>

                        <div className='flex justify-between items-end'>
                          <div>
                            <p className='text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1'>
                              Sartarosh
                            </p>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm text-gray-300'>
                                {appt.staff_member_name}
                              </span>
                            </div>
                          </div>
                          <div className='text-right'>
                            <p className='text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1'>
                              Narx
                            </p>
                            <p className='font-bold text-white'>
                              {isNaN(Number(appt.price))
                                ? '0'
                                : formatCurrency(Number(appt.price))}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mobile action buttons */}
                      <div className='grid grid-cols-2 gap-2 pt-3 border-t border-white/5'>
                        <Button
                          variant='secondary'
                          className='h-9 text-xs gap-1.5'
                          onClick={() => handleSetStatus(appt.id, 'confirmed')}
                        >
                          <CheckCircle className='h-3.5 w-3.5 text-green-400' />
                          Tasdiqlash
                        </Button>
                        <Button
                          variant='secondary'
                          className='h-9 text-xs gap-1.5'
                          onClick={() => handleSetStatus(appt.id, 'cancelled')}
                        >
                          <XCircle className='h-3.5 w-3.5 text-yellow-400' />
                          Bekor qilish
                        </Button>
                        <Button
                          variant='secondary'
                          className='h-9 text-xs gap-1.5'
                          onClick={() => setEditTarget(appt)}
                        >
                          <Pencil className='h-3.5 w-3.5' />
                          Tahrirlash
                        </Button>
                        <Button
                          variant='secondary'
                          className='h-9 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-1.5'
                          onClick={() => setDeleteTarget(appt)}
                        >
                          <Trash2 className='h-3.5 w-3.5' />
                          O'chirish
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className='p-10 text-center text-gray-500 bg-surface/20 rounded-2xl border border-dashed border-white/10'>
                Ma'lumot topilmadi
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <Card className='hidden sm:block w-full'>
            <CardContent className='p-0'>
              <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='bg-white/2 border-b border-white/5 text-xs text-gray-400 font-bold uppercase tracking-wider'>
                      <th className='p-4 pl-6'>Sana va Vaqt</th>
                      <th className='p-4'>Mijoz</th>
                      <th className='p-4'>Xizmat</th>
                      <th className='p-4'>Sartarosh</th>
                      <th className='p-4'>Narx</th>
                      <th className='p-4'>Holat</th>
                      <th className='p-4 text-right'>Amallar</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-white/5'>
                    {appointmentsData && appointmentsData.data.length > 0 ? (
                      appointmentsData.data.map((appt) => {
                        return (
                          <tr
                            key={appt.id}
                            className='group hover:bg-white/2  transition-colors'
                          >
                            <td className='p-4'>
                              <div className='flex flex-col'>
                                <span className='font-bold text-primary flex items-center gap-2 mb-1'>
                                  <Clock className='w-3 h-3' />
                                  {appt.start_time.slice(0, 5)}
                                </span>
                                <span className='text-xs text-white font-medium flex items-center gap-1'>
                                  {useSetDate(appt.date)}
                                </span>
                              </div>
                            </td>
                            <td className='p-4 font-medium text-white'>
                              {appt.client_name}
                            </td>
                            <td className='p-4 text-sm text-gray-300'>
                              {appt.service_name}
                            </td>
                            <td className='p-4'>
                              <div className='flex items-center gap-2'>
                                <span className='text-sm text-gray-300'>
                                  {appt.staff_member_name}
                                </span>
                              </div>
                            </td>
                            <td className='p-4 font-bold text-white'>
                              {isNaN(Number(appt.price))
                                ? '0'
                                : formatCurrency(Number(appt.price))}
                            </td>
                            <td className='p-4'>
                              <Badge
                                variant={
                                  appt.status === 'confirmed'
                                    ? 'info'
                                    : appt.status === 'pending'
                                      ? 'warning'
                                      : appt.status === 'cancelled'
                                        ? 'danger'
                                        : appt.status === 'no_show'
                                          ? 'default'
                                          : appt.status === 'completed'
                                            ? 'success'
                                            : 'default'
                                }
                              >
                                {appt.status_display}
                              </Badge>
                            </td>
                            <td className='p-4 text-right'>
                              {/* Desktop Dropdown */}
                              <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    className='h-8 w-8 ml-auto text-gray-400 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white'
                                  >
                                    <MoreHorizontal className='h-4 w-4' />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align='end'
                                  className='w-48 bg-surface border border-white/10 shadow-2xl rounded-xl text-sm'
                                >
                                  <DropdownMenuItem
                                    className='flex items-center gap-2 px-3 py-2 cursor-pointer text-gray-300 hover:text-white focus:text-white focus:bg-white/5 rounded-lg'
                                    onClick={() =>
                                      setEditTarget({
                                        ...appt,
                                        datetime: `${appt.date} ${appt.start_time}`,
                                      })
                                    }
                                  >
                                    <Pencil className='h-4 w-4 text-primary' />
                                    Tahrirlash
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className='flex items-center gap-2 px-3 py-2 cursor-pointer text-gray-300 hover:text-white focus:text-white focus:bg-white/5 rounded-lg'
                                    onClick={() => handleSetStatus(appt.id, 'confirmed')}
                                  >
                                    <CheckCircle className='h-4 w-4 text-green-400' />
                                    Tasdiqlash
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className='flex items-center gap-2 px-3 py-2 cursor-pointer text-gray-300 hover:text-white focus:text-white focus:bg-white/5 rounded-lg'
                                    onClick={() => handleSetStatus(appt.id, 'cancelled')}
                                  >
                                    <XCircle className='h-4 w-4 text-yellow-400' />
                                    Bekor qilish
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className='bg-white/5 my-1' />
                                  <DropdownMenuItem
                                    className='flex items-center gap-2 px-3 py-2 cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10 rounded-lg'
                                    onClick={() => setDeleteTarget(appt)}
                                  >
                                    <Trash2 className='h-4 w-4' />
                                    O'chirish
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className='p-10 text-center text-gray-500'
                        >
                          Ma'lumot topilmadi
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <Pagination
              page={page}
              setPage={setPage}
              prev={appointmentsData?.pagination?.previous}
              next={appointmentsData?.pagination?.next}
            />
          </Card>

          {/* Modals */}
          <EditAppointmentModal
            isOpen={editTarget !== null}
            onClose={() => setEditTarget(null)}
            appointment={editTarget}
          />
          <DeleteAppointmentModal
            isOpen={deleteTarget !== null}
            onClose={() => setDeleteTarget(null)}
            appointment={deleteTarget}
          />
        </div>
      </div>
    </div>
  );
};
