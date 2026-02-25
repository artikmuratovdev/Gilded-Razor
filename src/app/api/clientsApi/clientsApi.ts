import baseApi from '../baseApi/baseApi';
import type { CreateClientReq, GetClientsReq, GetClientsRes, MutationRes } from './type';

const clientsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createClient: build.mutation<MutationRes, CreateClientReq>({
      query: (body) => ({
        url: '/clients/',
        method: 'POST',
        body,
      }),
    }),
    getClients: build.query<GetClientsRes, GetClientsReq>({
      query: (params) => ({ url: '/clients/', params }),
    }),
  }),
});

export const { useCreateClientMutation, useGetClientsQuery } = clientsApi;
