import { createApi } from '@reduxjs/toolkit/query/react';
import type { RegisterPublisher, RegisterUser, User } from '../types/User';
import baseQueryWithLatency from './baseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['user'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => `/user/profile`,
      providesTags: ['user']
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      }),
    }),
    login: builder.mutation<void, { email: string, password: string }>({
      query: ({ email, password }) => ({
        url: `/user/login`,
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['user']
    }),
    register: builder.mutation<void, RegisterUser>({
      query: ({ userNickname, email, password, countryCode }) => ({
        url: `/user/register`,
        method: 'POST',
        body: { userNickname, email, password, countryCode },
      }),
    }),
    registerPublisher: builder.mutation<void, RegisterPublisher>({
      query: ({ userNickname, email, password, countryCode }) => ({
        url: `/user/register-publisher`,
        method: 'POST',
        body: { userNickname, email, password, countryCode },
      }),
      invalidatesTags: ['user']
    }),
  }),
});

export const { useGetProfileQuery, useLogoutMutation, useLoginMutation, useRegisterMutation } = userApi;