import { Search } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { cn, formatCurrency } from '../../lib/utils';

import type { InventoryItem } from '@/types';

interface InventoryTableProps {
  inventory: InventoryItem[];
}

export const InventoryTable = ({ inventory }: InventoryTableProps) => {
  return (
    <Card>
      <CardContent className='p-0'>
        <div className='p-3 sm:p-4 border-b border-white/5 flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500' />
            <input
              type='text'
              placeholder='Qidirish...'
              className='w-full h-10 pl-10 pr-4 rounded-xl bg-surface-light border border-white/5 focus:border-primary/50 outline-none text-sm text-white'
            />
          </div>
          <select className='h-10 px-4 rounded-xl bg-surface-light border border-white/5 text-sm text-white outline-none w-full sm:w-48'>
            <option value='all'>Barcha Kat.</option>
            <option value='Styling'>Soch Bezatish</option>
            <option value='Beard Care'>Soqol Parvarishi</option>
            <option value='Shaving'>Sartaroshlik</option>
          </select>
        </div>

        {/* Desktop Table View */}
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='text-xs text-gray-500 font-bold uppercase tracking-wider bg-surface-light/30'>
                <th className='p-4 pl-6 text-left'>Mahsulot Nomi</th>
                <th className='p-4 text-left'>Kategoriya</th>
                <th className='p-4 text-left'>Narx</th>
                <th className='p-4 text-left'>Zaxira Darajasi</th>
                <th className='p-4 pr-6 text-right'>Holat</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/5'>
              {inventory.map((item) => {
                const stockPercent = (item.stock / item.maxStock) * 100;
                let stockColor = 'bg-green-500';
                if (stockPercent < 30) stockColor = 'bg-yellow-500';
                if (stockPercent < 15) stockColor = 'bg-red-500';

                return (
                  <tr
                    key={item.id}
                    className='hover:bg-white/[0.02] transition-colors'
                  >
                    <td className='p-4 pl-6 font-medium text-white'>
                      {item.name}
                    </td>
                    <td className='p-4 text-sm text-gray-400'>
                      {item.category}
                    </td>
                    <td className='p-4 text-sm font-bold text-white uppercase'>
                      {formatCurrency(item.price)}
                    </td>
                    <td className='p-4'>
                      <div className='w-full max-w-[200px]'>
                        <div className='flex justify-between text-xs mb-1'>
                          <span className='text-gray-300'>
                            {item.stock} / {item.maxStock}
                          </span>
                          <span
                            className={cn(
                              'font-bold',
                              stockPercent < 15
                                ? 'text-red-500'
                                : 'text-gray-500',
                            )}
                          >
                            {Math.round(stockPercent)}%
                          </span>
                        </div>
                        <div className='h-1.5 w-full bg-surface-light rounded-full overflow-hidden'>
                          <div
                            className={cn(
                              'h-full rounded-full transition-all duration-500',
                              stockColor,
                            )}
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className='p-4 pr-6 text-right'>
                      <Badge
                        variant={
                          item.status === 'In Stock'
                            ? 'success'
                            : item.status === 'Out of Stock'
                              ? 'default'
                              : 'warning'
                        }
                      >
                        {item.status === 'In Stock'
                          ? 'Mavjud'
                          : item.status === 'Out of Stock'
                            ? 'Tugagan'
                            : item.status === 'Critical'
                              ? 'Kritik'
                              : 'Kam'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className='md:hidden divide-y divide-white/5'>
          {inventory.map((item) => {
            const stockPercent = (item.stock / item.maxStock) * 100;
            let stockColor = 'bg-green-500';
            if (stockPercent < 30) stockColor = 'bg-yellow-500';
            if (stockPercent < 15) stockColor = 'bg-red-500';

            return (
              <div
                key={item.id}
                className='p-4 space-y-3 hover:bg-white/[0.01] transition-colors'
              >
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='font-bold text-white text-sm'>
                      {item.name}
                    </h4>
                    <p className='text-[10px] text-gray-500 uppercase font-medium mt-0.5'>
                      {item.category}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.status === 'In Stock'
                        ? 'success'
                        : item.status === 'Out of Stock'
                          ? 'default'
                          : 'warning'
                    }
                    className='text-[9px]'
                  >
                    {item.status}
                  </Badge>
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex justify-between text-[10px] mb-1'>
                      <span className='text-gray-400'>
                        Zaxira: {item.stock}/{item.maxStock}
                      </span>
                      <span
                        className={cn(
                          'font-bold',
                          stockPercent < 15 ? 'text-red-500' : 'text-gray-400',
                        )}
                      >
                        {Math.round(stockPercent)}%
                      </span>
                    </div>
                    <div className='h-1.5 w-full bg-surface-light rounded-full overflow-hidden border border-white/5'>
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          stockColor,
                        )}
                        style={{ width: `${stockPercent}%` }}
                      />
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-[8px] text-gray-500 font-bold uppercase'>
                      Narx
                    </p>
                    <p className='text-sm font-bold text-white uppercase'>
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
