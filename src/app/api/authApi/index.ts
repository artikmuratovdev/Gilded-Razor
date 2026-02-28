import { saveTokens } from '@/app/tokenManager';
import { baseApi } from '../baseApi/baseApi';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: LoginResponse) => {
        const token = response?.data?.access_token;
        const refreshToken = response?.data?.refresh_token;
        if (token) {
          saveTokens(token, refreshToken);
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
