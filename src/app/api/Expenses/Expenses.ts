import { API_TAGS } from "@/constants/ApiTags";
import baseApi from "../baseApi/baseApi";
import type {
  addExpensesReq,
  ExpensesReq,
  getExpensesRes,
} from "./type";
import type { MutationRes } from "../clientsApi/type";

const Expenses = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpenses: builder.query<
      getExpensesRes,
      ExpensesReq
    >({
      query: (params) => ({
        url: "/expenses/",
        params,
      }),
      providesTags: [API_TAGS.Expenses],
    }),
    addExpenses: builder.mutation<
      MutationRes,
      addExpensesReq
    >({
      query: (body) => ({
        url: "/expenses/",
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.Expenses],
    }),
    getExpenses: builder.query<getExpensesRes, string>({
      query: (id) => ({
        url: "/expenses/" + id + "/",
      }),
      providesTags: [API_TAGS.Expenses],
    }),
    updateExpenses: builder.mutation<
      MutationRes,
      { id: string; body: addExpensesReq }
    >({
      query: ({ id, body }) => ({
        url: `/expenses/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [API_TAGS.Expenses],
    }),
    deleteExpenses: builder.mutation<void, number>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.Expenses],
    }),
  }),
});

export const {
  useAddExpensesMutation,
  useDeleteExpensesMutation,
  useGetExpensesQuery,
  useGetAllExpensesQuery,
  useUpdateExpensesMutation,
} = Expenses;
