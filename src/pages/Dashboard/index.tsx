import { KPICards } from './KPICards';
import { RevenueChart } from './RevenueChart';
import { RecentBookingsList } from './RecentBookingsList';
import { useLoginMutation } from '@/app/api/authApi';

export const Dashboard = () => {
  const [login] = useLoginMutation();

  const handleLogin = async () => {
    const response = await login({
      phone_number: '+998901234567',
      password: 'rdqglpqvvhyl',
    }).unwrap();
    if (response.success) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      console.log(response);
    }
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={handleLogin}>Login</button>
      <KPICards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RevenueChart />
        <RecentBookingsList />
      </div>
    </div>
  );
};