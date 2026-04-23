import { Package } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import type { AdditionalExpenseModalProps } from './types';

const AdditionalExpenseModal = ({
  isOpen,
  additionalExpenseForm,
  onSubmit,
  onClose,
  title,
  description,
  submitLabel,
}: AdditionalExpenseModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    description={description}
    icon={<Package className='text-primary h-8 w-8' />}
  >
    <form onSubmit={additionalExpenseForm.handleSubmit(onSubmit)} className='space-y-2 sm:space-y-4'>
      <div>
        <Input
          label='Xarajat Nomi'
          placeholder='Masalan: Transport xarajatlari'
          {...additionalExpenseForm.register('name')}
        />
        {additionalExpenseForm.formState.errors.name && (
          <p className='mt-1 text-xs text-red-500'>{additionalExpenseForm.formState.errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          label="Ta'rif"
          placeholder="Xarajat ta'rifini kiriting"
          {...additionalExpenseForm.register('description')}
        />
        {additionalExpenseForm.formState.errors.description && (
          <p className='mt-1 text-xs text-red-500'>
            {additionalExpenseForm.formState.errors.description.message}
          </p>
        )}
      </div>
      <div>
        <Input label='Narx' placeholder='50000' {...additionalExpenseForm.register('price')} />
        {additionalExpenseForm.formState.errors.price && (
          <p className='mt-1 text-xs text-red-500'>{additionalExpenseForm.formState.errors.price.message}</p>
        )}
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

export default AdditionalExpenseModal;
