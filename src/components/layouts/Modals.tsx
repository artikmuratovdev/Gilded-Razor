import { staffMembers } from '@/constants/barber';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, Package, Scissors, Search, UserPlus } from 'lucide-react';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

// --- Schemas ---

const bookingSchema = z.object({
  clientName: z.string().min(2, 'Mijoz ismi talab qilinadi'),
  barberId: z.string().min(1, 'Sartarosh tanlanishi shart'),
  datetime: z.string().min(1, 'Sana va vaqt talab qilinadi'),
  services: z.array(z.string()).min(1, 'Kamida bitta xizmat tanlang'),
});

const productSchema = z.object({
  name: z.string().min(2, 'Mahsulot nomi talab qilinadi'),
  category: z.string().min(1, 'Kategoriya tanlanishi shart'),
  price: z.number().min(0, "Narx manfiy bo'lmasligi kerak"),
  stock: z.number().min(0, "Zaxira manfiy bo'lmasligi kerak"),
  minStock: z.number().min(0, "Min zaxira manfiy bo'lmasligi kerak"),
});

const clientSchema = z.object({
  firstName: z.string().min(2, 'Ism talab qilinadi'),
  lastName: z.string().min(2, 'Familiya talab qilinadi'),
  email: z.string().email("Noto'g'ri email format"),
  phone: z
    .string()
    .min(10, "Telefon raqami kamida 10 ta belgidan iborat bo'lishi kerak"),
});

const staffSchema = z.object({
  name: z.string().min(2, 'Ism talab qilinadi'),
  role: z.string().min(1, 'Lavozim talab qilinadi'),
  phone: z.string().min(10, "To'g'ri telefon raqam talab qilinadi"),
  commission: z.number().min(0).max(100),
});

// --- Types ---

type BookingForm = z.infer<typeof bookingSchema>;
type ProductForm = z.infer<typeof productSchema>;
type ClientForm = z.infer<typeof clientSchema>;
type StaffForm = z.infer<typeof staffSchema>;

type ModalProps = {
  newBooking: boolean;
  newStaff: boolean;
  newClient: boolean;
  newProduct: boolean;
  newPayment: boolean;
  onNewBooking: Dispatch<SetStateAction<boolean>>;
  onNewStaff: Dispatch<SetStateAction<boolean>>;
  onNewClient: Dispatch<SetStateAction<boolean>>;
  onNewProduct: Dispatch<SetStateAction<boolean>>;
  onNewPayment: Dispatch<SetStateAction<boolean>>;
};

