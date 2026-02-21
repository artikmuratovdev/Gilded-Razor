import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ClientsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const ClientsFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: ClientsFiltersProps) => {
  return (
    <div className='p-3 sm:p-4 border-b border-white/5 flex flex-col md:flex-row gap-3 sm:gap-4'>
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500' />
        <input
          type='text'
          placeholder='Qidirish (ism, tel, email)...'
          className='w-full h-10 pl-10 pr-4 rounded-xl bg-surface-light border border-white/5 focus:border-primary/50 outline-none text-sm text-white transition-all'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='flex flex-row gap-2 w-full md:w-auto'>
        <div className='flex-1 md:w-48'>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-full bg-surface-light border-white/5'>
              <SelectValue placeholder='Filtr' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Mijozlar</SelectLabel>
                <SelectItem value='all'>Barchasi</SelectItem>
                <SelectItem value='vip'>VIP</SelectItem>
                <SelectItem value='regular'>Doimiy</SelectItem>
                <SelectItem value='new'>Yangi</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button variant='default' className='text-xs px-3 sm:px-4'>
          <span className='hidden sm:inline'>Ro'yxatni</span> Eksport
        </Button>
      </div>
    </div>
  );
};
