import { API_TAGS } from '@/constants/ApiTags';
import baseApi from '../baseApi';
import type {
  AppoitmentReq,
  AppoitmentRes,
  AddAppoitmentReq,
  AddAppoitmentRes,
  GetOneAppoitmentRes,
} from './type';

export const appoitmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppoitments: builder.query<AppoitmentRes, AppoitmentReq>({
      query: ({ ordering, search, page, page_size }) => ({
        url: '/appointments/',
        params: { ordering, search, page, page_size },
      }),
      providesTags: [API_TAGS.APPOITMENTS],
    }),
    addAppoitment: builder.mutation<AddAppoitmentRes, AddAppoitmentReq>({
      query: (body) => ({
        url: '/appoitments',
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.APPOITMENTS],
    }),
    getOneAppoitment: builder.query<GetOneAppoitmentRes, number>({
      query: (id) => `/appoitments/${id}`,
      providesTags: [API_TAGS.APPOITMENTS],
    }),
    updateAppoitment: builder.mutation<AddAppoitmentRes, { id: number; body: AddAppoitmentReq }>({
      query: ({ id, body }) => ({
        url: `/appoitments/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [API_TAGS.APPOITMENTS],
    }),
    deleteAppoitment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/appoitments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.APPOITMENTS],
    }),
  }),
});

export const { useGetAppoitmentsQuery, useAddAppoitmentMutation, useGetOneAppoitmentQuery, useUpdateAppoitmentMutation, useDeleteAppoitmentMutation } = appoitmentsApi;
