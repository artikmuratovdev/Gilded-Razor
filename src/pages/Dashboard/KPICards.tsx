import {
  ArrowUp,
  Calendar,
  Clock,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';
import { useGetOverviewQuery } from '@/app/api/dashboardApi';

export const KPICards = () => {
  const {data} = useGetOverviewQuery();
  console.log(data);  
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {/* Total Revenue */}
      <Card>
        <CardContent className='p-5'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                Umumiy Daromad
              </p>
              <h3 className='text-2xl font-bold text-white mt-1'>
                {data ? formatCurrency(data.total_revenue) : ""}
              </h3>
            </div>
            <div className='p-2 bg-primary/10 rounded-lg text-primary shadow-[0_0_10px_rgba(212,175,53,0.1)]'>
              <DollarSign className='h-5 w-5' />
            </div>
          </div>
          <div className='mt-3 flex items-center gap-2'>
            <Badge variant={(data && data.revenue_change_percent > 0 ? 'success' : 'danger')} className='gap-1 h-5 px-1.5 font-medium'>
              {data && data.revenue_change_percent > 0 ? (
                <TrendingUp className='h-3 w-3' /> 
              ) : (
                <TrendingDown className='h-3 w-3' /> 
              )}
              <span>{data?.revenue_change_percent}%</span>
            </Badge>
            <span className='text-xs text-gray-500'>
              o'tgan haftaga nisbatan
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Daily Bookings */}
      <Card>
        <CardContent className='p-5'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                Kunlik Bronlar
              </p>
              <h3 className='text-2xl font-bold text-white mt-1'>{data ? data.daily_bookings : ""}</h3>
            </div>
            <div className='p-2 bg-blue-500/10 rounded-lg text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.1)]'>
              <Calendar className='h-5 w-5' />
            </div>
          </div>
          <div className='mt-3 flex items-center gap-2'>
            <Badge variant='info' className='gap-1 h-5 px-1.5 font-medium'>
              <Clock className='h-3 w-3' />
              <span>{data ? data.daily_pending : ""} Kutilmoqda</span>
            </Badge>
            <span className='text-xs text-gray-500'>tasdiqlash</span>
          </div>
        </CardContent>
      </Card>

      {/* Active Customers */}
      <Card>
        <CardContent className='p-5'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                Faol Mijozlar
              </p>
              <h3 className='text-2xl font-bold text-white mt-1'>{data ? data.active_clients : ""}</h3>
            </div>
            <div className='p-2 bg-purple-500/10 rounded-lg text-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.1)]'>
              <Users className='h-5 w-5' />
            </div>
          </div>
          <div className='mt-3 flex items-center justify-between'>
            <span className='text-xs text-green-500 font-medium flex items-center gap-1'>
              <ArrowUp className='h-3 w-3' />
              <span>bugun {data ? data.new_clients_today : ""} ta</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
