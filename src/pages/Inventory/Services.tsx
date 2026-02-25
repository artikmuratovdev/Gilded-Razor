import { Card, CardContent } from '@/components/ui/Card';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import usePaginatedService from '@/hooks/usePaginatedService';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/Button';
import { useDispatch } from 'react-redux';
import { openModal, setServiceToDelete, setServiceToEdit } from '@/app/slices/modalSlice';
import type { GetClientsRes } from '@/app/api/serviceApi/type';

export const Inventory = () => {
  const [page] = useState<number>(1);
  const [searchQuery] = useState<string>('');
  const {data} = usePaginatedService({page,searchQuery});
  const dispatch = useDispatch();

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

  console.log(data?.data);

  if(!data) return <div className='flex justify-center items-center'>
    <Spinner className="size-10" />
  </div>

  return (
    <div className='space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* Stats Cards */}
      {/* <InventoryStats /> */}

      <Card>
      <CardContent className='p-0'>
        <div className='p-3 sm:p-4 border-b border-white/5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between'>
          <div className='relative flex-1 w-full'>
            <Input
              type='text'
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
        </div>

        {/* Desktop Table View */}
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='text-xs text-gray-500 font-bold uppercase tracking-wider bg-surface-light/30'>
                <th className='p-4 pl-6 text-left'>Xizmat Nomi</th>
                <th className='p-4 text-left'>Ta'rif</th>
                <th className='p-4 text-left'>Narx</th>
                <th className='p-4 text-left'>Vaqti</th>
                <th className='p-4 text-right'>Holat</th>
                <th className='p-4 pr-6 text-right'>Amallar</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/5'>
              {data.data.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className='hover:bg-white/2 transition-colors'
                  >
                    <td className='p-4 pl-6 font-medium text-white'>
                      {item.name}
                    </td>
                    <td className='p-4 text-sm text-gray-400'>
                      {item.description}
                    </td>
                    <td className='p-4 text-sm font-bold text-white uppercase'>
                      {item.price}
                    </td>
                    <td className='p-4'>
                      {item.duration_minutes} minut
                    </td>
                    <td className='p-4 pr-6 text-right'>
                      <Badge
                    variant={
                      item.is_active ? "success" : "warning"
                    }
                  >
                    {item.is_active ? "Faol" : "Faol Emas"}
                  </Badge>
                    </td>
                    <td className='p-4 pr-6 text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-gray-400 hover:text-white'
                          title='Xizmatni Tahrirlash'
                          onClick={() => handleEditService(item)}
                        >
                          <Pencil className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10'
                          title="Xizmatni O'chirish"
                          onClick={() => handleDeleteService(item)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className='md:hidden divide-y divide-white/5'>
          {data.data.map((item) => {
            return (
              <div
                key={item.id}
                className='p-4 space-y-3 hover:bg-white/1 transition-colors'
              >
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='font-bold text-white text-sm'>
                      {item.name}
                    </h4>
                    <p className='text-[10px] text-gray-400 mt-0.5'>
                      {item.description}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.is_active ? 'success' : 'warning'
                    }
                    className='text-[9px]'
                  >
                    {item.is_active ? 'Faol' : 'Faol Emas'}
                  </Badge>
                </div>

                <div className='flex items-center justify-between gap-4'>
                  <div className='flex-1 space-y-1'>
                    <div className='flex justify-between text-[10px]'>
                      <span className='text-gray-400'>Narx:</span>
                      <span className='font-bold text-white'>{item.price}</span>
                    </div>
                    <div className='flex justify-between text-[10px]'>
                      <span className='text-gray-400'>Vaqti:</span>
                      <span className='font-bold text-white'>{item.duration_minutes} minut</span>
                    </div>
                  </div>
                </div>

                <div className='flex gap-2 w-full pt-2 border-t border-white/5'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 h-9 text-xs gap-2'
                    onClick={() => handleEditService(item)}
                  >
                    <Pencil className='h-3.5 w-3.5' /> Tahrirlash
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-10 h-9 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10'
                    onClick={() => handleDeleteService(item)}
                  >
                    <Trash2 className='h-3.5 w-3.5' />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
    </div>
  );
};
