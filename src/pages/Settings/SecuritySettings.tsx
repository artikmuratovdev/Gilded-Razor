import { useChangePasswordMutation } from '@/app/api/userApi';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useHandleRequest } from '@/hooks/HandleRequest/useHandleRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Save, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, 'Eski parolni kiriting'),
    new_password: z
      .string()
      .min(8, "Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak"),
    confirm_password: z.string().min(1, 'Parolni tasdiqlang'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Parollar mos kelmadi',
    path: ['confirm_password'],
  });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const PasswordInput = ({
  label,
  placeholder,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  error?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className='relative'>
        <Input
          {...props}
          label={label}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          icon={<Lock className='h-4 w-4' />}
        />
        <button
          type='button'
          tabIndex={-1}
          onClick={() => setShow((s) => !s)}
          className='absolute right-3 top-9.5 text-gray-400 hover:text-white transition-colors'
        >
          {show ? (
            <EyeOff className='h-4 w-4' />
          ) : (
            <Eye className='h-4 w-4' />
          )}
        </button>
      </div>
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
};

export const SecuritySettings = () => {
  const [changePassword] = useChangePasswordMutation();
  const handleRequest = useHandleRequest();

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit = (data: ChangePasswordForm) => {
    handleRequest({
      request: async () =>
        await changePassword({
          old_password: data.old_password,
          new_password: data.new_password,
        }),
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className='space-y-4'>
      {/* Change Password Card */}
      <Card>
        <CardHeader className='border-b border-white/5 pb-6'>
          <CardTitle>Parolni O'zgartirish</CardTitle>
          <p className='text-sm text-gray-400'>
            Hisobingiz xavfsizligini ta'minlash uchun parolingizni muntazam
            yangilab turing.
          </p>
        </CardHeader>
        <CardContent className='pt-6'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <PasswordInput
              label='Joriy Parol'
              placeholder='Joriy parolingizni kiriting'
              error={form.formState.errors.old_password?.message}
              {...form.register('old_password')}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <PasswordInput
                label='Yangi Parol'
                placeholder='Kamida 8 ta belgi'
                error={form.formState.errors.new_password?.message}
                {...form.register('new_password')}
              />
              <PasswordInput
                label='Yangi Parolni Tasdiqlash'
                placeholder='Yangi parolni qayta kiriting'
                error={form.formState.errors.confirm_password?.message}
                {...form.register('confirm_password')}
              />
            </div>

            <div className='flex justify-end pt-2 border-t border-white/5'>
              <Button type='submit' className='gap-2'>
                <Save className='h-4 w-4' /> Parolni Saqlash
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security info */}
      <Card>
        <CardContent className='p-5'>
          <div className='flex items-start gap-4'>
            <div className='w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0'>
              <ShieldCheck className='w-5 h-5 text-green-400' />
            </div>
            <div>
              <h4 className='text-sm font-bold text-white mb-1'>
                Xavfsizlik Maslahatlari
              </h4>
              <ul className='text-xs text-gray-400 space-y-1 list-disc list-inside'>
                <li>Kamida 8 ta belgi ishlating</li>
                <li>Katta va kichik harflar, raqamlar va maxsus belgilar qo'shing</li>
                <li>Boshqa saytlarda ishlatilgan paroldan foydalanmang</li>
                <li>Parolingizni hech kim bilan baham ko'rmang</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
