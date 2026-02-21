import { BarChart3, CalendarDays, LayoutDashboard, Package, Settings, UserCheck, Users } from "lucide-react";

export const menuItems = [
    {
      id: 'dashboard',
      label: 'Bosh sahifa',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 'appointments',
      label: 'Uchrashuvlar',
      icon: CalendarDays,
      path: '/appointments',
    },
    { id: 'staff', label: 'Jamoa', icon: Users, path: '/staff' },
    { id: 'clients', label: 'Mijozlar', icon: UserCheck, path: '/clients' },
    { id: 'inventory', label: 'Ombor', icon: Package, path: '/inventory' },
    { id: 'reports', label: 'Hisobotlar', icon: BarChart3, path: '/reports' },
    { id: 'settings', label: 'Sozlamalar', icon: Settings, path: '/settings' },
  ];

export const setMenuLabel = (page: string) => {
    switch (page) {
        case 'dashboard':
            return 'Bosh sahifa';
        case 'appointments':
            return 'Uchrashuvlar';
        case 'staff':
            return 'Jamoa';
        case 'clients':
            return 'Mijozlar';
        case 'inventory':
            return 'Ombor';
        case 'reports':
            return 'Hisobotlar';
        case 'settings':
            return 'Sozlamalar';
    }
}