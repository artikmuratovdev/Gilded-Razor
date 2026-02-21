import { Star } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

export const StaffStats = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
      <Card className='bg-surface p-4 sm:p-6 flex flex-col justify-center'>
        <p className='text-[10px] sm:text-xs font-semibold text-gray-400 uppercase'>
          Faol Xodimlar
        </p>
        <div className='flex items-center gap-3 mt-1'>
          <h3 className='text-2xl sm:text-3xl font-bold text-white'>12</h3>
          <Badge variant='success' className='text-[10px] px-1.5'>
            +2 ta
          </Badge>
        </div>
      </Card>
      <Card className='bg-surface p-4 sm:p-6 flex flex-col justify-center'>
        <p className='text-[10px] sm:text-xs font-semibold text-gray-400 uppercase'>
          Hozir Mavjud
        </p>
        <div className='flex items-center gap-3 mt-1'>
          <h3 className='text-2xl sm:text-3xl font-bold text-white'>8</h3>
          <div className='flex items-center text-[10px] text-green-500 gap-1'>
            <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse'></span>{' '}
            Onlayn
          </div>
        </div>
      </Card>
      <Card className='bg-surface p-4 sm:p-6 flex flex-col justify-center'>
        <p className='text-[10px] sm:text-xs font-semibold text-gray-400 uppercase'>
          O'rt. Reyting
        </p>
        <div className='flex items-center gap-3 mt-1'>
          <h3 className='text-2xl sm:text-3xl font-bold text-white'>4.9</h3>
          <div className='flex text-primary'>
            <Star className='h-3 w-3 fill-current' />
            <Star className='h-3 w-3 fill-current' />
            <Star className='h-3 w-3 fill-current' />
            <Star className='h-3 w-3 fill-current' />
            <Star className='h-3 w-3 fill-current border-primary' />
          </div>
        </div>
      </Card>
      <Card className='bg-surface p-4 sm:p-6 flex flex-col justify-center'>
        <p className='text-[10px] sm:text-xs font-semibold text-gray-400 uppercase'>
          Samaradorlik
        </p>
        <div className='flex items-center gap-3 mt-1'>
          <h3 className='text-2xl sm:text-3xl font-bold text-white'>92%</h3>
          <Badge variant='info' className='text-[10px] px-1.5'>
            Optimal
          </Badge>
        </div>
      </Card>
    </div>
  );
};
