import { useGetAllStaffQuery } from '@/app/api/staffApi/staffApi';
import { createPaginatedHook } from './createPaginatedHook';

const usePaginatedStaffs = createPaginatedHook(useGetAllStaffQuery, 8);

export default usePaginatedStaffs;
