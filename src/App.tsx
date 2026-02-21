import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router';
import { MainLayout } from './components/layouts/MainLayout';
import Modals from './components/layouts/Modals';
import { Appointments } from './pages/Appointments/index';
import { Clients } from './pages/Clients/index';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory/index';
import { Reports } from './pages/Reports/index';
import { Settings } from './pages/Settings/index';
import { StaffPage } from './pages/Staff/index';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState<boolean>(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  // URL parametrlarini kuzatish
  useEffect(() => {
    if (searchParams.get('booking') === 'new') {
      setIsBookingModalOpen(true);
    }
    if (searchParams.get('staff') === 'new') {
      setIsStaffModalOpen(true);
    }
    if (searchParams.get('client') === 'new') {
      setIsClientModalOpen(true);
    }
    if (searchParams.get('product') === 'new') {
      setIsProductModalOpen(true);
    }
  }, [searchParams]);

  const clearParams = (keys: string[]) => {
    const params = new URLSearchParams(searchParams);
    keys.forEach((key) => params.delete(key));
    setSearchParams(params);
  };

  const handleCloseBooking = (open: boolean) => {
    setIsBookingModalOpen(open);
    if (!open) clearParams(['booking', 'date', 'time', 'barberId']);
  };

  const handleCloseStaff = (open: boolean) => {
    setIsStaffModalOpen(open);
    if (!open) clearParams(['staff']);
  };

  const handleCloseClient = (open: boolean) => {
    setIsClientModalOpen(open);
    if (!open) clearParams(['client']);
  };

  const handleCloseProduct = (open: boolean) => {
    setIsProductModalOpen(open);
    if (!open) clearParams(['product']);
  };

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  return (
    <>
      <MainLayout
        onNewBooking={() => setParam('booking', 'new')}
        onNewStaff={() => setParam('staff', 'new')}
        onNewClient={() => setParam('client', 'new')}
        onNewProduct={() => setParam('product', 'new')}
      >
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/staff' element={<StaffPage />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Routes>

        <Modals
          onNewBooking={handleCloseBooking as any}
          onNewStaff={handleCloseStaff as any}
          onNewClient={handleCloseClient as any}
          onNewProduct={handleCloseProduct as any}
          onNewPayment={setIsPaymentModalOpen}
          newBooking={isBookingModalOpen}
          newStaff={isStaffModalOpen}
          newClient={isClientModalOpen}
          newProduct={isProductModalOpen}
          newPayment={isPaymentModalOpen}
        />
      </MainLayout>
    </>
  );
}

export default App;
