import { UserPlus } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { PhoneInput } from '../../ui/PhoneInput';
import type { ClientModalProps } from './types';

const ClientModal = ({
  isOpen,
  clientForm,
  onSubmit,
  onClose,
  title,
  description,
  submitLabel,
}: ClientModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    description={description}
    icon={<UserPlus className='text-primary h-8 w-8' />}
  >
    <form onSubmit={clientForm.handleSubmit(onSubmit)} className='space-y-2 sm:space-y-4'>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <Input label='Ism' placeholder='Jasur' {...clientForm.register('firstName')} />
          {clientForm.formState.errors.firstName && (
            <p className='mt-1 text-xs text-red-500'>{clientForm.formState.errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Input label='Familiya' placeholder='Karimov' {...clientForm.register('lastName')} />
          {clientForm.formState.errors.lastName && (
            <p className='mt-1 text-xs text-red-500'>{clientForm.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>
      <div>
        <Input
          label='Elektron Pochta'
          type='email'
          placeholder='jasur@example.com'
          {...clientForm.register('email')}
        />
        {clientForm.formState.errors.email && (
          <p className='mt-1 text-xs text-red-500'>{clientForm.formState.errors.email.message}</p>
        )}
      </div>
      <div>
        <Controller
          name='phone'
          control={clientForm.control}
          render={({ field }) => (
            <PhoneInput
              label='Telefon Raqam'
              value={field.value}
              onChange={field.onChange}
              error={clientForm.formState.errors.phone?.message}
            />
          )}
        />
      </div>
      <div className='flex flex-col-reverse gap-2 border-t border-white/5 pt-3 sm:flex-row sm:justify-end sm:gap-3 sm:pt-5'>
        <Button variant='ghost' type='button' onClick={onClose} className='w-full sm:w-auto'>
          Bekor Qilish
        </Button>
        <Button variant='default' type='submit' className='w-full sm:w-auto'>
          {submitLabel}
        </Button>
      </div>
    </form>
  </Modal>
);

export default ClientModal;
