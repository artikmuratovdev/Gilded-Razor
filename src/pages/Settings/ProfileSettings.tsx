import { useMeQuery } from '@/app/api/authApi';
import {
  useUpdateProfileMutation,
} from '@/app/api/userApi';
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
import { Camera, Save, User } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const profileSchema = z.object({
  first_name: z.string().min(1, 'Ism talab qilinadi'),
  last_name: z.string().min(1, 'Familiya talab qilinadi'),
  email: z
    .string()
    .email("Email noto'g'ri format")
    .or(z.literal(''))
    .optional(),
  phone_number: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export const ProfileSettings = () => {
  const { data: user, isLoading } = useMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const handleRequest = useHandleRequest();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        email: user.email ?? '',
        phone_number: user.phone_number ?? '',
      });
    }
  }, [user, form]);

  const onSubmit = (data: ProfileForm) => {
    handleRequest({
      request: async () => await updateProfile(data),
      onSuccess: () => {
        // Success toast is handled by handleRequest internally
      },
    });
  };

  return (
    <Card>
      <CardHeader className='border-b border-white/5 pb-6'>
        <CardTitle>Mening Profilim</CardTitle>
        <p className='text-sm text-gray-400'>
          Shaxsiy ma'lumotlaringizni ko'ring va yangilang.
        </p>
      </CardHeader>
      <CardContent className='pt-6 space-y-6'>
        {/* Avatar section */}
        <div className='flex items-center gap-5'>
          <div className='relative'>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.first_name}
                className='w-20 h-20 rounded-2xl object-cover border-2 border-white/10'
              />
            ) : (
              <div className='w-20 h-20 rounded-2xl bg-surface-light border-2 border-white/10 flex items-center justify-center'>
                <User className='w-8 h-8 text-gray-500' />
              </div>
            )}
            <button
              type='button'
              className='absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-primary border-2 border-surface flex items-center justify-center hover:bg-primary/80 transition-colors cursor-not-allowed opacity-60'
              title='Tez kunda...'
              disabled
            >
              <Camera className='w-3.5 h-3.5 text-black' />
            </button>
          </div>
          <div>
            {isLoading ? (
              <div className='h-5 w-32 bg-surface-light/60 rounded animate-pulse mb-1' />
            ) : (
              <p className='font-bold text-white'>
                {user?.first_name} {user?.last_name}
              </p>
            )}
            <p className='text-xs text-gray-400 capitalize'>
              {user?.role?.replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <Input
                label='Ism'
                placeholder='Jasur'
                {...form.register('first_name')}
              />
              {form.formState.errors.first_name && (
                <p className='text-red-500 text-xs mt-1'>
                  {form.formState.errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label='Familiya'
                placeholder='Karimov'
                {...form.register('last_name')}
              />
              {form.formState.errors.last_name && (
                <p className='text-red-500 text-xs mt-1'>
                  {form.formState.errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <Input
                label='Elektron Pochta'
                type='email'
                placeholder='jasur@example.com'
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className='text-red-500 text-xs mt-1'>
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                label='Telefon Raqam'
                placeholder='+998901234567'
                {...form.register('phone_number')}
              />
              {form.formState.errors.phone_number && (
                <p className='text-red-500 text-xs mt-1'>
                  {form.formState.errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* Read-only info */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='p-4 rounded-xl bg-surface-light/40 border border-white/5'>
              <p className='text-xs text-gray-500 uppercase font-bold mb-1'>
                Foydalanuvchi Nomi
              </p>
              <p className='text-sm text-white font-semibold'>
                {user?.username ?? '—'}
              </p>
            </div>
            <div className='p-4 rounded-xl bg-surface-light/40 border border-white/5'>
              <p className='text-xs text-gray-500 uppercase font-bold mb-1'>
                Ro'yxatdan O'tgan Sana
              </p>
              <p className='text-sm text-white font-semibold'>
                {user?.date_joined
                  ? new Date(user.date_joined).toLocaleDateString('uz-UZ')
                  : '—'}
              </p>
            </div>
          </div>

          <div className='flex justify-end pt-2 border-t border-white/5'>
            <Button type='submit' className='gap-2'>
              <Save className='h-4 w-4' /> O'zgarishlarni Saqlash
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
