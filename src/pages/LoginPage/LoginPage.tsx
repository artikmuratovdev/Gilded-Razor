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
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [login] = useLoginMutation();
  const handleRequest = useHandleRequest();
  const navigate = useNavigate();

  const phoneRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (phoneRef.current && passwordRef.current) {
      phoneRef.current.value = '+998901234567';
      passwordRef.current.value = 'rdqglpqvvhyl';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRequest({
      request: async () => {
        return login({
          phone_number: phoneRef.current?.value || '',
          password: passwordRef.current?.value || '',
        });
      },
      onSuccess: () => {
        navigate('/dashboard')
      },
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
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <Input
                label='Telefon raqam'
                id='phone'
                type='phone'
                placeholder='+998901234567'
                required
                ref={phoneRef}
              />
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <label className='text-xs font-semibold uppercase tracking-wider text-primary/80 ml-1'>
                    Parol
                  </label>
                </div>
                <div className='relative group'>
                  <input
                    id='password'
                    type='password'
                    required
                    ref={passwordRef}
                    className='flex h-12 w-full rounded-xl border border-white/5 bg-surface-light px-3 py-2 text-sm text-white shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/50'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-3 pt-2'>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
