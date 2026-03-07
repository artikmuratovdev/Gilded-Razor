import {
  useDeleteStaffMutation,
  useGetStaffByIdQuery,
  useUpdateStaffMutation,
} from '@/app/api/staffApi/staffApi';
import type { CreateStaffReq } from '@/app/api/staffApi/type';
import type { MutationRes } from '@/app/api/clientsApi/type';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input, Select } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { useHandleRequest } from '@/hooks/HandleRequest/useHandleRequest';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Edit,
  Phone,
  Scissors,
  Star,
  Trash2,
  TrendingUp,
  User,
} from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import z from 'zod';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// --- Staff edit form schema ---
const editStaffSchema = z.object({
  name: z.string().min(2, 'Ism talab qilinadi'),
  specialization: z.enum(['barber', 'kids', 'master_barber']),
  phone: z
    .string()
    .min(13, "To'liq telefon raqam kiriting")
    .regex(/^\+998\d{9}$/, 'Format: +998XXXXXXXXX'),
  commission_rate: z.string().min(1, 'Komissiya talab qilinadi'),
});

type EditStaffForm = z.infer<typeof editStaffSchema>;

export const StaffProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: res, isLoading, isError } = useGetStaffByIdQuery(id ?? '');
  const staff = res?.data;

  const [deleteStaff] = useDeleteStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();
  const handleRequest = useHandleRequest();

  // Modal states — isEditOpen starts true if ?edit=true is in URL
  const [isEditOpen, setIsEditOpen] = useState(() => searchParams.get('edit') === 'true');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Clean up ?edit=true from URL on first render only
  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setSearchParams({}, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Edit form
  const editForm = useForm<EditStaffForm>({
    resolver: zodResolver(editStaffSchema),
    defaultValues: {
      name: '',
      specialization: 'barber',
      phone: '',
      commission_rate: '',
    },
  });

  // Populate edit form when staff data loads or edit modal opens
  useEffect(() => {
    if (isEditOpen && staff) {
      editForm.reset({
        name: staff.name,
        specialization: staff.specialization,
        phone: staff.phone,
        commission_rate: staff.commission_rate,
      });
    }
  }, [isEditOpen, staff, editForm]);

  // --- Handlers ---
  const handleEditSubmit = (data: EditStaffForm) => {
    if (!id) return;

    const payload: Partial<CreateStaffReq> = {
      name: data.name,
      specialization: data.specialization,
      phone_number: data.phone,
      commission_rate: data.commission_rate,
    };

    handleRequest({
      request: async () => await updateStaff({ id, body: payload }),
      onSuccess: (res: MutationRes) => {
        console.log('Staff updated successfully:', res);
        toast.success('Xodim muvaffaqiyatli yangilandi');
        setIsEditOpen(false);
        editForm.reset();
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  const handleDeleteSubmit = () => {
    if (!id) return;

    handleRequest({
      request: async () => await deleteStaff(id),
      onSuccess: (res: MutationRes) => {
        console.log('Staff deleted successfully:', res);
        toast.success('Xodim muvaffaqiyatli o\'chirildi');
        setIsDeleteOpen(false);
        navigate('/staff');
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin' />
          <p className='text-gray-400 text-sm'>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (isError || !staff) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
        <div className='w-16 h-16 rounded-2xl bg-surface-light flex items-center justify-center'>
          <User className='w-8 h-8 text-gray-500' />
        </div>
        <p className='text-white font-semibold'>Xodim topilmadi</p>
        <Link to='/staff'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Ortga qaytish
          </Button>
        </Link>
      </div>
    );
  }

  const statusColor =
    staff.status === 'available'
      ? 'bg-green-500'
      : staff.status === 'in_session'
        ? 'bg-orange-500'
        : 'bg-red-500';

  const badgeVariant =staff.status === 'available'
                      ? "success"
                      : staff.status === 'off_duty'
                        ? "danger"
                      : staff.status === 'in_session'
                        ? "gold"
                        : 'info';

  return (
    <div className='space-y-6 animate-in fade-in zoom-in-95 duration-500'>
      {/* Back button + Action buttons */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
        <Link to='/staff'>
          <Button
            variant='outline'
            size='sm'
            className='gap-2 bg-[#D4AF35] hover:text-white -ml-1'
          >
            <ArrowLeft className='w-4 h-4' />
            Barcha xodimlar
          </Button>
        </Link>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='gap-2'
            onClick={() => setIsEditOpen(true)}
          >
            <Edit className='w-4 h-4' />
            Tahrirlash
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300'
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className='w-4 h-4' />
            O'chirish
          </Button>
        </div>
      </div>

      {/* Header card */}
      <Card className='overflow-hidden mt-4'>
        <CardContent className='p-6 sm:p-8'>
          <div className='flex flex-col sm:flex-row gap-6 items-start'>
            {/* Avatar */}
            <div className='relative shrink-0'>
                <img
                  src={staff.avatar || "https://github.com/shadcn.png"}
                  alt={staff.name}
                  className='w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white/10'
                />
              <div
                className={cn(
                  'absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-surface',
                  statusColor,
                )}
              />
            </div>

            {/* Info */}
            <div className='flex-1 min-w-0'>
              <div className='flex flex-wrap items-center gap-3 mb-1'>
                <h1 className='text-2xl sm:text-3xl font-bold text-white'>
                  {staff.name}
                </h1>
                <Badge variant={badgeVariant} className='text-[10px]'>
                  {staff.status_display ?? staff.status}
                </Badge>
              </div>
              <p className='text-primary font-medium mb-4'>
                {staff.specialization_display ?? staff.specialization}
              </p>

              <div className='flex flex-wrap gap-4 text-sm text-gray-400'>
                {staff.phone && (
                  <div className='flex items-center gap-2'>
                    <Phone className='w-4 h-4 text-gray-500' />
                    <span>{staff.phone}</span>
                  </div>
                )}
                <div className='flex items-center gap-2'>
                  <Star className='w-4 h-4 text-yellow-400' />
                  <span className='text-white font-semibold'>
                    {staff.rating}
                  </span>
                  <span>reyting</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-gray-500' />
                  <span>
                    {String(staff?.created_at).slice(0, 10)} dan beri
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
        <Card>
          <CardContent className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center'>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                Bugungi daromad
              </p>
            </div>
            <p className='text-2xl font-bold text-white'>
              {(staff.today_revenue ?? 0).toLocaleString('uz-UZ')}
              <span className='text-sm text-gray-400 font-normal ml-1'>
                so'm
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center'>
                <Star className='w-4 h-4 text-yellow-400' />
              </div>
              <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                Reyting
              </p>
            </div>
            <p className='text-2xl font-bold text-white'>{staff.rating}</p>
          </CardContent>
        </Card>

        <Card className='col-span-2 sm:col-span-1'>
          <CardContent className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center'>
                <Scissors className='w-4 h-4 text-primary' />
              </div>
              <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                Komissiya
              </p>
            </div>
            <p className='text-2xl font-bold text-white'>
              {staff.commission_rate}
              <span className='text-sm text-gray-400 font-normal ml-1'>%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Details card */}
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-base font-bold text-white mb-4'>
            Qo'shimcha ma'lumotlar
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {[
              {
                label: 'Mutaxassislik',
                value: staff.specialization_display ?? staff.specialization,
              },
              { label: 'Holat', value: staff.status_display ?? staff.status },
              {
                label: 'Komissiya stavkasi',
                value: `${staff.commission_rate}%`,
              },
              { label: 'Faollik', value: staff.is_active ? 'Faol' : 'Nofaol' },
            ].map((item) => (
              <div
                key={item.label}
                className='flex justify-between items-center py-3 border-b border-white/5 last:border-0'
              >
                <span className='text-sm text-gray-400'>{item.label}</span>
                <span className='text-sm font-semibold text-white'>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Staff Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Xodimni Tahrirlash"
        description="Xodim ma'lumotlarini yangilang."
        icon={<Edit className='text-primary h-8 w-8' />}
      >
        <form
          onSubmit={editForm.handleSubmit(handleEditSubmit)}
          className='space-y-2 sm:space-y-4'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Xodim Ismi'
                placeholder='Jasur Karimov'
                {...editForm.register('name')}
              />
              {editForm.formState.errors.name && (
                <p className='text-red-500 text-xs mt-1'>
                  {editForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Select
                label='Mutaxassislik / Lavozim'
                icon={<Scissors className='h-4 w-4' />}
                {...editForm.register('specialization')}
              >
                <option value=''>Tanlang</option>
                <option value='master_barber'>Master Barber</option>
                <option value='barber'>Barber</option>
                <option value='stylist'>Stylist</option>
                <option value='colorist'>Colorist</option>
                <option value='receptionist'>Receptionist</option>
              </Select>
              {editForm.formState.errors.specialization && (
                <p className='text-red-500 text-xs mt-1'>
                  {editForm.formState.errors.specialization.message}
                </p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Controller
                name='phone'
                control={editForm.control}
                render={({ field }) => (
                  <PhoneInput
                    label='Telefon Raqam'
                    value={field.value}
                    onChange={field.onChange}
                    error={editForm.formState.errors.phone?.message}
                  />
                )}
              />
            </div>
            <div>
              <Input
                label='Komissiya Stavkasi (%)'
                placeholder='Masalan: 45'
                {...editForm.register('commission_rate')}
              />
              {editForm.formState.errors.commission_rate && (
                <p className='text-red-500 text-xs mt-1'>
                  {editForm.formState.errors.commission_rate.message}
                </p>
              )}
            </div>
          </div>
          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' type='button' onClick={() => setIsEditOpen(false)}>
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Staff Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Xodimni O'chirish"
        description="Bu amalni ortga qaytarib bo'lmaydi. Xodim va unga tegishli barcha ma'lumotlar o'chiriladi."
        icon={<AlertTriangle className='text-red-500 h-8 w-8' />}
      >
        <div className='space-y-4'>
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4'>
            <p className='text-sm text-gray-300'>
              <span className='font-semibold text-white'>
                {staff.name}
              </span>{' '}
              nomli xodimni o'chirmoqchimisiz?
            </p>
          </div>

          <div className='pt-3 flex justify-end gap-3 border-t border-white/5'>
            <Button
              variant='ghost'
              onClick={() => setIsDeleteOpen(false)}
            >
              Bekor Qilish
            </Button>
            <Button
              variant='default'
              onClick={handleDeleteSubmit}
              className='bg-red-600 hover:bg-red-700 text-white'
            >
              O'chirish
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
