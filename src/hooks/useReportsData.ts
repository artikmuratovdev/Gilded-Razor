import {
  useGetRevenueByServiceQuery,
  useGetRevenueExpensesQuery,
  useGetSummaryQuery,
} from '@/app/api/reportApi/reportApi';
import type { ReportsReq } from '@/app/api/reportApi/type';

export const useReportsData = (period: ReportsReq['period']) => {
  // Fetch data for selected period only
  const summary = useGetSummaryQuery({ period } as ReportsReq);
  const expenses = useGetRevenueExpensesQuery({ period } as ReportsReq);
  const services = useGetRevenueByServiceQuery({ period } as ReportsReq);

  const isLoading = summary.isLoading || expenses.isLoading || services.isLoading;
  const isError = summary.isError || expenses.isError || services.isError;

  return {
    data: {
      summary: summary.data?.data,
      expenses: expenses.data?.data,
      services: services.data?.data,
    },
    isLoading,
    isError,
  };
};
