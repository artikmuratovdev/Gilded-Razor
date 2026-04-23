import { AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import type { DeleteServiceModalProps } from './types';

const DeleteServiceModal = ({ isOpen, serviceToDelete, onClose, onDelete }: DeleteServiceModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Xizmatni O'chirish"
    description="Bu amalni ortga qaytarib bo'lmaydi. Xizmat va unga tegishli barcha ma'lumotlar o'chiriladi."
    icon={<AlertTriangle className='text-red-500 h-8 w-8' />}
  >
    <div className='space-y-4'>
      {serviceToDelete && (
        <div className='rounded-lg border border-red-500/20 bg-red-500/10 p-4'>
          <p className='text-sm text-gray-300'>
            <span className='font-semibold text-white'>{serviceToDelete.name}</span>{' '}
            nomli xizmatni o'chirmoqchimisiz?
          </p>
        </div>
      )}
      <div className='flex flex-col-reverse gap-2 border-t border-white/5 pt-3 sm:flex-row sm:justify-end sm:gap-3'>
        <Button variant='ghost' onClick={onClose} className='w-full sm:w-auto'>
          Bekor Qilish
        </Button>
        <Button
          variant='default'
          onClick={onDelete}
          className='w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto'
        >
          O'chirish
        </Button>
      </div>
    </div>
  </Modal>
);

export default DeleteServiceModal;
