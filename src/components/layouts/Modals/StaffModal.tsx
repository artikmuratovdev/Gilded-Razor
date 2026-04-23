import { Scissors, UserPlus } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { Input, Select } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { PhoneInput } from '../../ui/PhoneInput';
import type { StaffModalProps } from './types';

const StaffModal = ({ isOpen, staffForm, onSubmit, onClose, forcedStaffRole }: StaffModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Xodim Qo'shish"
    description="Jamoangizga yangi mutaxassis ro'yxatga olish."
    icon={<Scissors className='text-primary h-8 w-8' />}
  >
    <form onSubmit={staffForm.handleSubmit(onSubmit)} className='space-y-2 sm:space-y-4'>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <Input
            label='Xodim Ismi'
            placeholder='Jasur Karimov'
            icon={<UserPlus className='h-4 w-4' />}
            {...staffForm.register('name')}
          />
          {staffForm.formState.errors.name && (
            <p className='mt-1 text-xs text-red-500'>{staffForm.formState.errors.name.message}</p>
          )}
        </div>
        <div>
          <Select
            label='Mutaxassislik / Lavozim'
            icon={<Scissors className='h-4 w-4' />}
            disabled={Boolean(forcedStaffRole)}
            {...staffForm.register('specialization')}
          >
            <option value=''>Tanlang</option>
            <option value='master_barber'>Master Barber</option>
            <option value='barber'>Barber</option>
            <option value='kids'>Kids</option>
          </Select>
          {forcedStaffRole && (
            <p className='mt-1 text-xs text-gray-400'>Bu sahifada mutaxassislik avtomatik tanlanadi.</p>
          )}
          {staffForm.formState.errors.specialization && (
            <p className='mt-1 text-xs text-red-500'>{staffForm.formState.errors.specialization.message}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <Controller
            name='phone_number'
            control={staffForm.control}
            render={({ field }) => (
              <PhoneInput
                label='Telefon Raqam'
                value={field.value}
                onChange={field.onChange}
                error={staffForm.formState.errors.phone_number?.message}
              />
            )}
          />
        </div>
        <div>
          <Input
            type='number'
            label='Komissiya Stavkasi (%)'
            placeholder='Masalan: 45'
            {...staffForm.register('commission_rate', { valueAsNumber: true })}
          />
          {staffForm.formState.errors.commission_rate && (
            <p className='mt-1 text-xs text-red-500'>{staffForm.formState.errors.commission_rate.message}</p>
          )}
        </div>
      </div>
      <div className='flex flex-col-reverse gap-2 border-t border-white/5 pt-3 sm:flex-row sm:justify-end sm:gap-3 sm:pt-5'>
        <Button variant='ghost' type='button' onClick={onClose} className='w-full sm:w-auto'>
          Bekor Qilish
        </Button>
        <Button variant='default' type='submit' className='w-full sm:w-auto'>
          Xodim Qo'shish
        </Button>
      </div>
    </form>
  </Modal>
);

export default StaffModal;
