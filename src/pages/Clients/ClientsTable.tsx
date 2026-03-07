import {
  Pencil,
  Phone,
  Trash2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { GetClientsRes } from '@/app/api/clientsApi/type';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { useDispatch } from 'react-redux';
import { openModal, setClientToDelete, setClientToEdit } from '@/app/slices/modalSlice';

interface ClientsTableProps {
  data: GetClientsRes['data'];
}

export const ClientsTable = ({ data }: ClientsTableProps) => {
  const dispatch = useDispatch();

  const handleDeleteClick = (client: GetClientsRes['data'][0]) => {
    dispatch(setClientToDelete({ id: client.id, name: client.full_name }));
    dispatch(openModal('deleteClient'));
  };

  const handleEditClick = (client: GetClientsRes['data'][0]) => {
    dispatch(setClientToEdit({
      id: client.id,
      first_name: client.first_name,
      last_name: client.last_name,
      email: '', // API doesn't return email in the list, will need to fetch or leave empty
      phone: client.phone,
    }));
    dispatch(openModal('editClient'));
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className='hidden lg:block overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='text-xs text-gray-500 font-bold uppercase tracking-wider bg-surface-light/30'>
              <th className='p-4 pl-6'>Mijoz Profili</th>
              <th className='p-4'>Aloqa Ma'lumoti</th>  
              <th className='p-4'>Holat</th>
              <th className='p-4 pr-6 text-right'>Amallar</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-white/5'>
            {data.map((client) => (
              <tr
                key={client.id}
                className='group hover:bg-white/2 transition-colors'
              >
                <td className='p-4 pl-6'>
                      <p className='font-bold text-white text-sm'>
                        {client.full_name}
                      </p>
                </td>
                <td className='p-4'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                      <Phone className='w-3 h-3' /> {client.phone}
                    </div>
                  </div>
                </td> 
                <td className='p-4'>
                  <Badge
                    variant={
                      client.is_active ? "success" : "warning"
                    }
                  >
                    {client.is_active ? "Faol" : "Faol Emas"}
                  </Badge>
                </td>
                <td className='p-4 pr-6 text-right'>
                  <div className='flex justify-end gap-2'>
                      {/* <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10'
                        title='Xabar Yuborish'
                      >
                        <MessageSquare className='h-4 w-4' />
                      </Button> */}
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-gray-400 hover:text-white'
                      title='Profilni Tahrirlash'
                      onClick={() => handleEditClick(client)}
                    >
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10'
                      title="Mijozni O'chirish"
                      onClick={() => handleDeleteClick(client)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className='lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
        {data.length > 0 ? (
          data.map((client) => (
            <Card
              key={client.id}
              className='overflow-hidden group hover:border-primary/50 transition-colors bg-surface/40 border-white/5'
            >
              <CardContent className='p-4 space-y-4'>
                <div className='flex justify-between items-start'>
                    <h4 className='font-bold text-white'>{client.full_name}</h4>
                  <Badge
                      variant={
                        client.is_active ? "success" : "warning"
                      }
                    >
                      {client.is_active ? "Faol" : "Faol Emas"}
                    </Badge>
                </div>

                <div className='grid grid-cols-2 gap-4 bg-white/2 p-3 rounded-xl border border-white/5'>
                    <p className='text-[8px] text-gray-500 font-bold uppercase'>
                      Aloqa
                    </p>
                    <p className='text-[10px] text-gray-300'>{client.phone}</p>
                </div>

                <div className='flex gap-2 w-full'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 h-9 text-xs gap-2'
                    onClick={() => handleEditClick(client)}
                  >
                    <Pencil className='h-3.5 w-3.5' /> Tahrirlash
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-10 h-9 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10'
                    onClick={() => handleDeleteClick(client)}
                  >
                    <Trash2 className='h-3.5 w-3.5' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className='col-span-full p-10 text-center text-gray-500 italic'>
            Mijozlar topilmadi
          </div>
        )}
      </div>
    </>
  );
};
