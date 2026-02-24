import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { data as appointmentsData } from '@/constants/appointments';
import { staffMembers as barbers } from '@/constants/barber';
import { zodResolver } from '@hookform/resolvers/zod';
import { Scissors, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import type { AppoitmentRes } from '@/app/api/appoitmentsApi/type';

// --- Constants ---

const SERVICES = [
  ...new Set(appointmentsData.map((a) => a.service)),
  'Klassik Soch Olish',
  'Issiq Sochiq Bilan Soqol Olish',
  'Soqol Shakllantirish',
  'Tez Yuz Parvarishi',
  'Fade & Beard',
  'Kids Cut',
  'Royal Shave',
  'Buzz Cut',
  'Coloring',
  'Haircut',
].filter((v, i, a) => a.indexOf(v) === i);

const CLIENTS = [
  ...new Set(appointmentsData.map((a) => a.client)),
  'James Wilson',
  'Elena R.',
  'Robert Brown',
  'Mike K.',
  'Sarah M.',
  'David L.',
].filter((v, i, a) => a.indexOf(v) === i);

// --- Schema ---

const editAppointmentSchema = z.object({
  client: z.string().min(2, 'Mijoz ismi talab qilinadi'),
  barber: z.string().min(1, 'Sartarosh tanlanishi shart'),
  service: z.string().min(2, 'Xizmat talab qilinadi'),
  datetime: z.string().min(1, 'Sana va vaqt talab qilinadi'),
  status: z.string().min(1, 'Holat talab qilinadi'),
  price: z.number().min(0, "Narx manfiy bo'lmasligi kerak"),
});

type EditForm = z.infer<typeof editAppointmentSchema>;

// --- Combobox Field Wrapper ---

interface ComboboxFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
}

const ComboboxField = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Qidiring...',
  error,
}: ComboboxFieldProps) => {
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    const found = options.find((o) => o.value === value);
    setInputVal(found ? found.label : value);
  }, [value, options]);

  const filtered = inputVal
    ? options.filter((o) =>
        o.label.toLowerCase().includes(inputVal.toLowerCase()),
      )
    : options;

  return (
    <div>
      <label className='block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 ml-0.5'>
        {label}
      </label>
      <Combobox
        value={value}
        onValueChange={(v) => {
          onChange(v as string);
          const found = options.find((o) => o.value === v);
          setInputVal(found ? found.label : (v as string));
        }}
      >
        {/* Full-width custom input wrapper */}
        <div className='relative w-full flex items-center h-11 rounded-xl bg-surface-light border border-white/10 px-3 focus-within:border-primary/50 transition-colors'>
          <ComboboxInput
            placeholder={placeholder}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            showTrigger={false}
            showClear={false}
            className='w-full [&>div]:w-full [&>div]:border-0 [&>div]:shadow-none [&>div]:bg-transparent [&>div]:h-auto [&>div]:rounded-none [&_input]:w-full [&_input]:bg-transparent [&_input]:border-0 [&_input]:text-white [&_input]:placeholder-gray-500 [&_input]:text-sm [&_input]:outline-none [&_input]:shadow-none [&_input]:h-auto [&_input]:p-0 [&_input]:ring-0'
          />
          {value && (
            <button
              type='button'
              onClick={() => {
                onChange('');
                setInputVal('');
              }}
              className='text-gray-500 hover:text-white transition-colors ml-2 shrink-0'
            >
              ✕
            </button>
          )}
        </div>
        <ComboboxContent className='bg-surface border-white/10 text-white z-200'>
          <ComboboxList>
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <ComboboxItem
                  key={opt.value}
                  value={opt.value}
                  className='text-gray-300 hover:text-white focus:text-white focus:bg-white/5 data-highlighted:bg-white/5 data-highlighted:text-white rounded-md'
                >
                  {opt.label}
                </ComboboxItem>
              ))
            ) : (
              <ComboboxEmpty>Topilmadi</ComboboxEmpty>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
};

// --- Edit Modal ---

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppoitmentRes['data'][0] | null;
}

