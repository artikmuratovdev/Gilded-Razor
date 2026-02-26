import { useGetClientsQuery } from '@/app/api/clientsApi/clientsApi';
import { createPaginatedHook } from './createPaginatedHook';

const usePaginatedClients = createPaginatedHook(useGetClientsQuery, 10);

export default usePaginatedClients;