const Modals = ({
  newBooking,
  onNewBooking,
  onNewStaff,
  newStaff,
  onNewClient,
  newClient,
  onNewProduct,
  newProduct,
  onNewPayment,
  newPayment,
}: ModalProps) => {
  const [searchParams] = useSearchParams();

  // URL parameters for booking
  const paramDate = searchParams.get('date');
  const paramTime = searchParams.get('time');
  const defaultDateTime =
    paramDate && paramTime ? `${paramDate}T${paramTime}` : '';

  // --- Form Hooks ---

  const bookingForm = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clientName: '',
      barberId: searchParams.get('barberId') || '',
      datetime: defaultDateTime,
      services: [],
    },
  });

  // URL o'zgarganda bookingForm ni yangilash
  useEffect(() => {
    if (newBooking) {
      bookingForm.reset({
        clientName: bookingForm.getValues('clientName'), // Mijoz ismini saqlab qolish
        barberId: searchParams.get('barberId') || '',
        datetime: defaultDateTime,
        services: bookingForm.getValues('services'), // Tanlangan xizmatlarni saqlab qolish
      });
    }
  }, [newBooking, defaultDateTime, searchParams, bookingForm]);

  const productForm = useForm<ProductForm>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      stock: 0,
      minStock: 10,
    },
  });

  const clientForm = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  const staffForm = useForm<StaffForm>({
    resolver: zodResolver(staffSchema) as any,
    defaultValues: {
      name: '',
      role: '',
      phone: '',
      commission: 45,
    },
  });

  // --- Submit Handlers ---

  const onBookingSubmit = (data: BookingForm) => {
    console.log('Booking submitted:', data);
    onNewBooking(false);
    bookingForm.reset();
  };

  const onProductSubmit = (data: ProductForm) => {
    console.log('Product submitted:', data);
    onNewProduct(false);
    productForm.reset();
  };

  const onClientSubmit = (data: ClientForm) => {
    console.log('Client submitted:', data);
    onNewClient(false);
    clientForm.reset();
  };

  const onStaffSubmit = (data: StaffForm) => {
    console.log('Staff submitted:', data);
    onNewStaff(false);
    staffForm.reset();
  };

  return (
    <>
      {/* New Booking Modal */}
      <Modal
        isOpen={newBooking}
        onClose={() => onNewBooking(false)}
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
                label='Mijoz Ismi'
                placeholder='Mijozni qidiring...'
                icon={<Search className='h-4 w-4' />}
                {...bookingForm.register('clientName')}
              />
              {bookingForm.formState.errors.clientName && (
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.clientName.message}
                </p>
              )}
            </div>
            <div>
              <Select
                label='Sartarosh Tanlash'
                icon={<Scissors className='h-4 w-4' />}
                {...bookingForm.register('barberId')}
              >
                <option value=''>Mutaxassis tanlang</option>
                {staffMembers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
              {bookingForm.formState.errors.barberId && (
                <p className='text-red-500 text-xs mt-1'>
                  {bookingForm.formState.errors.barberId.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Input
              label='Sana va Vaqt'
              type='datetime-local'
              className='scheme-dark'
              {...bookingForm.register('datetime')}
            />
            {bookingForm.formState.errors.datetime && (
              <p className='text-red-500 text-xs mt-1'>
                {bookingForm.formState.errors.datetime.message}
              </p>
            )}
          </div>

          <div className='pt-1'>
            <span className='block text-xs font-semibold uppercase tracking-wider text-primary/80 ml-1 mb-2'>
              Xizmatlarni Tanlang
            </span>
            <div className='flex flex-wrap gap-2'>
              {[
                'Klassik Soch Olish',
                'Issiq Sochiq Bilan Soqol Olish',
                'Soqol Shakllantirish',
                'Tez Yuz Parvarishi',
              ].map((s) => (
                <label key={s} className='cursor-pointer group relative'>
                  <input
                    type='checkbox'
                    value={s}
                    className='peer sr-only'
                    {...bookingForm.register('services')}
                  />
                  <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light border border-white/5 peer-checked:border-primary peer-checked:bg-primary/10 transition-all hover:bg-surface-light/80'>
                    <span className='text-xs text-gray-400 group-hover:text-white peer-checked:text-primary font-medium'>
                      {s}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            {bookingForm.formState.errors.services && (
              <p className='text-red-500 text-xs mt-1'>
                {bookingForm.formState.errors.services.message}
              </p>
            )}
          </div>

          <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
            <Button
              variant='ghost'
              type='button'
              onClick={() => onNewBooking(false)}
            >
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
        onClose={() => onNewProduct(false)}
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
            <Button
              variant='ghost'
              type='button'
              onClick={() => onNewProduct(false)}
            >
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
        onClose={() => onNewClient(false)}
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
            <Button
              variant='ghost'
              type='button'
              onClick={() => onNewClient(false)}
            >
              Bekor Qilish
            </Button>
            <Button variant='default' type='submit'>
              Profil Yaratish
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Staff Modal */}
      <Modal
        isOpen={newStaff}
        onClose={() => onNewStaff(false)}
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
            <Button
              variant='ghost'
              type='button'
              onClick={() => onNewStaff(false)}
            >
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
        onClose={() => onNewPayment(false)}
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
            <Button variant='ghost' onClick={() => onNewPayment(false)}>
              Bekor Qilish
            </Button>
            <Button variant='default' className='w-full sm:w-auto'>
              Kartani To'lash
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
