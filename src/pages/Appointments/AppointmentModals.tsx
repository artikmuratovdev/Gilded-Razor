import type { AppoitmentRes } from '@/app/api/appoitmentsApi/type';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { zodResolver } from '@hookform/resolvers/zod';
import { Scissors, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useUpdateAppoitmentMutation } from '@/app/api/appoitmentsApi/appoitmentsApi';
import { useHandleRequest } from '@/hooks/HandleRequest/useHandleRequest';
import z from 'zod';
import { useGetAllStaffQuery } from '@/app/api/staffApi/staffApi';
import { useGetClientsQuery } from '@/app/api/clientsApi/clientsApi';
import { useGetServiceQuery } from '@/app/api/serviceApi/serviceApi';

export const editAppointmentSchema = z.object({
  client: z.string().min(1, 'Mijoz tanlanishi shart'),
  barber: z.string().min(1, 'Sartarosh tanlanishi shart'),
  service: z.string().min(1, 'Xizmat tanlanishi shart'),
  date: z.string().min(1, 'Sana talab qilinadi'),
  start_time: z.string().min(1, 'Boshlanish vaqti talab qilinadi'),
  end_time: z.string().min(1, 'Tugash vaqti talab qilinadi'),
  status: z.string().min(1, 'Holat talab qilinadi'),
  price: z.number().min(0, "Narx manfiy bo'lmasligi kerak"),
});

export type EditForm = z.infer<typeof editAppointmentSchema>;

// --- Combobox Field Wrapper ---

interface ComboboxFieldProps {
  label: string;
  value: string;           // ID stored in form
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  onSearch?: (query: string) => void;
  placeholder?: string;
  error?: string;
}

