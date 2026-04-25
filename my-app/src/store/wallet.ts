import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithLatency from './baseQuery';
import type { WalletBalance, TopUpWallet } from '../types/User';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  tagTypes: ['wallet'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    getWallet: builder.query<WalletBalance, void>({
      query: () => `/wallet`,
      providesTags: ['wallet']
    }),
    topUpWallet: builder.mutation<void, TopUpWallet>({
      query: (body) => ({
        url: `/wallet/top-up`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['wallet']
    }),
  }),
});
