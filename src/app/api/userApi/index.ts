import baseApi from '../baseApi/baseApi';
import type { User } from '../authApi/types';

export type UpdateProfileReq = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
};

export type ChangePasswordReq = {
  old_password: string;
  new_password: string;
};

export type UserMutationRes = {
  success: boolean;
  message: string;
  data?: User;
};

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UserMutationRes, UpdateProfileReq>({
      query: (body) => ({
        url: 'users/me/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['user'],
    }),
    changePassword: builder.mutation<UserMutationRes, ChangePasswordReq>({
      query: (body) => ({
        url: 'users/change-password/',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateProfileMutation, useChangePasswordMutation } = userApi;