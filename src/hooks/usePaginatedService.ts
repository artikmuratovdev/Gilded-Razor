import { useGetServiceQuery } from '@/app/api/serviceApi/serviceApi';
type PaginatedAppointments = {
  page: number;
  searchQuery?: string;
  page_size?: number;
};

const usePaginatedService = ({
  page,
  searchQuery,
  page_size = 10,
}: PaginatedAppointments) => {
  const { data } = useGetServiceQuery({
    page,
    page_size,
    search: searchQuery,
  });
  const { data: nextData } = useGetServiceQuery({
    page: page + 1,
    page_size,
    search: searchQuery,
  });

  return { data, nextData };
};

export default usePaginatedService;
