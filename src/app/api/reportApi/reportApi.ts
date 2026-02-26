import { API_TAGS } from '@/constants/ApiTags';
import baseApi from '../baseApi/baseApi';
import type{
  AllReports,
  CustomerRetention,
  NoShowRate,
  ReportsReq,
  ReportsRes,
  RevenueByService,
  RevenueExpenses,
  Summary,
} from './type';

const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAverageTransaction: build.query<AllReports<ReportsRes>, ReportsReq>({
      query: (params) => ({
        url: '/reports/average-transaction/',
        params,
      }),
      providesTags: [API_TAGS.REPORTS],
    }),
    getCustomerRetention: build.query<AllReports<CustomerRetention>, ReportsReq>({
      query: (params) => ({
        url: '/reports/customer-retention/',
        params,
      }),
      providesTags: [API_TAGS.REPORTS],
    }),
    getNoShowRate: build.query<AllReports<NoShowRate>, ReportsReq>({
      query: (params) => ({
        url: '/reports/no-show-rate/',
        params,
      }),
      providesTags: [API_TAGS.REPORTS],
    }),
    getRevenueByService: build.query<AllReports<RevenueByService>, ReportsReq>({
      query: (params) => ({
        url: '/reports/revenue-by-service/',
        params,
      }),
      providesTags: [API_TAGS.REPORTS],
    }),
    getRevenueExpenses: build.query<AllReports<RevenueExpenses>, ReportsReq>({
      query: (params) => ({
        url: '/reports/revenue-expenses/',
        params,
      }),
      providesTags: [API_TAGS.REPORTS],
    }),
    getSummary: build.query<AllReports<Summary>, ReportsReq>({
      query: (params) => ({
        url: '/reports/summary/',
        params,
      }),
      providesTags: [API_TAGS.REPORTS],
    }),
  }),
});

export const {
  useGetAverageTransactionQuery,
  useGetCustomerRetentionQuery,
  useGetNoShowRateQuery,
  useGetRevenueByServiceQuery,
  useGetRevenueExpensesQuery,
  useGetSummaryQuery,
} = reportsApi;
