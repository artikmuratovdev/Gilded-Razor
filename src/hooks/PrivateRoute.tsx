import { useMeQuery } from '@/app/api/authApi';
import { clearTokens, getAccessToken } from '@/app/tokenManager';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {
  const token = getAccessToken();

  // Token yo'q bo'lsa API chaqiruvni o'tkazib yuborish
  const {
    data: userData,
    isLoading: userLoading,
    isError,
  } = useMeQuery(undefined, {
    skip: !token,
  });

  // Yuklanayotganda spinner ko'rsatish
  if (userLoading) {
    return (
      <div className='fixed z-50 top-0 left-0 bg-background flex items-center justify-center w-full h-screen'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  // Token yo'q, xatolik, yoki user ma'lumoti yo'q — login ga yo'naltirish
  if (!token || isError || !userData) {
    clearTokens();
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};
