import {
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  GraduationCap,
  LayoutDashboard,
  Package,
  Settings,
  UserCheck,
  Users,
} from 'lucide-react';

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
  { id: 'services', label: 'Xizmatlar', icon: Package, path: '/services' },
  { id: 'reports', label: 'Hisobotlar', icon: BarChart3, path: '/reports' },
  { id: 'academy', label: 'Akademiya', icon: GraduationCap, path: '/academy' },
  { id: 'expenses', label: 'Xarajatlar', icon: CircleDollarSign, path: '/expenses' },
  { id: 'settings', label: 'Sozlamalar', icon: Settings, path: '/settings' },
];

export const setMenuLabel = (page: string) => {
  switch (page) {
    case 'dashboard':
      return {
        title: 'Bosh sahifa',
        description: "Xush kelibsiz, bugun nima bo'layotganini ko'ring.",
      };
    case 'appointments':
      return {
        title: 'Uchrashuvlar',
        description: "Uchrashuvlaringizni ko'ring va boshqaring.",
      };
    case 'staff':
      return {
        title: 'Jamoa',
        description: "Xodimlar bazangizni ko'ring va boshqaring.",
      };
    case 'clients':
      return {
        title: 'Mijozlar',
        description: "Mijozlar bazangizni ko'ring va boshqaring.",
      };
    case 'services':
      return {
        title: 'Xizmatlar',
        description: "Xizmatlarni ko'ring va boshqaring.",
      };
    case 'reports':
      return {
        title: 'Hisobotlar',
        description: "Hisobotlarni ko'ring va boshqaring.",
      };
    case 'academy':
      return {
        title: 'Akademiya',
        description: "Kurslar va darslarni ko'ring va boshqaring.",
      };
    case 'expenses':
      return {
        title: 'Xarajatlar',
        description: "Moliyaviy xarajatlarni ko'ring va boshqaring.",
      };
    case 'settings':
      return {
        title: 'Sozlamalar',
        description: "Sozlamalarni ko'ring va boshqaring.",
      };
  }
};
