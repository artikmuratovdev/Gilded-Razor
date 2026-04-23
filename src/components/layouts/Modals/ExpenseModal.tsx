import { Package } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import type { ExpenseModalProps } from './types';

const ExpenseModal = ({
  isOpen,
  expenseForm,
  onSubmit,
  onClose,
  title,
  description,
  submitLabel,
}: ExpenseModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    description={description}
    icon={<Package className='text-primary h-8 w-8' />}
  >
    <form onSubmit={expenseForm.handleSubmit(onSubmit)} className='space-y-2 sm:space-y-4'>
      <div>
        <Input label='Xarajat Nomi' placeholder='Masalan: Elektr energiyasi' {...expenseForm.register('name')} />
        {expenseForm.formState.errors.name && (
          <p className='mt-1 text-xs text-red-500'>{expenseForm.formState.errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          label="Ta'rif"
          placeholder="Xarajat ta'rifini kiriting"
          {...expenseForm.register('description')}
        />
        {expenseForm.formState.errors.description && (
          <p className='mt-1 text-xs text-red-500'>{expenseForm.formState.errors.description.message}</p>
        )}
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <Input label='Narx' placeholder='50000' {...expenseForm.register('price')} />
          {expenseForm.formState.errors.price && (
            <p className='mt-1 text-xs text-red-500'>{expenseForm.formState.errors.price.message}</p>
          )}
        </div>
        <div>
          <Input label='Eslatma Sanasi' type='date' {...expenseForm.register('reminder_date')} />
          {expenseForm.formState.errors.reminder_date && (
            <p className='mt-1 text-xs text-red-500'>{expenseForm.formState.errors.reminder_date.message}</p>
          )}
        </div>
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

export default ExpenseModal;
