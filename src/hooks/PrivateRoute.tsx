import { useMeQuery } from '@/app/api/authApi';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logout } from '@/app/slices/authSlice';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const {
    data: userData,
    isLoading: userLoading,
    isFetching,
    isUninitialized,
    isError,
  } = useMeQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  // useMeQuery xato berganda isAuthenticated ni tozalash
  // Bu login sahifasiga redirect bo'lganda loop bo'lmasligini ta'minlaydi
  useEffect(() => {
    if (isAuthenticated && !isFetching && !isUninitialized && (isError || !userData)) {
      dispatch(logout());
    }
  }, [isAuthenticated, isError, userData, isFetching, isUninitialized, dispatch]);

  // 1. Autentifikatsiya holati yo'q — darhol login ga yo'naltir
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // 2. Token bor lekin query hali ishlamagan, yuklanmoqda, yoki refetch bo'lyapti — spinner
  if (isUninitialized || userLoading || isFetching) {
    return (
      <div className='fixed z-50 top-0 left-0 bg-background flex items-center justify-center w-full h-screen'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  // 3. Query tugadi lekin xatolik yoki user ma'lumoti yo'q — spinner ko'rsat
  // useEffect yuqorida logout() dispatch qiladi, keyin !isAuthenticated tekshiruvi redirect qiladi
  if (isError || !userData) {
    return (
      <div className='fixed z-50 top-0 left-0 bg-background flex items-center justify-center w-full h-screen'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  return <Outlet />;
};
