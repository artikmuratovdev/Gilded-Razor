import { API_TAGS } from '@/constants/ApiTags';
import baseApi from '../baseApi/baseApi';
import type {
  AppoitmentReq,
  AppoitmentRes,
  AddAppoitmentReq,
  AddAppoitmentRes,
  GetOneAppoitmentRes,
} from './type';
import type { EditForm } from '@/pages/Appointments/AppointmentModals';

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
        url: '/appointments/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.APPOITMENTS],
    }),
    getOneAppoitment: builder.query<GetOneAppoitmentRes, number>({
      query: (id) => `/appointments/${id}`,
      providesTags: [API_TAGS.APPOITMENTS],
    }),
    updateAppoitment: builder.mutation<AddAppoitmentRes, { id: number; body: EditForm }>({
      query: ({ id, body }) => ({
        url: `/appointments/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.APPOITMENTS],
    }),
    deleteAppoitment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.APPOITMENTS],
    }),
    setStatusAppointment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/appointments/${id}/set_status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.APPOITMENTS],
    })
  }),
});

export const { useGetAppoitmentsQuery, useAddAppoitmentMutation, useGetOneAppoitmentQuery, useUpdateAppoitmentMutation, useDeleteAppoitmentMutation } = appoitmentsApi;
