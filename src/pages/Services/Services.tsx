import { Card, CardContent } from '@/components/ui/Card';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import usePaginatedService from '@/hooks/usePaginatedService';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/Button';
import { useDispatch } from 'react-redux';
import { openModal, setServiceToDelete, setServiceToEdit } from '@/app/slices/modalSlice';
import type { GetClientsRes } from '@/app/api/serviceApi/type';

export const Inventory = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearch] = useState<string>('');
  const {data, nextData, isLoading, isFetching} = usePaginatedService({page, searchQuery});
  const dispatch = useDispatch();

  const serviceList = data?.data ?? [];
  const totalPages = data?.pagination?.total_pages ?? 1;
  const hasNext = !!nextData?.data?.length && page < totalPages;
  const hasPrev = page > 1;

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const handleAddService = () => {
    dispatch(openModal('service'));
  };

  const handleEditService = (service: GetClientsRes['data'][0]) => {
    dispatch(setServiceToEdit({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration_minutes: service.duration_minutes,
      is_active: service.is_active,
    }));
    dispatch(openModal('editService'));
  };

  const handleDeleteService = (service: GetClientsRes['data'][0]) => {
    dispatch(setServiceToDelete({ id: service.id, name: service.name }));
    dispatch(openModal('deleteService'));
  };

  if(isLoading || !data) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner className='h-8 w-8 text-primary' />
      </div>
    );
  }

  return (
    <div className='space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>


        <div className='p-2 border-b border-white/5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between mb-2'>
          <div className='relative flex-1 w-full'>
            <Input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search />}
              placeholder='Qidirish...'
              className='w-full h-10 pl-10 pr-4 rounded-xl bg-surface-light border border-white/5 focus:border-primary/50 outline-none text-sm text-white'
            />
          </div>
          <Button
            variant='default'
            className='gap-2 w-full sm:w-auto'
            onClick={handleAddService}
          >
            <Plus className='h-4 w-4' />
            Xizmat Qo'shish
          </Button>
          {totalPages > 1 && (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!hasPrev || isFetching}
              className='px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors not-disabled:bg-primary hover:bg-primary/90 '
            >
              ← Oldingi
            </button>
            <span className='text-xs text-gray-500'>
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext || isFetching}
              className='px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors not-disabled:bg-primary hover:bg-primary/90 '
            >
              Keyingi →
            </button>
          </div>
        )}
        </div>

        {/* Grid Card View */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2'>
          {serviceList.map((item) => {
            return (
              <Card
                key={item.id}
                className='overflow-hidden group hover:border-primary/50 transition-colors bg-surface/40'
              >
                <CardContent className='p-4 sm:p-6 space-y-4'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <h4 className='font-bold text-white text-sm sm:text-base truncate'>
                        {item.name}
                      </h4>
                      <p className='text-[10px] sm:text-xs text-gray-400 mt-1 line-clamp-2'>
                        {item.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.is_active ? 'success' : 'warning'
                      }
                      className='text-[9px] sm:text-[10px] ml-2 shrink-0'
                    >
                      {item.is_active ? 'Faol' : 'Faol Emas'}
                    </Badge>
                  </div>

                  <div className='space-y-2 border-t border-white/5 pt-4'>
                    <div className='flex justify-between text-xs sm:text-sm'>
                      <span className='text-gray-400'>Narx:</span>
                      <span className='font-bold text-white'>{item.price}</span>
                    </div>
                    <div className='flex justify-between text-xs sm:text-sm'>
                      <span className='text-gray-400'>Vaqti:</span>
                      <span className='font-bold text-white'>{item.duration_minutes} minut</span>
                    </div>
                  </div>

                  <div className='flex gap-2 w-full pt-2 border-t border-white/5'>
                    <Button
                      variant='outline'
                      className='flex-1 h-8 sm:h-9 text-[10px] sm:text-xs gap-2'
                      onClick={() => handleEditService(item)}
                    >
                      <Pencil className='h-3.5 w-3.5' /> Tahrirlash
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-8 h-8 sm:w-10 sm:h-9 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10'
                      onClick={() => handleDeleteService(item)}
                    >
                      <Trash2 className='h-3.5 w-3.5' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
        );
};
