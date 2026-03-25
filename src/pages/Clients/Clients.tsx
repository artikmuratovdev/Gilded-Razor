import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { ClientsFilters } from './ClientsFilters';
import { ClientsTable } from './ClientsTable';
import Pagination from '@/components/Pagination';
import usePaginatedClients from '@/hooks/usePaginatedClients';
import { Spinner } from '@/components/ui/spinner';
import { useLocation } from 'react-router';

export const Clients = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'true' | 'false'>('all');
  const [page, setPage] = useState<number>(1);

  const isRecentPage = location.pathname === '/clients/recent';

  const is_active = statusFilter === 'all' ? undefined : statusFilter === 'true';

  const { data, isLoading } = usePaginatedClients({
    page,
    searchQuery,
    is_active,
    last_date: isRecentPage ? true : undefined,
  });

  useEffect(() => {
    setPage(1);
  }, [isRecentPage]);

  if (isLoading || !data) {
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
            setSearchQuery={(q) => {
              setSearchQuery(q);
              setPage(1);
            }}
            statusFilter={statusFilter}
            setStatusFilter={(s) => {
              setStatusFilter(s);
              setPage(1);
            }}
          />

          {/* <div className='px-4 pt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl p-1 bg-surface/40 border border-white/5'>
              <button
                type='button'
                onClick={() => navigate('/clients')}
                className={`h-10 rounded-lg text-sm font-semibold transition-colors ${
                  !isRecentPage
                    ? 'bg-[#D4AF35] text-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Barcha mijozlar
              </button>
              <button
                type='button'
                onClick={() => navigate('/clients/recent')}
                className={`h-10 rounded-lg text-sm font-semibold transition-colors ${
                  isRecentPage
                    ? 'bg-[#D4AF35] text-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Oxirgi 20 kunlik mijozlar
              </button>
            </div>
          </div> */}

          <ClientsTable data={data.data} />
          <Pagination
            page={page}
            setPage={setPage}
            prev={data.pagination?.previous ?? null}
            next={data.pagination?.next ?? null}
          />
        </CardContent>
      </Card>
    </div>
  );
};
