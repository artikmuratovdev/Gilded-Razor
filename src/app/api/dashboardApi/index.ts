import { API_TAGS } from "@/constants/ApiTags";
import baseApi from "../baseApi";
import type { Overview } from "./type";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOverview: builder.query<Overview, void>({
            query: () => "/dashboard/overview",
            providesTags: [API_TAGS.DASHBOARD],
        }),
    })
})

export const { useGetOverviewQuery } = dashboardApi