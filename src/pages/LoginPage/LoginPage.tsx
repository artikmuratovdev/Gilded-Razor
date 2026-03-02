import { useLoginMutation } from '@/app/api/authApi';
import { getAccessToken } from '@/app/tokenManager';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { useHandleRequest } from '@/hooks/HandleRequest/useHandleRequest';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import { useState } from 'react';
import z from 'zod';
import { toast } from 'sonner';

const loginSchema = z.object({
  phone_number: z
    .string()
    .min(1, 'Telefon raqam kiritilishi shart')
    .regex(/^\+998\d{9}$/, 'Format: +998XXXXXXXXX'),
  password: z.string().min(1, 'Parol kiritilishi shart'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [login] = useLoginMutation();
  const handleRequest = useHandleRequest();
  const token = getAccessToken();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone_number: import.meta.env.VITE_LOGIN || '',
      password: import.meta.env.VITE_PASSWORD || '',
    },
  });

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }

  const onSubmit = async (data: LoginFormValues) => {
    await handleRequest({
      request: async () => login(data),
      onSuccess: () => {
        // navigate('/dashboard');
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };


  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div
        className={cn('flex flex-col gap-6 w-full max-w-md', className)}
        {...props}
      >
        <Card className='py-6'>
          <CardHeader className='flex flex-col items-center justify-center gap-3'>
            <CardTitle className='w-11 h-11 rounded-full bg-linear-to-br from-primary to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20'>G</CardTitle>
            <CardDescription className='font-bold text-xl tracking-tight text-white leading-tight'>
              Gilded Razor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className='flex flex-col gap-4'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name='phone_number'
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    label='Telefon raqam'
                    id='phone'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.phone_number?.message}
                  />
                )}
              />
              <Input
                label='Parol'
                id='password'
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={errors.password?.message}
                rightIcon={
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    className='text-gray-400 hover:text-white transition-colors focus:outline-none'
                    aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
                  >
                    {showPassword ? (
                      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94'/>
                        <path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19'/>
                        <line x1='1' y1='1' x2='23' y2='23'/>
                      </svg>
                    ) : (
                      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/>
                        <circle cx='12' cy='12' r='3'/>
                      </svg>
                    )}
                  </button>
                }
              />
              <div className='flex flex-col gap-3 pt-2'>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Kirish...' : 'Login'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
