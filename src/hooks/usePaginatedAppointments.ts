import { useGetAppoitmentsQuery } from '@/app/api/appoitmentsApi/appoitmentsApi';
import { createPaginatedHook } from './createPaginatedHook';

const usePaginatedAppointments = createPaginatedHook(
  useGetAppoitmentsQuery,
  10,
);

export default usePaginatedAppointments;
