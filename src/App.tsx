import { useState } from 'react';
import { MainLayout } from './components/layouts/MainLayout';
import Modals from './components/layouts/Modals';
import { Appointments } from './pages/Appointments/index';
import { Clients } from './pages/Clients/index';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory/index';
import { Reports } from './pages/Reports/index';
import { Settings } from './pages/Settings/index';
import { StaffPage } from './pages/Staff/index';
import { Routes, Route, Navigate } from 'react-router';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState<boolean>(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

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
          onNewBooking={setIsBookingModalOpen}
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
