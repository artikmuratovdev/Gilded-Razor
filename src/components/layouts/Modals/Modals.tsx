import type { RootState } from '@/app/store';
import { AlertTriangle, CreditCard, Package, Scissors, Search, UserPlus, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../ui/Button';
import { Input, Select } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import useModalForms from './FormTypes';
import useModalActions from './SubmitFunctions';
import { useGetClientsQuery } from '@/app/api/clientsApi/clientsApi';
import { useGetServiceQuery } from '@/app/api/serviceApi/serviceApi';
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from '../../ui/combobox';
import { useGetAllStaffQuery } from '@/app/api/staffApi/staffApi';

// --- Schemas ---
const Modals = () => {
  const forms = useModalForms();
  const { bookingForm, productForm, clientForm, staffForm, serviceForm } = forms;
  const {
    handleCloseBooking,
    handleCloseClient,
    handleClosePayment,
    handleCloseProduct,
    handleCloseStaff,
    handleCloseDeleteClient,
    handleCloseEditClient,
    handleCloseService,
    handleCloseDeleteService,
    handleCloseEditService,
    onBookingSubmit,
    onClientSubmit,
    onProductSubmit,
    onStaffSubmit,
    onDeleteSubmit,
    onEditClientSubmit,
    onServiceSubmit,
    onDeleteServiceSubmit,
    onEditServiceSubmit,
  } = useModalActions(forms);
  const {
    booking: newBooking,
    staff: newStaff,
    client: newClient,
    product: newProduct,
    payment: newPayment,
    deleteClient,
    clientToDelete,
    editClient,
    clientToEdit,
    service: newService,
    deleteService,
    serviceToDelete,
    editService,
    serviceToEdit,
  } = useSelector((state: RootState) => state.modal);

  // Get data from Redux cache (prefetched in Dashboard)
  
  // State for Combobox search and selected values
  const [clientSearch, setClientSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [staffSearch, setStaffSearch] = useState('');
  const [selectedClientName, setSelectedClientName] = useState('');
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [selectedStaffName, setSelectedStaffName] = useState('');
  
  const { data: clientsData } = useGetClientsQuery({ page: 1, page_size: 100 , search:clientSearch});
  const { data: servicesData } = useGetServiceQuery({ page: 1, page_size: 100 , search:serviceSearch});
  const { data: staffData } = useGetAllStaffQuery({ page: 1, page_size: 100 , search:staffSearch});

  // Handle start time change and auto-set end time to +40 minutes
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    bookingForm.setValue('start_time', value);
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + 40;
      const endHours = Math.floor(totalMinutes / 60) % 24;
      const endMinutes = totalMinutes % 60;
      bookingForm.setValue(
        'end_time',
        `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`,
      );
    }
  };

  // Filter options based on search
  const filteredClients = clientsData?.data?.filter((client: any) =>
    `${client.first_name} ${client.last_name}`.toLowerCase().includes(clientSearch.toLowerCase())
  ) || [];

  const filteredServices = servicesData?.data?.filter((service: any) =>
    service.name.toLowerCase().includes(serviceSearch.toLowerCase())
  ) || [];

  const filteredStaff = staffData?.data?.filter(staff =>
    staff.name.toLowerCase().includes(staffSearch.toLowerCase())
  ) || [];

  // --- Form Hooks ---

  useEffect(() => {
    if (newBooking) {
      bookingForm.reset({
        client: bookingForm.getValues('client'),
        staff_member: 0,
        service: 0,
        date: '',
        start_time: '',
        end_time: '',
        price: 0,
        status: 'pending',
        notes: '',
      });
      // Reset selected names
      setSelectedClientName('');
      setSelectedServiceName('');
      setSelectedStaffName('');
      setClientSearch('');
      setServiceSearch('');
      setStaffSearch('');
    }
  }, [newBooking, bookingForm]);

  useEffect(() => {
    if (editClient && clientToEdit) {
      clientForm.reset({
        firstName: clientToEdit.first_name,
        lastName: clientToEdit.last_name,
        email: clientToEdit.email || '',
        phone: clientToEdit.phone,
      });
    }
  }, [editClient, clientToEdit, clientForm]);

  useEffect(() => {
    if (editService && serviceToEdit) {
      serviceForm.reset({
        name: serviceToEdit.name,
        description: serviceToEdit.description,
        price: serviceToEdit.price,
        duration_minutes: serviceToEdit.duration_minutes,
        is_active: serviceToEdit.is_active,
      });
    }
  }, [editService, serviceToEdit, serviceForm]);

  return (
    <>
      {/* New Booking Modal */}
      <Modal
        isOpen={newBooking}
        onClose={handleCloseBooking}
        title='Yangi Bron'
        description='Mijoz uchun yangi uchrashuv rejalang.'
        icon={<Scissors className='text-primary h-8 w-8' />}
      >
        <form
          onSubmit={bookingForm.handleSubmit(onBookingSubmit)}
          className='space-y-2 sm:space-y-4'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <label className='block text-sm font-medium text-white/80 mb-1.5'>
                Mijoz
              </label>
              <Combobox
                filter={null}
                value={bookingForm.watch('client')?.toString() || ''}
                onValueChange={(value) => {
                  if (value) {
                    const client = filteredClients.find((c: any) => c.id.toString() === value);
                    if (client) {
                      bookingForm.setValue('client', parseInt(value));
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
                  className='p-0 bg-transparent shadow-none'
                />
                <ComboboxContent>
                  <ComboboxList>
                    <ComboboxEmpty>Mijoz topilmadi</ComboboxEmpty>
                    {filteredClients.map((client: any) => (
                      <ComboboxItem key={client.id} value={client.id.toString()}>
                        {client.first_name} {client.last_name}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {bookingForm.formState.errors.client && (
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.client.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-white/80 mb-1.5'>
                Sartarosh
              </label>
              <Combobox
                filter={null}
                value={bookingForm.watch('staff_member')?.toString() || ''}
                onValueChange={(value) => {
                  if (value) {
                    const staffId = parseInt(value.split('-')[0]);
                    const staff = filteredStaff.find((s) => s.id === staffId);
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
                    {filteredStaff.map((staff) => (
                      <ComboboxItem key={staff.id} value={`${staff.id}-${staff.name}`}>
                        {staff.name}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {bookingForm.formState.errors.staff_member && (
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.staff_member.message}
                </p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <label className='block text-sm font-medium text-white/80 mb-1.5'>
                Xizmat
              </label>
              <Combobox
                filter={null}
                value={bookingForm.watch('service')?.toString() || ''}
                onValueChange={(value) => {
                  if (value) {
                    const service = filteredServices.find((s: any) => s.id.toString() === value);
                    if (service) {
                      bookingForm.setValue('service', parseInt(value));
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
                    {filteredServices.map((service: any) => (
                      <ComboboxItem key={service.id} value={service.id.toString()}>
                        {service.name} - {service.price} so'm
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {bookingForm.formState.errors.service && (
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.service.message}
                </p>
              )}
            </div>
            <div>
              <Input
              label='Narx'
              placeholder='0.00'
              type='number'
              step='0.01'
              min='0'
              {...bookingForm.register('price', { 
                valueAsNumber: true,
                min: {
                value: 0,
                message: 'Narx manfiy bo\'lishi mumkin emas'
                }
              })}
              />
              {bookingForm.formState.errors.price && (
              <p className='text-red-500 text-xs mt-1'>
                {bookingForm.formState.errors.price.message}
              </p>
              )}
            </div>
          </div>
          <div>
            <Input
              label='Sana'
              type='date'
              className='scheme-dark'
              {...bookingForm.register('date')}
            />
            {bookingForm.formState.errors.date && (
              <p className='text-red-500 text-xs mt-1'>
                {bookingForm.formState.errors.date.message}
              </p>
            )}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
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
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.start_time.message}
                </p>
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
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.end_time.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Input
              label='Izohlar'
              placeholder="Qo'shimcha izohlar..."
              {...bookingForm.register('notes')}
            />
          </div>

          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' type='button' onClick={handleCloseBooking}>
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Bronni Tasdiqlash
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        isOpen={newProduct}
        onClose={handleCloseProduct}
        title="Yangi Mahsulot Qo'shish"
        description="Omborga yangi mahsulot qo'shing."
        icon={<Package className='text-primary h-8 w-8' />}
      >
        <form
          onSubmit={productForm.handleSubmit(onProductSubmit)}
          className='space-y-2 sm:space-y-4'
        >
          <div>
            <Input
              label='Mahsulot Nomi'
              placeholder='Masalan: Matt Loy'
              {...productForm.register('name')}
            />
            {productForm.formState.errors.name && (
              <p className='text-red-500 text-xs mt-1'>
                {productForm.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Select
                label='Kategoriya'
                icon={<Package className='h-4 w-4' />}
                {...productForm.register('category')}
              >
                <option value=''>Tanlang</option>
                <option>Soch Bezatish</option>
                <option>Sartaroshlik</option>
                <option>Soqol Parvarishi</option>
              </Select>
              {productForm.formState.errors.category && (
                <p className='text-red-500 text-xs mt-1'>
                  {productForm.formState.errors.category.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label='Narx ($)'
                type='number'
                step='0.01'
                placeholder='0.00'
                {...productForm.register('price', { valueAsNumber: true })}
              />
              {productForm.formState.errors.price && (
                <p className='text-red-500 text-xs mt-1'>
                  {productForm.formState.errors.price.message}
                </p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Joriy Zaxira'
                type='number'
                placeholder='0'
                {...productForm.register('stock', { valueAsNumber: true })}
              />
              {productForm.formState.errors.stock && (
                <p className='text-red-500 text-xs mt-1'>
                  {productForm.formState.errors.stock.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label='Min Zaxira Ogohlantirishi'
                type='number'
                placeholder='10'
                {...productForm.register('minStock', { valueAsNumber: true })}
              />
              {productForm.formState.errors.minStock && (
                <p className='text-red-500 text-xs mt-1'>
                  {productForm.formState.errors.minStock.message}
                </p>
              )}
            </div>
          </div>
          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' type='button' onClick={handleCloseProduct}>
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Mahsulotni Saqlash
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Client Modal */}
      <Modal
        isOpen={newClient}
        onClose={handleCloseClient}
        title="Yangi Mijoz Qo'shish"
        description='Yangi mijoz profili yarating.'
        icon={<UserPlus className='text-primary h-8 w-8' />}
      >
        <form
          onSubmit={clientForm.handleSubmit(onClientSubmit)}
          className='space-y-2 sm:space-y-4'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Ism'
                placeholder='Jasur'
                {...clientForm.register('firstName')}
              />
              {clientForm.formState.errors.firstName && (
                <p className='text-red-500 text-xs mt-1'>
                  {clientForm.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label='Familiya'
                placeholder='Karimov'
                {...clientForm.register('lastName')}
              />
              {clientForm.formState.errors.lastName && (
                <p className='text-red-500 text-xs mt-1'>
                  {clientForm.formState.errors.lastName.message}
                </p>
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
              <p className='text-red-500 text-xs mt-1'>
                {clientForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label='Telefon Raqam'
              placeholder='+998 (90) 000-0000'
              {...clientForm.register('phone')}
            />
            {clientForm.formState.errors.phone && (
              <p className='text-red-500 text-xs mt-1'>
                {clientForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' type='button' onClick={handleCloseClient}>
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Profil Yaratish
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Client Modal */}
      <Modal
        isOpen={editClient}
        onClose={handleCloseEditClient}
        title="Mijozni Tahrirlash"
        description="Mijoz ma\'lumotlarini yangilang."
        icon={<UserPlus className='text-primary h-8 w-8' />}
      >
        <form
          onSubmit={clientForm.handleSubmit(onEditClientSubmit)}
          className='space-y-2 sm:space-y-4'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Ism'
                placeholder='Jasur'
                {...clientForm.register('firstName')}
              />
              {clientForm.formState.errors.firstName && (
                <p className='text-red-500 text-xs mt-1'>
                  {clientForm.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label='Familiya'
                placeholder='Karimov'
                {...clientForm.register('lastName')}
              />
              {clientForm.formState.errors.lastName && (
                <p className='text-red-500 text-xs mt-1'>
                  {clientForm.formState.errors.lastName.message}
                </p>
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
              <p className='text-red-500 text-xs mt-1'>
                {clientForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label='Telefon Raqam'
              placeholder='+998 (90) 000-0000'
              {...clientForm.register('phone')}
            />
            {clientForm.formState.errors.phone && (
              <p className='text-red-500 text-xs mt-1'>
                {clientForm.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' type='button' onClick={handleCloseEditClient}>
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Staff Modal */}
      <Modal
        isOpen={newStaff}
        onClose={handleCloseStaff}
        title="Xodim Qo'shish"
        description="Jamoangizga yangi mutaxassis ro'yxatga olish."
        icon={<Scissors className='text-primary h-8 w-8' />}
      >
        <form
          onSubmit={staffForm.handleSubmit(onStaffSubmit)}
          className='space-y-2 sm:space-y-4'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Xodim Ismi'
                placeholder='Masalan: Jasur Karimov'
                icon={<UserPlus className='h-4 w-4' />}
                {...staffForm.register('name')}
              />
              {staffForm.formState.errors.name && (
                <p className='text-red-500 text-xs mt-1'>
                  {staffForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Select
                label='Mutaxassislik / Lavozim'
                icon={<Scissors className='h-4 w-4' />}
                {...staffForm.register('role')}
              >
                <option value=''>Tanlang</option>
                <option>Bosh Sartarosh</option>
                <option>Kichik Sartarosh</option>
                <option>Stilist</option>
              </Select>
              {staffForm.formState.errors.role && (
                <p className='text-red-500 text-xs mt-1'>
                  {staffForm.formState.errors.role.message}
                </p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Telefon Raqam'
                placeholder='(555) 000-0000'
                {...staffForm.register('phone')}
              />
              {staffForm.formState.errors.phone && (
                <p className='text-red-500 text-xs mt-1'>
                  {staffForm.formState.errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type='number'
                label='Komissiya Stavkasi (%)'
                placeholder='Masalan: 45'
                {...staffForm.register('commission', { valueAsNumber: true })}
              />
              {staffForm.formState.errors.commission && (
                <p className='text-red-500 text-xs mt-1'>
                  {staffForm.formState.errors.commission.message}
                </p>
              )}
            </div>
          </div>
          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' type='button' onClick={handleCloseStaff}>
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Xodim Qo'shish
            </Button>
          </div>
        </form>
      </Modal>

      {/* Process Payment Modal */}
      <Modal
        isOpen={newPayment}
        onClose={handleClosePayment}
        title="To'lovni Qayta Ishlash"
        description='Mijoz uchun tranzaktsiyani yakunlang.'
        icon={<CreditCard className='text-primary h-8 w-8' />}
      >
        <div className='space-y-2 sm:space-y-4'>
          <Input
            label='Mijozni Tanlash'
            placeholder='Mijozni qidiring...'
            icon={<Search className='h-4 w-4' />}
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <Select label="To'lov Usuli">
              <option>Kredit Karta</option>
              <option>Naqd Pul</option>
              <option>Sovg'a Kartasi</option>
            </Select>
            <Input
              label='Jami Miqdor ($)'
              type='number'
              placeholder='0.00'
              className='text-right'
            />
          </div>
          <div className='bg-surface-light p-3 sm:p-4 rounded-xl border border-white/5'>
            <div className='flex justify-between text-sm mb-2'>
              <span className='text-gray-400'>Narx</span>
              <span className='text-white'>$0.00</span>
            </div>
            <div className='flex justify-between text-sm mb-2'>
              <span className='text-gray-400'>Soliq (8%)</span>
              <span className='text-white'>$0.00</span>
            </div>
            <div className='border-t border-white/5 my-2 pt-2 flex justify-between font-bold'>
              <span className='text-white'>Jami</span>
              <span className='text-primary'>$0.00</span>
            </div>
          </div>
          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' onClick={handleClosePayment}>
              Bekor Qilish
            </Button>
            <Button variant='default' className='w-full sm:w-auto'>
              Kartani To'lash
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Client Modal */}
      <Modal
        isOpen={deleteClient}
        onClose={handleCloseDeleteClient}
        title="Mijozni O'chirish"
        description="Bu amalni ortga qaytarib bo'lmaydi. Mijoz va unga tegishli barcha ma'lumotlar o'chiriladi."  
        icon={<AlertTriangle className='text-red-500 h-8 w-8' />}
      >
        <div className='space-y-4'>
          {clientToDelete && (
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4'>
              <p className='text-sm text-gray-300'>
                <span className='font-semibold text-white'>
                  {clientToDelete.name}
                </span>{' '}
                nomli mijozni o'chirmoqchimisiz?
              </p>
            </div>
          )}
          
          <div className='pt-3 flex justify-end gap-3 border-t border-white/5'>
            <Button 
              variant='ghost' 
              onClick={handleCloseDeleteClient}
            >
              Bekor Qilish
            </Button>
            <Button 
              variant='default' 
              onClick={onDeleteSubmit}
              className='bg-red-600 hover:bg-red-700 text-white'
            >
              O'chirish
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Service Modal */}
      <Modal
        isOpen={newService}
        onClose={handleCloseService}
        title="Yangi Xizmat Qo'shish"
        description="Yangi xizmat yarating."
        icon={<Wrench className='text-primary h-8 w-8' />}
      >
        <form
          onSubmit={serviceForm.handleSubmit(onServiceSubmit)}
          className='space-y-2 sm:space-y-4'
        >
          <div>
            <Input
              label='Xizmat Nomi'
              placeholder='Masalan: Soch Kesish'
              {...serviceForm.register('name')}
            />
            {serviceForm.formState.errors.name && (
              <p className='text-red-500 text-xs mt-1'>
                {serviceForm.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Ta'rif"
              placeholder="Xizmat ta'rifini kiriting"
              {...serviceForm.register('description')}
            />
            {serviceForm.formState.errors.description && (
              <p className='text-red-500 text-xs mt-1'>
                {serviceForm.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Narx'
                placeholder='25000'
                {...serviceForm.register('price')}
              />
              {serviceForm.formState.errors.price && (
                <p className='text-red-500 text-xs mt-1'>
                  {serviceForm.formState.errors.price.message}
                </p>
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
                <p className='text-red-500 text-xs mt-1'>
                  {serviceForm.formState.errors.duration_minutes.message}
                </p>
              )}
            </div>
          </div>
          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' type='button' onClick={handleCloseService}>
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Xizmat Qo'shish
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Service Modal */}
      <Modal
        isOpen={editService}
        onClose={handleCloseEditService}
        title="Xizmatni Tahrirlash"
        description="Xizmat ma'lumotlarini yangilang."
        icon={<Wrench className='text-primary h-8 w-8' />}
      >
        <form
          onSubmit={serviceForm.handleSubmit(onEditServiceSubmit)}
          className='space-y-2 sm:space-y-4'
        >
          <div>
            <Input
              label='Xizmat Nomi'
              placeholder='Masalan: Soch Kesish'
              {...serviceForm.register('name')}
            />
            {serviceForm.formState.errors.name && (
              <p className='text-red-500 text-xs mt-1'>
                {serviceForm.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Ta'rif"
              placeholder="Xizmat ta'rifini kiriting"
              {...serviceForm.register('description')}
            />
            {serviceForm.formState.errors.description && (
              <p className='text-red-500 text-xs mt-1'>
                {serviceForm.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Narx'
                placeholder='25000'
                {...serviceForm.register('price')}
              />
              {serviceForm.formState.errors.price && (
                <p className='text-red-500 text-xs mt-1'>
                  {serviceForm.formState.errors.price.message}
                </p>
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
                <p className='text-red-500 text-xs mt-1'>
                  {serviceForm.formState.errors.duration_minutes.message}
                </p>
              )}
            </div>
          </div>
          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button variant='ghost' type='button' onClick={handleCloseEditService}>
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Service Modal */}
      <Modal
        isOpen={deleteService}
        onClose={handleCloseDeleteService}
        title="Xizmatni O'chirish"
        description="Bu amalni ortga qaytarib bo'lmaydi. Xizmat va unga tegishli barcha ma'lumotlar o'chiriladi."
        icon={<AlertTriangle className='text-red-500 h-8 w-8' />}
      >
        <div className='space-y-4'>
          {serviceToDelete && (
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4'>
              <p className='text-sm text-gray-300'>
                <span className='font-semibold text-white'>
                  {serviceToDelete.name}
                </span>{' '}
                nomli xizmatni o'chirmoqchimisiz?
              </p>
            </div>
          )}
          
          <div className='pt-3 flex justify-end gap-3 border-t border-white/5'>
            <Button 
              variant='ghost' 
              onClick={handleCloseDeleteService}
            >
              Bekor Qilish
            </Button>
            <Button 
              variant='default' 
              onClick={onDeleteServiceSubmit}
              className='bg-red-600 hover:bg-red-700 text-white'
            >
              O'chirish
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
