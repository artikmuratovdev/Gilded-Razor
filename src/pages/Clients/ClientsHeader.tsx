import { Button } from '../../components/ui/Button';

export const ClientsHeader = () => {
  return (
    <div className='flex justify-between items-center gap-4'>
      <div>
        <h2 className='text-xl font-bold text-white'>Mijozlarni Boshqarish</h2>
        <p className='text-sm text-gray-400'>
          Mijozlar bazangizni ko'ring va boshqaring.
        </p>
      </div>
      <Button variant='primary' className='gap-2'>
        Ro'yxatni Eksport Qilish
      </Button>
    </div>
  );
};
