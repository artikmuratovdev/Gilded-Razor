import type { RootState } from '@/app/store';
import { staffMembers } from '@/constants/barber';
import { AlertTriangle, CreditCard, Package, Scissors, Search, UserPlus } from 'lucide-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../ui/Button';
import { Input, Select } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import useModalForms from './FormTypes';
import useModalActions from './SubmitFunctions';

// --- Schemas ---
const Modals = () => {
  const forms = useModalForms();
  const { bookingForm, productForm, clientForm, staffForm } = forms;
  const {
    handleCloseBooking,
    handleCloseClient,
    handleClosePayment,
    handleCloseProduct,
    handleCloseStaff,
    handleCloseDeleteClient,
    handleCloseEditClient,
    onBookingSubmit,
    onClientSubmit,
    onProductSubmit,
    onStaffSubmit,
    onDeleteSubmit,
    onEditClientSubmit,
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
  } = useSelector((state: RootState) => state.modal);

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
        price: '',
        status: 'pending',
        notes: '',
      });
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
              <Input
                label='Mijoz (ID)'
                type='number'
                placeholder='Mijoz ID kiriting'
                icon={<Search className='h-4 w-4' />}
                {...bookingForm.register('client', { valueAsNumber: true })}
              />
              {bookingForm.formState.errors.client && (
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.client.message}
                </p>
              )}
            </div>
            <div>
              <Select
                label='Sartarosh Tanlash'
                icon={<Scissors className='h-4 w-4' />}
                {...bookingForm.register('staff_member', {
                  valueAsNumber: true,
                })}
              >
                <option value=''>Mutaxassis tanlang</option>
                {staffMembers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
              {bookingForm.formState.errors.staff_member && (
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.staff_member.message}
                </p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
            <div>
              <Input
                label='Xizmat (ID)'
                type='number'
                placeholder='Xizmat ID kiriting'
                {...bookingForm.register('service', { valueAsNumber: true })}
              />
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
                {...bookingForm.register('price')}
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
                className='scheme-dark'
                {...bookingForm.register('start_time')}
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
                className='scheme-dark'
                {...bookingForm.register('end_time')}
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
    </>
  );
};

export default Modals;
