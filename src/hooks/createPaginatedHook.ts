import type { GetClientsReq } from '@/app/api/clientsApi/type';

type QueryResult<TData> = {
  data?: TData;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
};

type QueryHook<TData> = (params: GetClientsReq) => QueryResult<TData>;

/**
 * createPaginatedHook — umumiy paginated hook factory.
 *
 * Berilgan RTK Query hook ni ishlatib, joriy va keyingi sahifalarni
 * bir vaqtda fetch qiladi (prefetch pattern).
 *
 * @param useQueryHook — RTK Query `useXxxQuery` hook
 * @param defaultPageSize — sahifadagi element soni (default: 10)
 */
export function createPaginatedHook<TData>(
  useQueryHook: QueryHook<TData>,
  defaultPageSize = 10,
) {
  return function usePaginatedHook({
    page,
    searchQuery,
    page_size = defaultPageSize,
    date_from,
    datetime_from
  }: {
    page: number;
    searchQuery?: string;
    page_size?: number;
    date_from?: string;
    datetime_from?: string;
  }) {
    const params: GetClientsReq = { page, page_size, search: searchQuery ,date_from,datetime_from};
    const nextParams: GetClientsReq = {
      page: page + 1,
      page_size,
      search: searchQuery,
      date_from,
      datetime_from
    };

    const current = useQueryHook(params);
    const next = useQueryHook(nextParams);

    return {
      data: current.data,
      nextData: next.data,
      isLoading: current.isLoading,
      isFetching: current.isFetching,
      isError: current.isError,
    };
  };
}
