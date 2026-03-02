import { Navigate, Route, Routes } from 'react-router';
import { MainLayout } from './components/layouts/MainLayout';
import { PrivateRoute } from './hooks/PrivateRoute';
import { Appointments } from './pages/Appointments/Appointments';
import { Clients } from './pages/Clients/Clients';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Inventory } from './pages/Inventory/Services';
import { LoginForm } from './pages/LoginPage/LoginPage';
import { Reports } from './pages/Reports/Reports';
import { Settings } from './pages/Settings/index';
import { StaffPage } from './pages/Staff/Staff';
import { StaffProfile } from './pages/Staff/StaffProfile';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' replace />} />
      <Route path='/login' element={<LoginForm />} />
      <Route element={<MainLayout />}>
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='/appointments' element={<PrivateRoute />}>
          <Route index element={<Appointments />} />
        </Route>
        <Route path='/staff' element={<PrivateRoute />}>
          <Route index element={<StaffPage />} />
          <Route path=':id' element={<StaffProfile />} />
        </Route>
        <Route path='/clients' element={<PrivateRoute />}>
          <Route index element={<Clients />} />
        </Route>
        <Route path='/services' element={<PrivateRoute />}>
          <Route index element={<Inventory />} />
        </Route>
        <Route path='/reports' element={<PrivateRoute />}>
          <Route index element={<Reports />} />
        </Route>
        <Route path='/settings' element={<PrivateRoute />}>
          <Route index element={<Settings />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
    </>
  );
}

export default App;
