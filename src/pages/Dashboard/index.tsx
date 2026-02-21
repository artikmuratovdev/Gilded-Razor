import { KPICards } from './KPICards';
import { RevenueChart } from './RevenueChart';
import { RecentBookingsList } from './RecentBookingsList';

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <KPICards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RevenueChart />
        <RecentBookingsList />
      </div>

      {/* <BookingsTable /> */}
    </div>
  );
};