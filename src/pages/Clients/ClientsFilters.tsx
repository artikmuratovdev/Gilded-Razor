import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Search } from 'lucide-react';

interface ClientsFiltersProps { 
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'all' | 'true' | 'false';
  setStatusFilter: (status: 'all' | 'true' | 'false') => void;
  recent20DaysOnly: boolean;
  setRecent20DaysOnly: (enabled: boolean) => void;
}

export const ClientsFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  recent20DaysOnly,
  setRecent20DaysOnly,
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
          <div className='h-10 px-3 rounded-xl bg-surface-light border border-white/5 flex items-center justify-between gap-3'>
            <label htmlFor='recent-20-days-switch' className='sm:text-sm text-xs text-gray-300 select-none'>
              Oxirgi 20 kunlik mijozlar
            </label>
            <Switch
              id='recent-20-days-switch'
              checked={recent20DaysOnly}
              onCheckedChange={setRecent20DaysOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
