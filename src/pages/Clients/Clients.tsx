import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { ClientsFilters } from './ClientsFilters';
import { ClientsTable } from './ClientsTable';
import Pagination from '@/components/Pagination';
import usePaginatedClients from '@/hooks/usePaginatedClients';
import { Spinner } from '@/components/ui/spinner';

export const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'true' | 'false'>('all');
  const [recent20DaysOnly, setRecent20DaysOnly] = useState(false);
  const [page,setPage] = useState<number>(1);

  const is_active = statusFilter === 'all' ? undefined : statusFilter === 'true';
  const dateFrom = recent20DaysOnly
    ? new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : undefined;

  const {data, isLoading} = usePaginatedClients({page, searchQuery, is_active, date_from: dateFrom,last_date:recent20DaysOnly});

  if(!data) return;
  if(isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner className='h-8 w-8 text-primary' />
      </div>
    );
  }

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>

      <Card className='py-0'>
        <CardContent className='p-0'>
          <ClientsFilters
            searchQuery={searchQuery}
            setSearchQuery={(q) => { setSearchQuery(q); setPage(1); }}
            statusFilter={statusFilter}
            setStatusFilter={(s) => { setStatusFilter(s); setPage(1); }}
            recent20DaysOnly={recent20DaysOnly}
            setRecent20DaysOnly={(enabled) => { setRecent20DaysOnly(enabled); setPage(1); }}
          />
          <ClientsTable data={data.data} />
          <Pagination
              page={page}
              setPage={setPage}
              prev={data?.pagination?.previous}
              next={data?.pagination?.next}
            />
        </CardContent>
      </Card>
    </div>
  );
};
