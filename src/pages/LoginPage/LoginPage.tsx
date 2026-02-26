import { useLoginMutation } from '@/app/api/authApi';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useHandleRequest } from '@/hooks/HandleRequest/useHandleRequest';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';

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
  const navigate = useNavigate();

  const {
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

  const onSubmit = async (data: LoginFormValues) => {
    await handleRequest({
      request: async () => login(data),
      onSuccess: () => navigate('/dashboard'),
      onError: (error) => {
        console.log(error?.error?.message || error);
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
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className='flex flex-col gap-4'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label='Telefon raqam'
                id='phone'
                type='tel'
                placeholder='+998901234567'
                {...register('phone_number')}
                error={errors.phone_number?.message}
              />
              <Input
                label='Parol'
                id='password'
                type='password'
                {...register('password')}
                error={errors.password?.message}
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
