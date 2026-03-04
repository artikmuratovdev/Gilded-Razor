import type { GetClientsReq } from '@/app/api/clientsApi/type';

type QueryResult<TData> = {
  data?: TData;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
};

type QueryHook<TData> = (
  params: GetClientsReq,
  options?: { skip?: boolean },
) => QueryResult<TData>;

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
    datetime_from,
    is_active,
    status,
    ordering,
    last_date
  }: {
    page: number;
    searchQuery?: string;
    page_size?: number;
    date_from?: string;
    datetime_from?: string;
    is_active?:boolean;
    ordering?:string
    status?: "cancelled" | "completed" | "confirmed" | "no_show" | "pending" | string;
    last_date?: "month" | "week" | "all";
  }) {
    const params: GetClientsReq = { page, page_size, search: searchQuery, date_from, datetime_from, status ,is_active,ordering, last_date: last_date === 'all' ? undefined : last_date};
    const nextParams: GetClientsReq = {
      page: page + 1,
      page_size,
      search: searchQuery,
      date_from,
      datetime_from,
      status,
      is_active,
      ordering,
      last_date: last_date === 'all' ? undefined : last_date
    };

    const current = useQueryHook(params);

    // current response ichida pagination.next null bo'lmasa keyingi sahifani fetch qil
    const paginatedData = current.data as { pagination?: { next?: string | null } } | undefined;
    const hasNextPage = Boolean(paginatedData?.pagination?.next);

    const next = useQueryHook(nextParams, { skip: !hasNextPage });

    return {
      data: current.data,
      nextData: next.data,
      isLoading: current.isLoading,
      isFetching: current.isFetching,
      isError: current.isError,
    };
  };
}
