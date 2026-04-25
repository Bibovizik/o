import { createApi } from '@reduxjs/toolkit/query/react';
import type { RegisterPublisher, User } from '../types/User';
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
    registerPublisher: builder.mutation<void, RegisterPublisher>({
      query: ({ userNickname, email, password, countryCode }) => ({
        url: `/auth/register-publisher`,
        method: 'POST',
        body: { userNickname, email, password, countryCode },
      }),
      invalidatesTags: ['user']
    }),
  }),
});
