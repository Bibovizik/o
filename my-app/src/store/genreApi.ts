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
    deleteGenre: builder.mutation<void, number>({
      query: (genreId) => ({
        url: `/genres/${genreId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['genre']
    }),
    updateGenre: builder.mutation<void, { genreId: number, name: string, description: string }>({
      query: ({ genreId, name, description }) => ({
        url: `/genres/${genreId}`,
        method: 'PUT',
        body: { name, description },
      }),
      invalidatesTags: ['genre']
    }),
  }),
});
