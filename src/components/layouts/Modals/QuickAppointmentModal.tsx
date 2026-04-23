import { useGetClientsQuery } from '@/app/api/clientsApi/clientsApi';
import { useGetAllStaffQuery } from '@/app/api/staffApi/staffApi';
import { Scissors } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '../../ui/combobox';
import type { QuickAppointmentModalProps } from './types';

const QuickAppointmentModal = ({
  isOpen,
  quickAppointmentForm,
  onSubmit,
  onClose,
}: QuickAppointmentModalProps) => {
  const [clientSearch, setClientSearch] = useState('');
  const [staffSearch, setStaffSearch] = useState('');
  const [selectedClientName, setSelectedClientName] = useState('');
  const [selectedStaffName, setSelectedStaffName] = useState('');

  const { data: clientsData } = useGetClientsQuery({ page: 1, page_size: 50, search: clientSearch });
  const { data: staffData } = useGetAllStaffQuery({ page: 1, page_size: 50, search: staffSearch });

  const filteredClients = clientsData?.data ?? [];
  const filteredStaff = staffData?.data ?? [];

  const handleClose = () => {
    setClientSearch('');
    setStaffSearch('');
    setSelectedClientName('');
    setSelectedStaffName('');
    quickAppointmentForm.reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title='Tezkor Bron'
      description="Mijoz va xodimni tanlab tezkor bron yarating."
      icon={<Scissors className='text-primary h-8 w-8' />}
    >
      <form onSubmit={quickAppointmentForm.handleSubmit(onSubmit)} className='space-y-3 sm:space-y-4'>
        <div>
          <label className='mb-1.5 block text-sm font-medium text-white/80'>Mijoz</label>
          <Combobox
            filter={null}
            value={quickAppointmentForm.watch('client')?.toString() || ''}
            onValueChange={(value) => {
              if (value) {
                const client = filteredClients.find((item) => item.id.toString() === value);
                if (client) {
                  quickAppointmentForm.setValue('client', parseInt(value, 10), { shouldValidate: true });
                  setSelectedClientName(`${client.first_name} ${client.last_name}`);
                  setClientSearch('');
                }
              }
            }}
          >
            <ComboboxInput
              placeholder='Mijoz qidiring...'
              value={selectedClientName || clientSearch}
              onChange={(e) => {
                setClientSearch(e.target.value);
                if (!e.target.value) {
                  setSelectedClientName('');
                  quickAppointmentForm.setValue('client', 0, { shouldValidate: true });
                }
              }}
              className='w-full [&>div]:w-full [&_input]:w-full'
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>Mijoz topilmadi</ComboboxEmpty>
                {filteredClients.map((client) => (
                  <ComboboxItem key={client.id} value={client.id.toString()}>
                    {client.first_name} {client.last_name}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {quickAppointmentForm.formState.errors.client && (
            <p className='mt-1 text-xs text-red-500'>{quickAppointmentForm.formState.errors.client.message}</p>
          )}
        </div>

        <div>
          <label className='mb-1.5 block text-sm font-medium text-white/80'>Xodim</label>
          <Combobox
            filter={null}
            value={quickAppointmentForm.watch('staff_member')?.toString() || ''}
            onValueChange={(value) => {
              if (value) {
                const staff = filteredStaff.find((item) => item.id.toString() === value);
                if (staff) {
                  quickAppointmentForm.setValue('staff_member', parseInt(value, 10), { shouldValidate: true });
                  setSelectedStaffName(staff.name);
                  setStaffSearch('');
                }
              }
            }}
          >
            <ComboboxInput
              placeholder='Xodim qidiring...'
              value={selectedStaffName || staffSearch}
              onChange={(e) => {
                setStaffSearch(e.target.value);
                if (!e.target.value) {
                  setSelectedStaffName('');
                  quickAppointmentForm.setValue('staff_member', 0, { shouldValidate: true });
                }
              }}
              className='w-full [&>div]:w-full [&_input]:w-full'
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>Xodim topilmadi</ComboboxEmpty>
                {filteredStaff.map((staff) => (
                  <ComboboxItem key={staff.id} value={staff.id.toString()}>
                    {staff.name}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {quickAppointmentForm.formState.errors.staff_member && (
            <p className='mt-1 text-xs text-red-500'>
              {quickAppointmentForm.formState.errors.staff_member.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label='Narx'
            type='number'
            step='0.01'
            min='0'
            placeholder='65000.00'
            value={quickAppointmentForm.watch('price') || ''}
            onChange={(e) => quickAppointmentForm.setValue('price', e.target.value, { shouldValidate: true })}
          />
          {quickAppointmentForm.formState.errors.price && (
            <p className='mt-1 text-xs text-red-500'>{quickAppointmentForm.formState.errors.price.message}</p>
          )}
        </div>

        <div className='flex flex-col-reverse gap-2 border-t border-white/5 pt-3 sm:flex-row sm:justify-end sm:gap-3 sm:pt-5'>
          <Button variant='ghost' type='button' onClick={handleClose} className='w-full sm:w-auto'>
            Bekor Qilish
          </Button>
          <Button variant='default' type='submit' className='w-full sm:w-auto'>
            Yaratish
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default QuickAppointmentModal;
