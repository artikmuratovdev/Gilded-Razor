
import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { ClientsFilters } from './ClientsFilters';
import { ClientsTable } from './ClientsTable';
import Pagination from '@/components/Pagination';
import usePaginatedClients from '@/hooks/usePaginatedClients';
import { Spinner } from '@/components/ui/spinner';

export const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page,setPage] = useState<number>(1);

  const {data} = usePaginatedClients({page,searchQuery});

  if(!data) return <div className='flex justify-center items-center'>
    <Spinner className="size-10" />
  </div>

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>

      <Card>
        <CardContent className='p-0'>
          <ClientsFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <ClientsTable data={data.data} />
          <Pagination
              page={page}
              setPage={setPage}
              prev={!!data?.pagination?.previous}
              next={!!data?.pagination?.next}
            />
        </CardContent>
      </Card>
    </div>
  );
};
