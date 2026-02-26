import type { Summary } from '@/app/api/reportApi/type';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';

interface ReportsMetricsProps {
  summary?: Summary;
}

export const ReportsMetrics = ({ summary }: ReportsMetricsProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <Card className='p-6 bg-surface'>
        <h3 className='text-sm font-medium text-gray-400 mb-2'>
          Mijozlarni Saqlash Darajasi (Retention)
        </h3>
        <p className='text-3xl font-bold text-white'>
          {summary?.customer_retention_rate || 0}%
        </p>
        <div className='w-full bg-white/5 rounded-full h-2 mt-4'>
          <div
            className='bg-green-500 h-2 rounded-full'
            style={{ width: `${summary?.customer_retention_rate || 0}%` }}
          ></div>
        </div>
      </Card>
      <Card className='p-6 bg-surface'>
        <p className='text-xs font-bold uppercase text-gray-400'>
          O'rtacha Tranzaksiya Qiymati
        </p>
        <p className='text-3xl font-bold text-white'>
          {formatCurrency(summary?.average_transaction || 0)}
        </p>
        <p className='text-xs text-green-500 mt-2 flex items-center gap-1'>
          Ma'lumotlar tanlangan davr uchun
        </p>
      </Card>
      <Card className='p-6 bg-surface'>
        <h3 className='text-sm font-medium text-gray-400 mb-2'>
          Kelmaganlar Darajasi (No-Show)
        </h3>
        <p className='text-3xl font-bold text-white'>
          {summary?.no_show_rate || 0}%
        </p>
        <p className='text-xs text-green-500 mt-2 flex items-center gap-1'>
          Jami bandlovlar: {summary?.total_appointments || 0}
        </p>
      </Card>
    </div>
  );
};
