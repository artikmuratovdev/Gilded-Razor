import { API_TAGS } from '@/constants/ApiTags';
import baseApi from '../baseApi/baseApi';
import type { Chart, Overview } from './type';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<{data:Overview}, void>({
      query: () => '/dashboard/overview',
      providesTags: [API_TAGS.APPOITMENTS,API_TAGS.CLIENTS,API_TAGS.SERVICES,API_TAGS.STAFFS],
    }),
    getChart: builder.query<Chart[], 'weekly' | 'monthly'>({
      query: (period: string) => ({
        url: '/dashboard/revenue-chart',
        method: 'GET',
        params: { period },
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        if (Array.isArray(response)) return response;
        return response?.data ?? response?.results ?? [];
      },
      providesTags: [API_TAGS.APPOITMENTS,API_TAGS.CLIENTS,API_TAGS.SERVICES,API_TAGS.STAFFS],
    }),
  }),
});

export const { useGetOverviewQuery, useGetChartQuery } = dashboardApi;
