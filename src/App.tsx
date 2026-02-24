import { Navigate, Route, Routes } from 'react-router';
import { MainLayout } from './components/layouts/MainLayout';
import { PrivateRoute } from './hooks/PrivateRoute';
import { Appointments } from './pages/Appointments/index';
import { Clients } from './pages/Clients/index';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory/index';
import { LoginForm } from './pages/LoginPage';
import { Reports } from './pages/Reports/index';
import { Settings } from './pages/Settings/index';
import { StaffPage } from './pages/Staff/index';

function App() {
  return (
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
        </Route>
        <Route path='/clients' element={<PrivateRoute />}>
          <Route index element={<Clients />} />
        </Route>
        <Route path='/inventory' element={<PrivateRoute />}>
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
  );
}

export default App;
