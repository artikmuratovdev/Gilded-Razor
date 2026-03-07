import { API_TAGS } from "@/constants/ApiTags";
import baseApi from "../baseApi/baseApi";
import type {
  addAdditionalExpensesReq,
  additionalExpensesReq,
  getAdditionalExpensesRes,
} from "./type";
import type { MutationRes } from "../clientsApi/type";

const additionalExpenses = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdditionalExpenses: builder.query<
      getAdditionalExpensesRes,
      additionalExpensesReq
    >({
      query: (params) => ({
        url: "/additional-expenses/",
        params,
      }),
      providesTags: [API_TAGS.AdditionalExpenses],
    }),
    addAdditionalExpenses: builder.mutation<
      MutationRes,
      addAdditionalExpensesReq
    >({
      query: (body) => ({
        url: "/additional-expenses/",
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.AdditionalExpenses],
    }),
    getAdditionalExpenses: builder.query<getAdditionalExpensesRes, string>({
      query: (id) => ({
        url: "/additional-expenses/" + id + "/",
      }),
      providesTags: [API_TAGS.AdditionalExpenses],
    }),
    updateAdditionalExpenses: builder.mutation<
      MutationRes,
      { id: string; body: addAdditionalExpensesReq }
    >({
      query: ({ id, body }) => ({
        url: `/additional-expenses/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [API_TAGS.AdditionalExpenses],
    }),
    deleteAdditionalExpenses: builder.mutation<void, number>({
      query: (id) => ({
        url: `/additional-expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.AdditionalExpenses],
    }),
  }),
});

export const {
  useAddAdditionalExpensesMutation,
  useDeleteAdditionalExpensesMutation,
  useGetAdditionalExpensesQuery,
  useGetAllAdditionalExpensesQuery,
  useUpdateAdditionalExpensesMutation,
} = additionalExpenses;
