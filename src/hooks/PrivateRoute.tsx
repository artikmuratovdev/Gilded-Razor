import { useMeQuery } from '@/app/api/authApi';
import { useAppSelector } from '@/app/hooks';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  // Redux state'da authenticated bo'lsa /me query'ni ishga tushir
  const {
    data: userData,
    isLoading: userLoading,
    isUninitialized,
    isError,
  } = useMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Autentifikatsiya holati yo'q — darhol login ga yo'naltir
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // Token bor lekin query hali ishlamagan yoki yuklanmoqda — spinner ko'rsat
  if (isUninitialized || userLoading) {
    return (
      <div className='fixed z-50 top-0 left-0 bg-background flex items-center justify-center w-full h-screen'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  // Query ishladi lekin xatolik bo'ldi yoki user ma'lumoti yo'q
  if (isError || !userData) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

