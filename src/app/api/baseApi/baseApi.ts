// baseApi.ts
import { API_TAGS } from '@/constants/ApiTags';
import { SERVER_URL } from '@/constants/serverUrl';
import {
  type BaseQueryFn,
  createApi,
  type FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type { LoginResponse, RefreshTokenResponse } from '../authApi/types';

// Constants
const CACHE_KEY = 'rtk_cache';
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Prevent simultaneous refresh calls
let isRefreshing = false;

// Load full cache
const loadCache = (): Record<string, any> => {
  try {
    const data = localStorage.getItem(CACHE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Cache`ni yuklashda xatolik:', error);
    return {};
  }
};

const updateCache = (url: string, data: LoginResponse) => {
  try {
    const cache = loadCache();

    cache[url] = data;
    // Extract token from various possible locations in the response
    const token = data?.data?.access_token;
    const refreshToken = data?.data?.refresh_token;

    if (token && typeof token === 'string') {
      cache[TOKEN_KEY] = token;
      console.log('✅ Token extracted and saved from response');
    }
    if (refreshToken && typeof refreshToken === 'string') {
      cache[REFRESH_TOKEN_KEY] = refreshToken;
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('❌ Cache`ni yangilashda xatolik:', error);
  }
};

const clearAuthTokens = () => {
  try {
    const cache = loadCache();
    delete cache[TOKEN_KEY];
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('❌ Auth tokenni tozalashda xatolik:', error);
  }
}

export const getTokenFromCache = (): string | null => {
  const cache = loadCache();
  return cache[TOKEN_KEY] ?? null;
};

export const getRefreshTokenFromCache = (): string | null => {
  const cache = loadCache();
  return cache[REFRESH_TOKEN_KEY] ?? null;
};

const saveNewTokens = (access: string, refresh?: string) => {
  try {
    const cache = loadCache();
    cache[TOKEN_KEY] = access;
    if (refresh) cache[REFRESH_TOKEN_KEY] = refresh;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}
};

const isTokenNotValid = (result: any): boolean => {
  const errorData = result?.error?.data;
  return (
    result?.error?.status === 401 ||
    errorData?.error?.details?.code === 'token_not_valid' ||
    errorData?.success === false
  );
};

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const url = typeof args === 'string' ? args : args.url ?? '';

  const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      const token = getTokenFromCache();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  // Token invalid — try refresh
  if (isTokenNotValid(result) && !isRefreshing) {
    const refreshToken = getRefreshTokenFromCache();
    if (refreshToken) {
      isRefreshing = true;
      try {
        const refreshResult = await fetchBaseQuery({ baseUrl: SERVER_URL })(
          {
            url: 'auth/token/refresh/',
            method: 'POST',
            body: { refresh: refreshToken },
          },
          api,
          extraOptions,
        );

        const refreshData = refreshResult.data as RefreshTokenResponse | undefined;
        if (refreshData?.access_token) {
          saveNewTokens(refreshData.access_token, refreshData.refresh_token);
          console.log('✅ Token refreshed successfully');
          // Retry original request with new token
          isRefreshing = false;
          return await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed — clear tokens
          clearAuthTokens();
        }
      } catch {
        clearAuthTokens();
      } finally {
        isRefreshing = false;
      }
    } else {
      clearAuthTokens();
    }
  }

  if (!result.error && result.data) {
    const responseData = result.data as LoginResponse;
    const isSuccessResponse = responseData?.success !== false;

    if (isSuccessResponse) {
      updateCache(url, responseData);
    } else {
      console.error(`⚠️ Skipping cache for error response: ${url}`);
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

export { updateCache , clearAuthTokens};
export default baseApi;