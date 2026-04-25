import { createApi } from '@reduxjs/toolkit/query/react';
import type { GameReview } from '../types/Game';
import baseQueryWithLatency from './baseQuery';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  tagTypes: ['reviews'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    getReviews: builder.query<GameReview[], { id: number }>({
      query: ({ id }) => `/gameReviews/${id}`,
      providesTags: ['reviews']
    }),
    addReview: builder.mutation<void, { id: number, score: number, review: string }>({
      query: ({ id, score, review }) => ({
        url: `/gameReviews/${id}`,
        method: 'POST',
        body: { score, review }
      }),
      invalidatesTags: ['reviews']
    }),
  }),
});
