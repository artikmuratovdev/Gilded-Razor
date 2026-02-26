import { useGetServiceQuery } from '@/app/api/serviceApi/serviceApi';
import { createPaginatedHook } from './createPaginatedHook';

const usePaginatedService = createPaginatedHook(useGetServiceQuery, 10);

export default usePaginatedService;
