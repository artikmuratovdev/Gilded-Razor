import { CreditCard, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input, Select } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import type { PaymentModalProps } from './types';

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="To'lovni Qayta Ishlash"
    description='Mijoz uchun tranzaktsiyani yakunlang.'
    icon={<CreditCard className='text-primary h-8 w-8' />}
  >
    <div className='space-y-2 sm:space-y-4'>
      <Input label='Mijozni Tanlash' placeholder='Mijozni qidiring...' icon={<Search className='h-4 w-4' />} />
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <Select label="To'lov Usuli">
          <option>Kredit Karta</option>
          <option>Naqd Pul</option>
          <option>Sovg'a Kartasi</option>
        </Select>
        <Input label='Jami Miqdor' type='number' placeholder='0.00' className='text-right' />
      </div>
      <div className='rounded-xl border border-white/5 bg-surface-light p-3 sm:p-4'>
        <div className='mb-2 flex justify-between text-sm'>
          <span className='text-gray-400'>Narx</span>
          <span className='text-white'>$0.00</span>
        </div>
        <div className='mb-2 flex justify-between text-sm'>
          <span className='text-gray-400'>Soliq (8%)</span>
          <span className='text-white'>$0.00</span>
        </div>
        <div className='my-2 flex justify-between border-t border-white/5 pt-2 font-bold'>
          <span className='text-white'>Jami</span>
          <span className='text-primary'>$0.00</span>
        </div>
      </div>
      <div className='flex flex-col-reverse gap-2 border-t border-white/5 pt-3 sm:flex-row sm:justify-end sm:gap-3 sm:pt-5'>
        <Button variant='ghost' onClick={onClose} className='w-full sm:w-auto'>
          Bekor Qilish
        </Button>
        <Button variant='default' className='w-full sm:w-auto'>
          Kartani To'lash
        </Button>
      </div>
    </div>
  </Modal>
);

export default PaymentModal;
