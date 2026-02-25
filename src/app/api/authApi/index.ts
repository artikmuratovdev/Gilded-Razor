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
