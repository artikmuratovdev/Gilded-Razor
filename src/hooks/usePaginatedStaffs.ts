import { useGetAllStaffQuery } from '@/app/api/staffApi/staffApi';
import type { StaffSpecialization } from '@/app/api/staffApi/type';

const usePaginatedStaffs = ({
	page,
	searchQuery,
	page_size = 8,
	ordering,
	specialization,
}: {
	page: number;
	searchQuery?: string;
	page_size?: number;
	ordering?: string;
	specialization?: StaffSpecialization;
}) => {
	const params = {
		page,
		page_size,
		search: searchQuery,
		ordering,
		specialization,
	};

	const current = useGetAllStaffQuery(params);
	const paginatedData = current.data as { pagination?: { next?: string | null } } | undefined;
	const hasNextPage = Boolean(paginatedData?.pagination?.next);

	const next = useGetAllStaffQuery({ ...params, page: page + 1 }, { skip: !hasNextPage });

	return {
		data: current.data,
		nextData: next.data,
		isLoading: current.isLoading,
		isFetching: current.isFetching,
		isError: current.isError,
	};
};

export default usePaginatedStaffs;
