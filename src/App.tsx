import { Navigate, Route, Routes } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { PrivateRoute } from "./hooks/PrivateRoute";
import { Appointments } from "./pages/Appointments/Appointments";
import { Academy } from "./pages/Academy/Academy";
import { Clients } from "./pages/Clients/Clients";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import DokonExpenses from "./pages/Expenses/DokonExpenses";
import QoshimchaExpenses from "./pages/Expenses/AdditionalExpenses";
import { Inventory } from "./pages/Services/Services";
import { LoginForm } from "./pages/LoginPage/LoginPage";
import { Reports } from "./pages/Reports/Reports";
import { Settings } from "./pages/Settings/index";
import { StaffPage } from "./pages/Staff/Staff";
import { StaffProfile } from "./pages/Staff/StaffProfile";
import Kids from "./pages/Staff/Kids";
import Masters from "./pages/Staff/Masters";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/appointments" element={<PrivateRoute />}>
            <Route index element={<Appointments />} />
          </Route>
          <Route path="/staff" element={<PrivateRoute />}>
            <Route index element={<StaffPage />} />
            <Route path=":id" element={<StaffProfile />} />
            <Route path="kids" element={<Kids />} />
            <Route path="masters" element={<Masters />} />
          </Route>
          <Route path="/clients" element={<PrivateRoute />}>
            <Route index element={<Clients />} />
            <Route path="recent" element={<Clients />} />
          </Route>
          <Route path="/services" element={<PrivateRoute />}>
            <Route index element={<Inventory />} />
          </Route>
          <Route path="/reports" element={<PrivateRoute />}>
            <Route index element={<Reports />} />
          </Route>
          <Route path="/academy" element={<PrivateRoute />}>
            <Route index element={<Academy />} />
          </Route>
          <Route path="/expenses" element={<PrivateRoute />}>
            <Route index element={<DokonExpenses />} />
          </Route>
          <Route path="/additional-expenses" element={<PrivateRoute />}>
            <Route index element={<QoshimchaExpenses />} />
          </Route>
          <Route path="/settings" element={<PrivateRoute />}>
            <Route index element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
