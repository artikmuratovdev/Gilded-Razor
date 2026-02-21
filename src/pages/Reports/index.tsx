import { CalendarDays } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { IncomeExpenseChart } from './IncomeExpenseChart';
import { ReportsMetrics } from './ReportsMetrics';
import { ServiceDistributionChart } from './ServiceDistributionChart';

const monthlyData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
];

const serviceData = [
  { name: 'Soch Olish', value: 400 },
  { name: 'Soqol Olish', value: 300 },
  { name: 'Soqol Kesish', value: 300 },
  { name: 'Mahsulotlar', value: 200 },
];

const COLORS = ['#d4af35', '#3b82f6', '#10b981', '#6b7280'];

export const Reports = () => {
  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold text-white'>
            Tahlil va Hisobotlar
          </h2>
          <p className='text-sm text-gray-400'>
            Biznesingiz samaradorlik ko'rsatkichlarini kuzating.
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' className='gap-2'>
            <CalendarDays className='h-4 w-4' /> Oxirgi 6 Oy
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Income vs Expense Chart */}
        <IncomeExpenseChart data={monthlyData} />

        {/* Service Distribution */}
        <ServiceDistributionChart data={serviceData} colors={COLORS} />
      </div>

      {/* Key Metrics Grid */}
      <ReportsMetrics />
    </div>
  );
};
