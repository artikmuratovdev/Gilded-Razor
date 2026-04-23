import { Scissors } from 'lucide-react';
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
import type { BookingModalProps, ClientOption, ServiceOption, StaffOption } from './types';

const BookingModal = ({
  isOpen,
  bookingForm,
  onSubmit,
  onClose,
  filteredClients,
  filteredServices,
  filteredStaff,
  clientSearch,
  serviceSearch,
  staffSearch,
  selectedClientName,
  selectedServiceName,
  selectedStaffName,
  setClientSearch,
  setServiceSearch,
  setStaffSearch,
  setSelectedClientName,
  setSelectedServiceName,
  setSelectedStaffName,
  handleStartTimeChange,
}: BookingModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title='Yangi Bron'
    description='Mijoz uchun yangi uchrashuv rejalang.'
    icon={<Scissors className='text-primary h-8 w-8' />}
  >
    <form onSubmit={bookingForm.handleSubmit(onSubmit)} className='space-y-2 sm:space-y-4'>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <label className='mb-1.5 block text-sm font-medium text-white/80'>Mijoz</label>
          <Combobox
            filter={null}
            value={bookingForm.watch('client')?.toString() || ''}
            onValueChange={(value) => {
              if (value) {
                const client = filteredClients.find((item: ClientOption) => item.id.toString() === value);
                if (client) {
                  bookingForm.setValue('client', parseInt(value, 10));
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
                  bookingForm.setValue('client', 0);
                }
              }}
              className='bg-transparent p-0 shadow-none'
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>Mijoz topilmadi</ComboboxEmpty>
                {filteredClients.map((client: ClientOption) => (
                  <ComboboxItem key={client.id} value={client.id.toString()}>
                    {client.first_name} {client.last_name}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {bookingForm.formState.errors.client && (
            <p className='mt-1 text-xs text-red-500'>{bookingForm.formState.errors.client.message}</p>
          )}
        </div>
        <div>
          <label className='mb-1.5 block text-sm font-medium text-white/80'>Sartarosh</label>
          <Combobox
            filter={null}
            value={bookingForm.watch('staff_member')?.toString() || ''}
            onValueChange={(value) => {
              if (value) {
                const staffId = parseInt(value.split('-')[0], 10);
                const staff = filteredStaff.find((item: StaffOption) => item.id === staffId);
                if (staff) {
                  bookingForm.setValue('staff_member', staffId);
                  setSelectedStaffName(staff.name);
                  setStaffSearch('');
                }
              }
            }}
          >
            <ComboboxInput
              placeholder='Sartarosh qidiring...'
              value={selectedStaffName || staffSearch}
              onChange={(e) => {
                setStaffSearch(e.target.value);
                if (!e.target.value) {
                  setSelectedStaffName('');
                  bookingForm.setValue('staff_member', 0);
                }
              }}
              className='w-full'
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>Sartarosh topilmadi</ComboboxEmpty>
                {filteredStaff.map((staff: StaffOption) => (
                  <ComboboxItem key={staff.id} value={`${staff.id}-${staff.name}`}>
                    {staff.name}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {bookingForm.formState.errors.staff_member && (
            <p className='mt-1 text-xs text-red-500'>{bookingForm.formState.errors.staff_member.message}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <label className='mb-1.5 block text-sm font-medium text-white/80'>Xizmat</label>
          <Combobox
            filter={null}
            value={bookingForm.watch('service')?.toString() || ''}
            onValueChange={(value) => {
              if (value) {
                const service = filteredServices.find((item: ServiceOption) => item.id.toString() === value);
                if (service) {
                  bookingForm.setValue('service', parseInt(value, 10));
                  setSelectedServiceName(`${service.name} - ${service.price} so'm`);
                  setServiceSearch('');
                }
              }
            }}
          >
            <ComboboxInput
              placeholder='Xizmat qidiring...'
              value={selectedServiceName || serviceSearch}
              onChange={(e) => {
                setServiceSearch(e.target.value);
                if (!e.target.value) {
                  setSelectedServiceName('');
                  bookingForm.setValue('service', 0);
                }
              }}
              className='w-full'
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>Xizmat topilmadi</ComboboxEmpty>
                {filteredServices.map((service: ServiceOption) => (
                  <ComboboxItem key={service.id} value={service.id.toString()}>
                    {service.name} - {service.price} so'm
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {bookingForm.formState.errors.service && (
            <p className='mt-1 text-xs text-red-500'>{bookingForm.formState.errors.service.message}</p>
          )}
        </div>
        <div>
          <Input
            label='Narx'
            placeholder='0.00'
            type='number'
            step='1'
            min='0'
            value={bookingForm.watch('price') || ''}
            onChange={(e) => {
              const value = e.target.value;
              bookingForm.setValue('price', value ? parseInt(value, 10) : 0);
            }}
          />
          {bookingForm.formState.errors.price && (
            <p className='mt-1 text-xs text-red-500'>{bookingForm.formState.errors.price.message}</p>
          )}
        </div>
      </div>
      <div>
        <Input label='Sana' type='date' className='scheme-dark' {...bookingForm.register('date')} />
        {bookingForm.formState.errors.date && (
          <p className='mt-1 text-xs text-red-500'>{bookingForm.formState.errors.date.message}</p>
        )}
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <Input
            label='Boshlanish vaqti'
            type='time'
            lang='en-GB'
            className='scheme-dark'
            value={bookingForm.watch('start_time') || ''}
            onChange={handleStartTimeChange}
          />
          {bookingForm.formState.errors.start_time && (
            <p className='mt-1 text-xs text-red-500'>{bookingForm.formState.errors.start_time.message}</p>
          )}
        </div>
        <div>
          <Input
            label='Tugash vaqti'
            type='time'
            lang='en-GB'
            className='scheme-dark'
            value={bookingForm.watch('end_time') || ''}
            onChange={(e) => bookingForm.setValue('end_time', e.target.value)}
          />
          {bookingForm.formState.errors.end_time && (
            <p className='mt-1 text-xs text-red-500'>{bookingForm.formState.errors.end_time.message}</p>
          )}
        </div>
      </div>
      <div>
        <Input label='Izohlar' placeholder="Qo'shimcha izohlar..." {...bookingForm.register('notes')} />
      </div>
      <div className='flex flex-col-reverse gap-2 border-t border-white/5 pt-3 sm:flex-row sm:justify-end sm:gap-3 sm:pt-5'>
        <Button variant='ghost' type='button' onClick={onClose} className='w-full sm:w-auto'>
          Bekor Qilish
        </Button>
        <Button variant='default' type='submit' className='w-full sm:w-auto'>
          Bronni Tasdiqlash
        </Button>
      </div>
    </form>
  </Modal>
);

export default BookingModal;
