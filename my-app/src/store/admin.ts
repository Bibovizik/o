import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithLatency from './baseQuery';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  tagTypes: ['admin'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    initializeData: builder.mutation<void, void>({
      query: () => ({
        url: '/admin/data-initialization',
        method: 'POST',
        body: {
          testUserCount: 200,
          maxPurchasesPerUser: 15,
          maxReviewsPerUser: 10,
          seedFilePath: "Data/Seed/initial-catalog.json"
        },
      })
    }),
  }),
});
