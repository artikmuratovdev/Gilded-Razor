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
  }, [searchParams]);

  const handleCloseBooking = (
    value: boolean | ((prev: boolean) => boolean),
  ) => {
    const nextValue =
      typeof value === 'function' ? (value as any)(isBookingModalOpen) : value;
    setIsBookingModalOpen(nextValue);

    if (!nextValue) {
      // Modal yopilganda URL parametrlarini tozalash
      const params = new URLSearchParams(searchParams);
      params.delete('booking');
      params.delete('date');
      params.delete('time');
      params.delete('barberId');
      setSearchParams(params);
    }
  };

  return (
    <>
      <MainLayout
        onNewBooking={() => setIsBookingModalOpen(true)}
        onNewStaff={() => setIsStaffModalOpen(true)}
        onNewClient={() => setIsClientModalOpen(true)}
        onNewProduct={() => setIsProductModalOpen(true)}
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
          onNewStaff={setIsStaffModalOpen}
          onNewClient={setIsClientModalOpen}
          onNewProduct={setIsProductModalOpen}
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
