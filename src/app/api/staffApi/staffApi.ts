import { API_TAGS } from '@/constants/ApiTags';
import baseApi from '../baseApi/baseApi';
import type { MutationRes } from '../clientsApi/type';
import type { CreateStaffReq, GetStaffByIdRes, GetStaffReq, GetStaffRes } from './type';

const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStaff: builder.query<GetStaffRes, GetStaffReq>({
      query: (params) => ({ url: '/staff/', params }),
      providesTags: [API_TAGS.STAFFS],
    }),
    getStaffById: builder.query<GetStaffByIdRes, string>({
      query: (id) => `/staff/${id}`,
      providesTags: [API_TAGS.STAFFS],
    }),
    createStaff: builder.mutation<MutationRes, CreateStaffReq>({
      query: (body) => ({
        url: '/staff/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.STAFFS],
    }),
    deleteStaff: builder.mutation<MutationRes, string>({
      query: (id) => ({
        url: `/staff/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.STAFFS],
    }),
    updateStaff: builder.mutation<MutationRes,{ id: string; body: Partial<CreateStaffReq> }>({
      query: ({ id, body }) => ({
        url: `/staff/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.STAFFS],
    }),
  }),
});

export const {
  useGetAllStaffQuery,
  useGetStaffByIdQuery,
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useUpdateStaffMutation,
} = staffApi;
