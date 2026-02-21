import { AlertCircle, ArrowDownUp, PackageCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';

export const InventoryStats = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
      <Card className='bg-surface/50 p-4 border-white/5'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-green-500/10 rounded-lg text-green-500'>
            <PackageCheck className='h-5 w-5' />
          </div>
          <div>
            <p className='text-xs text-gray-400 uppercase font-bold'>
              Jami Mahsulotlar
            </p>
            <p className='text-xl font-bold text-white'>482</p>
          </div>
        </div>
      </Card>
      <Card className='bg-surface/50 p-4 border-white/5'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-red-500/10 rounded-lg text-red-500'>
            <AlertCircle className='h-5 w-5' />
          </div>
          <div>
            <p className='text-xs text-gray-400 uppercase font-bold'>
              Kam Zaxira Ogohlantirishlari
            </p>
            <p className='text-xl font-bold text-white'>5 Items</p>
          </div>
        </div>
      </Card>
      <Card className='bg-surface/50 p-4 border-white/5'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary/10 rounded-lg text-primary'>
            <ArrowDownUp className='h-5 w-5' />
          </div>
          <div>
            <p className='text-xs text-gray-400 uppercase font-bold'>
              Jami Qiymat
            </p>
            <p className='text-xl font-bold text-white'>
              {formatCurrency(12405)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
