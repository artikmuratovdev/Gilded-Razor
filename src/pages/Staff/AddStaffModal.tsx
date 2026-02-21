import { zodResolver } from '@hookform/resolvers/zod';
import { Scissors, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

// Zod Schema for Staff
const staffSchema = z.object({
  name: z.string().min(2, 'Ism talab qilinadi'),
  role: z.string().min(1, 'Lavozim talab qilinadi'),
  phone: z.string().min(10, "To'g'ri telefon raqam talab qilinadi"),
  commission: z.union([z.string(), z.number()]).refine((val) => {
    const n = Number(val);
    return !isNaN(n) && n >= 0 && n <= 100;
  }, '0-100%'),
});

export type StaffForm = z.infer<typeof staffSchema>;

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StaffForm) => void;
}

export const AddStaffModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddStaffModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StaffForm>({
    resolver: zodResolver(staffSchema),
  });

  const handleFormSubmit = (data: StaffForm) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xodim Qo'shish"
      description="Jamoangizga yangi mutaxassis ro'yxatga olish."
      icon={<Scissors className='text-primary h-8 w-8' />}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
        <div className='grid grid-cols-2 gap-6'>
          <Input
            label='Xodim Ismi'
            placeholder='Masalan: Jasur Karimov'
            icon={<UserPlus className='h-4 w-4' />}
            {...register('name')}
          />
          {errors.name && (
            <span className='text-red-500 text-xs'>{errors.name.message}</span>
          )}

          <Select
            label='Mutaxassislik / Lavozim'
            icon={<Scissors className='h-4 w-4' />}
            {...register('role')}
          >
            <option>Bosh Sartarosh</option>
            <option>Kichik Sartarosh</option>
            <option>Stajyor</option>
            <option>Stilist</option>
          </Select>
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <Input
            label='Telefon Raqam'
            placeholder='(555) 000-0000'
            {...register('phone')}
          />
          <Input
            type='number'
            label='Komissiya Stavkasi (%)'
            placeholder='Masalan: 45'
            {...register('commission')}
          />
        </div>

        <div className='pt-2'>
          <span className='block text-xs font-semibold uppercase tracking-wider text-primary/80 ml-1 mb-3'>
            Mavjud Xizmatlar
          </span>
          <div className='flex flex-wrap gap-2'>
            {[
              'Soch Olish',
              'Soqol Olish',
              'Soqol Kesish',
              'Yuz Parvarishi',
              "Bo'yash",
            ].map((s) => (
              <label key={s} className='cursor-pointer group relative'>
                <input
                  type='checkbox'
                  className='peer sr-only'
                  defaultChecked={['Soch Olish', 'Soqol Olish'].includes(s)}
                />
                <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light border border-white/5 peer-checked:border-primary peer-checked:bg-primary/10 transition-all hover:bg-surface-light/80'>
                  <span className='text-sm text-gray-400 group-hover:text-white peer-checked:text-primary font-medium'>
                    {s}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className='pt-6 flex justify-end gap-4 border-t border-white/5'>
          <Button type='button' variant='ghost' onClick={onClose}>
            Bekor Qilish
          </Button>
          <Button type='submit' variant='primary'>
            <UserPlus className='h-4 w-4 mr-2' />
            Xodim Qo'shish
          </Button>
        </div>
      </form>
    </Modal>
  );
};
