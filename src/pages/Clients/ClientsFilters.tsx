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
  statusFilter: 'all' | 'true' | 'false';
  setStatusFilter: (status: 'all' | 'true' | 'false') => void;
  lastDateFilter: 'all' | 'month' | 'week';
  setLastDateFilter: (date: 'all' | 'month' | 'week') => void;
}

export const ClientsFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  lastDateFilter,
  setLastDateFilter,
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
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as 'all' | 'true' | 'false')}>
            <SelectTrigger className='w-full bg-surface-light border-white/5'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Mijozlar</SelectLabel>
                <SelectItem value='all'>Barchasi</SelectItem>
                <SelectItem value='true'>Faol</SelectItem>
                <SelectItem value='false'>Nofaol</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex-1 md:w-48'>
          <Select value={lastDateFilter} onValueChange={(v) => setLastDateFilter(v as 'all' | 'month' | 'week')}>
            <SelectTrigger className='w-full bg-surface-light border-white/5'>
              <SelectValue placeholder='Sana' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sana</SelectLabel>
                <SelectItem value='all'>Barchasi</SelectItem>
                <SelectItem value='month'>Shu oy</SelectItem>
                <SelectItem value='week'>Shu hafta</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