const ComboboxField = ({
  label,
  value,
  onChange,
  options,
  onSearch,
  placeholder = 'Qidiring...',
  error,
}: ComboboxFieldProps) => {
  const [inputVal, setInputVal] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When selected value or options change, show the label for the selected ID
  useEffect(() => {
    const found = options.find((o) => o.value === value);
    if (found) setInputVal(found.label);
  }, [value, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setInputVal(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch?.(q);
    }, 300);
  };

  return (
    <div>
      <label className='block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 ml-0.5'>
        {label}
      </label>
      <Combobox
        filter={null}
        value={value}
        onValueChange={(v) => {
          const id = v as string;
          onChange(id);
          const found = options.find((o) => o.value === id);
          setInputVal(found ? found.label : '');
          onSearch?.('');
        }}
      >
        <div className='relative w-full flex items-center h-11 rounded-xl bg-surface-light border border-white/10 px-3 focus-within:border-primary/50 transition-colors'>
          <ComboboxInput
            placeholder={placeholder}
            value={inputVal}
            onChange={handleInputChange}
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
                onSearch?.('');
              }}
              className='text-gray-500 hover:text-white transition-colors ml-2 shrink-0'
            >
              ✕
            </button>
          )}
        </div>
        <ComboboxContent className='bg-surface border-white/10 text-white z-200'>
          <ComboboxList>
            <ComboboxEmpty>Topilmadi</ComboboxEmpty>
            {options.map((opt) => (
              <ComboboxItem
                key={opt.value}
                value={opt.value}
                className='text-gray-300 hover:text-white focus:text-white focus:bg-white/5 data-highlighted:bg-white/5 data-highlighted:text-white rounded-md'
              >
                {opt.label}
              </ComboboxItem>
            ))}
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
    resolver: zodResolver(editAppointmentSchema),
    defaultValues: {
      client: '',
      barber: '',
      service: '',
      date: '',
      start_time: '',
      end_time: '',
      status: 'pending',
      price: 0,
    },
  });

  // Search states for each combobox
  const [clientSearch, setClientSearch] = useState('');
  const [barberSearch, setBarberSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');

  // API queries with search params
  const { data: barberData } = useGetAllStaffQuery({ search: barberSearch, page_size: 50 });
  const { data: clientData } = useGetClientsQuery({ search: clientSearch, page_size: 50 });
  const { data: serviceData } = useGetServiceQuery({ search: serviceSearch, page_size: 50 });

  // Build options: value = ID (string), label = display name
  const barberOptions = (barberData?.data ?? []).map((b) => ({
    label: b.name,
    value: String(b.id),
  }));
  const clientOptions = (clientData?.data ?? []).map((c) => ({
    label: `${c.first_name} ${c.last_name}`,
    value: String(c.id),
  }));
  const serviceOptions = (serviceData?.data ?? []).map((s) => ({
    label: s.name,
    value: String(s.id),
  }));

  useEffect(() => {
    if (appointment && isOpen) {
      form.reset({
        client: String(appointment.client_id),
        barber: String(appointment.staff_member_id),
        service: String(appointment.service_id),
        date: appointment.date,
        start_time: appointment.start_time?.slice(0, 5) ?? '',
        end_time: appointment.end_time?.slice(0, 5) ?? '',
        status: appointment.status,
        price: Number(appointment.price),
      });
    }
  }, [appointment, isOpen]);

  const [updateAppointment] = useUpdateAppoitmentMutation();
  const handleRequest = useHandleRequest();

  const onSubmit = (data: EditForm) => {
    if (!appointment) return;
    const updateData = {
      ...data,
      client: Number(data.client),
      staff_member: Number(data.barber),
      service: Number(data.service),
    };
    const { barber, ...finalData } = updateData as any;
    handleRequest({
      request: async () => await updateAppointment({ id: appointment.id, body: finalData }),
      onSuccess: (res) => {
        console.log(res.data);
      },
    });
    onClose();
    form.reset();
  };

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
        {/* Mijoz va Sartarosh - 2 ustun */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
          <ComboboxField
            label='Mijoz Ismi'
            value={form.watch('client')}
            onChange={(v) => form.setValue('client', v, { shouldValidate: true })}
            options={clientOptions}
            onSearch={setClientSearch}
            placeholder='Mijozni qidiring...'
            error={form.formState.errors.client?.message}
          />
          <ComboboxField
            label='Sartarosh'
            value={form.watch('barber')}
            onChange={(v) => form.setValue('barber', v, { shouldValidate: true })}
            options={barberOptions}
            onSearch={setBarberSearch}
            placeholder='Sartarosh tanlang...'
            error={form.formState.errors.barber?.message}
          />
        </div>

        {/* Xizmat va Sana - 2 ustun */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
          <ComboboxField
            label='Xizmat'
            value={form.watch('service')}
            onChange={(v) => form.setValue('service', v, { shouldValidate: true })}
            options={serviceOptions}
            onSearch={setServiceSearch}
            placeholder='Xizmat tanlang...'
            error={form.formState.errors.service?.message}
          />
          <div>
            <Input
              label='Sana'
              type='date'
              className='scheme-dark'
              {...form.register('date')}
            />
            {form.formState.errors.date && (
              <p className='text-red-500 text-xs mt-1'>
                {form.formState.errors.date.message}
              </p>
            )}
          </div>
        </div>

        {/* Boshlanish va Tugash Vaqti */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
          <div>
            <Input
              label='Boshlanish Vaqti'
              type='time'
              className='scheme-dark'
              {...form.register('start_time')}
            />
            {form.formState.errors.start_time && (
              <p className='text-red-500 text-xs mt-1'>
                {form.formState.errors.start_time.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label='Tugash Vaqti'
              type='time'
              className='scheme-dark'
              {...form.register('end_time')}
            />
            {form.formState.errors.end_time && (
              <p className='text-red-500 text-xs mt-1'>
                {form.formState.errors.end_time.message}
              </p>
            )}
          </div>
        </div>

        {/* Holat */}
        <div>
          <Select label='Holat' {...form.register('status')}>
            <option value='pending'>Kutilmoqda</option>
            <option value='confirmed'>Tasdiqlangan</option>
            <option value='completed'>Yakunlangan</option>
            <option value='cancelled'>Bekor qilingan</option>
          </Select>
          {form.formState.errors.status && (
            <p className='text-red-500 text-xs mt-1'>
              {form.formState.errors.status.message}
            </p>
          )}
        </div>

        {/* Narx — to'liq kenglik */}
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