export const EditAppointmentModal = ({
  isOpen,
  onClose,
  appointment,
}: EditAppointmentModalProps) => {
  const form = useForm<EditForm>({
    resolver: zodResolver(editAppointmentSchema) as any,
    defaultValues: {
      client: '',
      barber: '',
      service: '',
      datetime: '',
      status: 'Pending',
      price: 0,
    },
  });

  // appointment date + time → datetime-local format helper
  const toDatetimeLocal = (date: string, time: string) => {
    // date is day-of-month (e.g. "24"), time is "10:00 AM"
    // Build a rough ISO string for current month/year
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(date).padStart(2, '0');

    // parse 12h time → 24h
    const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return `${year}-${month}-${day}T00:00`;
    let hours = parseInt(match[1]);
    const minutes = match[2];
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${year}-${month}-${day}T${String(hours).padStart(2, '0')}:${minutes}`;
  };

  useEffect(() => {
    if (appointment && isOpen) {
      form.reset({
        client: appointment.client_name,
        barber: appointment.staff_member_name,
        service: appointment.service_name,
        datetime: toDatetimeLocal(appointment.date, appointment.start_time),
        status: appointment.status,
        price: Number(appointment.price),
      });
    }
  }, [appointment, isOpen]);

  const onSubmit = (data: EditForm) => {
    console.log('Edit appointment:', data);
    onClose();
    form.reset();
  };

  const barberOptions = barbers.map((b) => ({ label: b.name, value: b.id }));
  const clientOptions = CLIENTS.map((c) => ({ label: c, value: c }));
  const serviceOptions = SERVICES.map((s) => ({ label: s, value: s }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Bronni Tahrirlash'
      description="Bron ma'lumotlarini yangilang."
      icon={<Scissors className='text-primary h-8 w-8' />}
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 sm:space-y-4'
      >
        {/* Mijoz Combobox */}
        <ComboboxField
          label='Mijoz Ismi'
          value={form.watch('client')}
          onChange={(v) => form.setValue('client', v, { shouldValidate: true })}
          options={clientOptions}
          placeholder='Mijozni qidiring...'
          error={form.formState.errors.client?.message}
        />

        {/* Sartarosh Combobox */}
        <ComboboxField
          label='Sartarosh'
          value={form.watch('barber')}
          onChange={(v) =>
            form.setValue('barber', v, { shouldValidate: true })
          }
          options={barberOptions}
          placeholder='Sartarosh tanlang...'
          error={form.formState.errors.barber?.message}
        />

        {/* Xizmat Combobox */}
        <ComboboxField
          label='Xizmat'
          value={form.watch('service')}
          onChange={(v) =>
            form.setValue('service', v, { shouldValidate: true })
          }
          options={serviceOptions}
          placeholder='Xizmat tanlang...'
          error={form.formState.errors.service?.message}
        />

        {/* Sana va Vaqt — datetime-local */}
        <div>
          <Input
            label='Sana va Vaqt'
            type='datetime-local'
            className='scheme-dark'
            {...form.register('datetime')}
          />
          {form.formState.errors.datetime && (
            <p className='text-red-500 text-xs mt-1'>
              {form.formState.errors.datetime.message}
            </p>
          )}
        </div>

        {/* Holat & Narx */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
          <div>
            <Select label='Holat' {...form.register('status')}>
              <option value='Pending'>Kutilmoqda</option>
              <option value='Confirmed'>Tasdiqlangan</option>
              <option value='Completed'>Yakunlangan</option>
              <option value='Cancelled'>Bekor qilingan</option>
            </Select>
          </div>
          <div>
            <Input
              label='Narx ($)'
              type='number'
              step='0.01'
              placeholder='0.00'
              {...form.register('price', { valueAsNumber: true })}
            />
            {form.formState.errors.price && (
              <p className='text-red-500 text-xs mt-1'>
                {form.formState.errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div className='pt-3 sm:pt-5 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
          <Button variant='ghost' type='button' onClick={onClose}>
            Bekor Qilish
          </Button>
          <Button variant='default' type='submit'>
            Saqlash
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// --- Delete Confirm Modal ---

interface DeleteAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppoitmentRes['data'][0] | null;
}

export const DeleteAppointmentModal = ({
  isOpen,
  onClose,
  appointment,
}: DeleteAppointmentModalProps) => {
  const handleDelete = () => {
    console.log('Delete appointment:', appointment?.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bronni O'chirish"
      description={
        appointment
          ? `"${appointment.client_name}" uchun ${appointment.service_name} bronini o'chirmoqchimisiz?`
          : ''
      }
      icon={<Trash2 className='text-red-400 h-8 w-8' />}
    >
      <div className='space-y-4'>
        <div className='bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-300'>
          Bu amal qaytarib bo'lmaydi. Bron butunlay o'chiriladi.
        </div>
        <div className='pt-2 flex justify-end gap-2 sm:gap-4 border-t border-white/5'>
          <Button variant='ghost' type='button' onClick={onClose}>
            Bekor Qilish
          </Button>
          <Button
            variant='default'
            type='button'
            onClick={handleDelete}
            className='bg-red-500/90 hover:bg-red-500 text-white border-red-500/30'
          >
            Ha, O'chirish
          </Button>
        </div>
      </div>
    </Modal>
  );
};
