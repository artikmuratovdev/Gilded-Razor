import { CreditCard, Package, Scissors, Search, UserPlus } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

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
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <Input
              label='Mijoz Ismi'
              placeholder='Mijozni qidiring...'
              icon={<Search className='h-4 w-4' />}
            />
            <Select
              label='Sartarosh Tanlash'
              icon={<Scissors className='h-4 w-4' />}
            >
              <option>Mutaxassis tanlang</option>
              <option>Marcus Cole</option>
              <option>Alex Smith</option>
            </Select>
          </div>
          <Input
            label='Sana va Vaqt'
            type='datetime-local'
            className='scheme-dark'
          />

          <div className='pt-2'>
            <span className='block text-xs font-semibold uppercase tracking-wider text-primary/80 ml-1 mb-3'>
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
                  <input type='checkbox' className='peer sr-only' />
                  <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light border border-white/5 peer-checked:border-primary peer-checked:bg-primary/10 transition-all hover:bg-surface-light/80'>
                    <span className='text-sm text-gray-400 group-hover:text-white peer-checked:text-primary font-medium'>
                      {s}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className='pt-6 flex justify-end gap-4 border-t border-white/5'>
            <Button variant='ghost' onClick={() => onNewBooking(false)}>
              Bekor Qilish
            </Button>
            <Button variant='primary'>Bronni Tasdiqlash</Button>
          </div>
        </div>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        isOpen={newProduct}
        onClose={() => onNewProduct(false)}
        title="Yangi Mahsulot Qo'shish"
        description="Omborga yangi mahsulot qo'shing."
        icon={<Package className='text-primary h-8 w-8' />}
      >
        <div className='space-y-6'>
          <Input label='Mahsulot Nomi' placeholder='Masalan: Matt Loy' />
          <div className='grid grid-cols-2 gap-6'>
            <Select label='Kategoriya'>
              <option>Soch Bezatish</option>
              <option>Sartaroshlik</option>
              <option>Soqol Parvarishi</option>
            </Select>
            <Input label='Narx ($)' type='number' placeholder='0.00' />
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <Input label='Joriy Zaxira' type='number' placeholder='0' />
            <Input
              label='Min Zaxira Ogohlantirishi'
              type='number'
              placeholder='10'
            />
          </div>
          <div className='pt-6 flex justify-end gap-4 border-t border-white/5'>
            <Button variant='ghost' onClick={() => onNewProduct(false)}>
              Bekor Qilish
            </Button>
            <Button variant='primary'>Mahsulotni Saqlash</Button>
          </div>
        </div>
      </Modal>

      {/* Add Client Modal */}
      <Modal
        isOpen={newClient}
        onClose={() => onNewClient(false)}
        title="Yangi Mijoz Qo'shish"
        description='Yangi mijoz profili yarating.'
        icon={<UserPlus className='text-primary h-8 w-8' />}
      >
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <Input label='Ism' placeholder='Jasur' />
            <Input label='Familiya' placeholder='Karimov' />
          </div>
          <Input
            label='Elektron Pochta'
            type='email'
            placeholder='jasur@example.com'
          />
          <Input label='Telefon Raqam' placeholder='+998 (90) 000-0000' />

          <div className='pt-6 flex justify-end gap-4 border-t border-white/5'>
            <Button variant='ghost' onClick={() => onNewClient(false)}>
              Bekor Qilish
            </Button>
            <Button variant='primary'>Profil Yaratish</Button>
          </div>
        </div>
      </Modal>

      {/* Add Staff Modal */}
      <Modal
        isOpen={newStaff}
        onClose={() => onNewStaff(false)}
        title="Xodim Qo'shish"
        description="Jamoangizga yangi mutaxassis ro'yxatga olish."
        icon={<Scissors className='text-primary h-8 w-8' />}
      >
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <Input
              label='Xodim Ismi'
              placeholder='Masalan: Jasur Karimov'
              icon={<UserPlus className='h-4 w-4' />}
            />
            <Select
              label='Mutaxassislik / Lavozim'
              icon={<Scissors className='h-4 w-4' />}
            >
              <option>Bosh Sartarosh</option>
              <option>Kichik Sartarosh</option>
              <option>Stilist</option>
            </Select>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <Input label='Telefon Raqam' placeholder='(555) 000-0000' />
            <Input
              type='number'
              label='Komissiya Stavkasi (%)'
              placeholder='Masalan: 45'
            />
          </div>
          <div className='pt-6 flex justify-end gap-4 border-t border-white/5'>
            <Button variant='ghost' onClick={() => onNewStaff(false)}>
              Bekor Qilish
            </Button>
            <Button variant='primary'>Xodim Qo'shish</Button>
          </div>
        </div>
      </Modal>

      {/* Process Payment Modal */}
      <Modal
        isOpen={newPayment}
        onClose={() => onNewPayment(false)}
        title="To'lovni Qayta Ishlash"
        description='Mijoz uchun tranzaktsiyani yakunlang.'
        icon={<CreditCard className='text-primary h-8 w-8' />}
      >
        <div className='space-y-6'>
          <Input
            label='Mijozni Tanlash'
            placeholder='Mijozni qidiring...'
            icon={<Search className='h-4 w-4' />}
          />
          <div className='grid grid-cols-2 gap-6'>
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
          <div className='bg-surface-light p-4 rounded-xl border border-white/5'>
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
          <div className='pt-6 flex justify-end gap-4 border-t border-white/5'>
            <Button variant='ghost' onClick={() => onNewPayment(false)}>
              Bekor Qilish
            </Button>
            <Button variant='primary' className='w-full sm:w-auto'>
              Kartani To'lash
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
