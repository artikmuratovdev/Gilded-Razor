import { Search } from 'lucide-react';

export const ClientsFilters = () => {
  return (
    <div className='p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500' />
        <input
          type='text'
          placeholder='Mijozni ism, email yoki telefon orqali qidiring...'
          className='w-full h-10 pl-10 pr-4 rounded-xl bg-surface-light border border-white/5 focus:border-primary/50 outline-none text-sm text-white transition-all'
        />
      </div>
      <div className='flex gap-2'>
        <select className='h-10 px-4 rounded-xl bg-surface-light border border-white/5 text-sm text-white outline-none cursor-pointer hover:bg-surface-light/80 transition-colors'>
          <option>Barchasi</option>
          <option>VIP</option>
          <option>Doimiy</option>
          <option>Yangi</option>
        </select>
        <select className='h-10 px-4 rounded-xl bg-surface-light border border-white/5 text-sm text-white outline-none cursor-pointer hover:bg-surface-light/80 transition-colors'>
          <option>Saralash: Oxirgi Tashrif</option>
          <option>Saralash: Jami Xarajat</option>
          <option>Saralash: Ism</option>
        </select>
      </div>
    </div>
  );
};
