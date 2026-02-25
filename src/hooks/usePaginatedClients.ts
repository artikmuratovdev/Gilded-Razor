import { useGetClientsQuery } from '@/app/api/clientsApi/clientsApi';
type PaginatedAppointments = {
  page: number;
  searchQuery: string;
  page_size?: number;
};

const usePaginatedClients = ({
  page,
  searchQuery,
  page_size = 10,
}: PaginatedAppointments) => {
  const { data } = useGetClientsQuery({
    page,
    page_size,
    search: searchQuery,
  });
  const { data: nextData } = useGetClientsQuery({
    page: page + 1,
    page_size,
    search: searchQuery,
  });

  return { data, nextData };
};

export default usePaginatedClients;
