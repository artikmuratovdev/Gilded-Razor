import { useGetAppoitmentsQuery } from '@/app/api/appoitmentsApi';
type PaginatedAppointments = {
  page: number;
  searchQuery: string;
  page_size?: number;
};

const usePaginatedAppointments = ({
  page,
  searchQuery,
  page_size = 10,
}: PaginatedAppointments) => {
  const { data } = useGetAppoitmentsQuery({
    page,
    page_size,
    search: searchQuery,
  });
  const { data: nextData } = useGetAppoitmentsQuery({
    page: page + 1,
    page_size,
    search: searchQuery,
  });

  return { data, nextData };
};

export default usePaginatedAppointments;
