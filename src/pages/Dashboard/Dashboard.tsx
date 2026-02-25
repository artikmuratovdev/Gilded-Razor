import { KPICards } from './KPICards';
import { RevenueChart } from './RevenueChart';
import { RecentBookingsList } from './RecentBookingsList';
import { useGetClientsQuery } from '@/app/api/clientsApi/clientsApi';
import { useGetServiceQuery } from '@/app/api/serviceApi/serviceApi';

export const Dashboard = () => {
  // Fetch data when Dashboard is visible - for Booking Modal dropdowns
  useGetClientsQuery({ page: 1, page_size: 1000 });
  useGetServiceQuery({ page: 1, page_size: 1000 });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <KPICards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RevenueChart />
        <RecentBookingsList />
      </div>
    </div>
  );
};