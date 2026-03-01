// baseApi.ts
import { API_TAGS } from '@/constants/ApiTags';
import { SERVER_URL } from '@/constants/serverUrl';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '@/app/tokenManager';
import {
  type BaseQueryFn,
  createApi,
  type FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type { RefreshTokenResponse } from '../authApi/types';

// fetchBaseQuery ni bir marta yaratish (har requestda emas)
const rawBaseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    const token = getAccessToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// Refresh uchun alohida baseQuery (token kerak emas)
const refreshBaseQuery = fetchBaseQuery({ baseUrl: SERVER_URL });

// Promise-based mutex — bir vaqtda faqat bitta refresh bo'ladi,
// qolgan requestlar natijani kutadi
let refreshPromise: Promise<boolean> | null = null;

const isTokenNotValid = (result: any): boolean => {
  const errorData = result?.error?.data;
  return (
    result?.error?.status === 401 ||
    errorData?.error?.details?.code === 'token_not_valid'
  );
};

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // Token yaroqsiz — refresh qilishga urinish
  if (isTokenNotValid(result)) {
    // Agar allaqachon refresh bo'layotgan bo'lsa, uni kutamiz
    if (refreshPromise) {
      const refreshed = await refreshPromise;
      if (refreshed) {
        // Yangi token bilan qayta urinish
        return rawBaseQuery(args, api, extraOptions);
      }
      return result;
    }

    // Yangi refresh jarayonini boshlash
    refreshPromise = (async (): Promise<boolean> => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        window.location.href = '/login';
        return false;
      }

      try {
        const refreshResult = await refreshBaseQuery(
          {
            url: 'auth/token/refresh/',
            method: 'POST',
            body: { refresh: refreshToken },
          },
          api,
          extraOptions,
        );

        const refreshData = refreshResult.data as
          | RefreshTokenResponse
          | undefined;

        if (refreshData?.access_token) {
          saveTokens(refreshData.access_token, refreshData.refresh_token);
          return true;
        }

        clearTokens();
        window.location.href = '/login';
        return false;
      } catch {
        clearTokens();
        window.location.href = '/login';
        return false;
      }
    })();

    try {
      const refreshed = await refreshPromise;
      if (refreshed) {
        result = await rawBaseQuery(args, api, extraOptions);
      }
    } finally {
      refreshPromise = null;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQuery,
  tagTypes: Object.values(API_TAGS),
  endpoints: () => ({}),
});

export default baseApi;