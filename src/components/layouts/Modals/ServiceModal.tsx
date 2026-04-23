import { Wrench } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import type { ServiceModalProps } from './types';

const ServiceModal = ({
  isOpen,
  serviceForm,
  onSubmit,
  onClose,
  title,
  description,
  submitLabel,
}: ServiceModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    description={description}
    icon={<Wrench className='text-primary h-8 w-8' />}
  >
    <form onSubmit={serviceForm.handleSubmit(onSubmit)} className='space-y-2 sm:space-y-4'>
      <div>
        <Input label='Xizmat Nomi' placeholder='Masalan: Soch Kesish' {...serviceForm.register('name')} />
        {serviceForm.formState.errors.name && (
          <p className='mt-1 text-xs text-red-500'>{serviceForm.formState.errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          label="Ta'rif"
          placeholder="Xizmat ta'rifini kiriting"
          {...serviceForm.register('description')}
        />
        {serviceForm.formState.errors.description && (
          <p className='mt-1 text-xs text-red-500'>{serviceForm.formState.errors.description.message}</p>
        )}
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <Input label='Narx' placeholder='25000' {...serviceForm.register('price')} />
          {serviceForm.formState.errors.price && (
            <p className='mt-1 text-xs text-red-500'>{serviceForm.formState.errors.price.message}</p>
          )}
        </div>
        <div>
          <Input
            label='Davomiyligi (minut)'
            type='number'
            placeholder='30'
            {...serviceForm.register('duration_minutes', { valueAsNumber: true })}
          />
          {serviceForm.formState.errors.duration_minutes && (
            <p className='mt-1 text-xs text-red-500'>{serviceForm.formState.errors.duration_minutes.message}</p>
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

export default ServiceModal;
