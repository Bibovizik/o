import { createApi } from '@reduxjs/toolkit/query/react';
import type { Genre } from '../types/Game';
import baseQueryWithLatency from './baseQuery';

export const genreApi = createApi({
  reducerPath: 'genreApi',
  tagTypes: ['genre'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    getGenres: builder.query<Genre[], void>({
      query: () => `/genres`,
      providesTags: ['genre']
    }),
    addGenre: builder.mutation<void, { name: string, description: string }>({
      query: (body) => ({
        url: `/genres`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['genre']
    }),
  }),
});
