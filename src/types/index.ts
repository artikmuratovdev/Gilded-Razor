export interface Booking {
  id: string;
  clientName: string;
  clientAvatar: string;
  service: string;
  barber: string;
  barberInitials: string;
  date: string;
  time: string;
  status: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  lastVisit: string;
  totalSpend: number;
  visits: number;
  status: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
  todayRevenue: number;
  rating: number;
  currentSessionEnd?: string;
  nextAppointment?: string;
}

export interface Appointment {
  id: number;
  barberId: string;
  client: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  price: number;
  color: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  maxStock: number;
  price: number;
  status: string;
}
