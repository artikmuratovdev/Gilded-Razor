import { baseApi } from '../baseApi/baseApi';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from './types';

// Function to save token immediately after login
const saveAuthToken = (token: string, refreshToken?: string) => {
  try {
    const CACHE_KEY = 'rtk_cache';
    const TOKEN_KEY = 'auth_token';
    const REFRESH_TOKEN_KEY = 'refresh_token';
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[TOKEN_KEY] = token;
    if (refreshToken) cache[REFRESH_TOKEN_KEY] = refreshToken;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    console.log('✅ Token saved successfully');
  } catch (error) {
    console.error('❌ Error saving token:', error);
  }
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: LoginResponse) => {
        // Extract and save token immediately
        const token = response?.data?.access_token;
        const refreshToken = response?.data?.refresh_token;
        if (token) {
          saveAuthToken(token, refreshToken);
        } else {
          console.error('❌ No access_token found in login response');
        }
        return response;
      },
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, string>({
      query: (body) => ({
        url: 'auth/token/refresh/',
        method: 'POST',
        body,
      }),
    }),
    me: builder.query<User, void>({
      query: () => 'users/me/',
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useMeQuery } = authApi;
