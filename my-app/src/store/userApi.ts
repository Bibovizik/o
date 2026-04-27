import { createApi } from '@reduxjs/toolkit/query/react';
import type { RegisterPublisher, User, UserStatus } from '../types/User';
import baseQueryWithLatency from './baseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['user', 'users'],
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
        url: `/auth/login`,
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['user']
    }),
    register: builder.mutation<void, RegisterPublisher & { isPublisher?: boolean }>({
      query: ({ isPublisher, ...body }) => ({
        url: isPublisher ? `/auth/register-publisher` : `/auth/register`,
        method: 'POST',
        body,
      }),
    }),
    getUsers: builder.query<User[], void>({
      query: () => `/user/getAllUsers`,
      providesTags: ['users']
    }),
    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
    changeUserStatus: builder.mutation<void, { userId: number, accountStatus: UserStatus }>({
      query: ({ userId, accountStatus }) => ({
        url: `/user/${userId}/account-status`,
        method: 'PUT',
        body: { accountStatus },
      }),
      invalidatesTags: ['users'],
    }),
    changeCountry: builder.mutation<void, { countryCode: string }>({
      query: ({ countryCode }) => ({
        url: `/user/change-country`,
        method: 'POST',
        body: { countryCode },
      }),
      invalidatesTags: ['user'],
    }),
  }),
});
