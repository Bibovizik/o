import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithLatency from './baseQuery';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  tagTypes: ['admin'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    initializeData: builder.mutation<void, { testUserCount: number, maxPurchasesPerUser: number, maxReviewsPerUser: number, }>({
      query: ({ testUserCount, maxPurchasesPerUser, maxReviewsPerUser }) => ({
        url: '/admin/data-initialization',
        method: 'POST',
        body: {
          testUserCount,
          maxPurchasesPerUser,
          maxReviewsPerUser,
          seedFilePath: "Data/Seed/initial-catalog.json"
        },
      }),
      invalidatesTags: ['admin'],
    }),
  }),
});
