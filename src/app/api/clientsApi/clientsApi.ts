import baseApi from '../baseApi/baseApi';
import type { CreateClientReq, GetClientsReq, GetClientsRes, MutationRes } from './type';
import { API_TAGS } from '@/constants/ApiTags';

const clientsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createClient: build.mutation<MutationRes, CreateClientReq>({
      query: (body) => ({
        url: '/clients/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.CLIENTS],
    }),
    getClients: build.query<GetClientsRes, GetClientsReq>({
      query: (params) => ({ url: '/clients/', params }),
      providesTags: [API_TAGS.CLIENTS],
    }),
    deleteClient : build.mutation<MutationRes, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.CLIENTS],
    }),
    updateClient : build.mutation<MutationRes, { id: string, body: Partial<CreateClientReq> }>({
      query: ({ id, body }) => ({
        url: `/clients/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [API_TAGS.CLIENTS],
    })
  }),
});

export const { useCreateClientMutation, useGetClientsQuery , useDeleteClientMutation, useUpdateClientMutation} = clientsApi;
