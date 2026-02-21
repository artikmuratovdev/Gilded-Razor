import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';

export const ReportsMetrics = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <Card className='p-6 bg-surface'>
        <h3 className='text-sm font-medium text-gray-400 mb-2'>
          Customer Retention Rate
        </h3>
        <p className='text-3xl font-bold text-white'>84%</p>
        <div className='w-full bg-white/5 rounded-full h-2 mt-4'>
          <div
            className='bg-green-500 h-2 rounded-full'
            style={{ width: '84%' }}
          ></div>
        </div>
      </Card>
      <Card className='p-6 bg-surface'>
        <p className='text-xs font-bold uppercase text-gray-400'>
          O'rtacha Tranzaksiya Qiymati
        </p>
        <p className='text-3xl font-bold text-white'>{formatCurrency(42.5)}</p>
        <p className='text-xs text-green-500 mt-2 flex items-center gap-1'>
          ↑ 2.4% from last month
        </p>
      </Card>
      <Card className='p-6 bg-surface'>
        <h3 className='text-sm font-medium text-gray-400 mb-2'>
          Kelmaganlar Darajasi
        </h3>
        <p className='text-3xl font-bold text-white'>3.2%</p>
        <p className='text-xs text-green-500 mt-2 flex items-center gap-1'>
          ↓ 0.5% improvement
        </p>
      </Card>
    </div>
  );
};
