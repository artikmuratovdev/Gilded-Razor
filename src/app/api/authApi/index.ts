import { baseApi } from '../baseApi';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
} from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login/',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, string>({
      query: (body) => ({
        url: 'auth/token/refresh/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
