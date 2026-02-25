import { API_TAGS } from "@/constants/ApiTags";
import baseApi from "../baseApi/baseApi";
import type { CreateServiceReq, CreateServiceRes, GetClientsRes } from "./type";
import type { GetClientsReq, MutationRes } from "../clientsApi/type";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation<CreateServiceRes, CreateServiceReq>({
      query: (body) => ({
        url: "/services/",
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.SERVICES],
    }),
    getService: build.query<GetClientsRes, GetClientsReq>({
      query: (params) => ({ url: "/services/", params }),
      providesTags: [API_TAGS.SERVICES],
    }),
    deleteService: build.mutation<MutationRes, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.SERVICES],
    }),
    updateService: build.mutation<
      MutationRes,
      { id: string; body: Partial<CreateServiceReq> }
    >({
      query: ({ id, body }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [API_TAGS.SERVICES],
    }),
  }),
});

export const { useCreateServiceMutation, useGetServiceQuery, useDeleteServiceMutation, useUpdateServiceMutation } = serviceApi;
