import { createApi } from '@reduxjs/toolkit/query/react';
import type { Game } from '../types/Game';
import baseQueryWithLatency from './baseQuery';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  tagTypes: ['games'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    getGames: builder.query<Game[], { genreFilter?: string }>({
      query: () => `/games`,
      providesTags: ['games']
    }),

    getGame: builder.query<Game, { id: number }>({
      query: ({ id }) => `/games/${id}`,
      providesTags: ['games']
    }),

  }),
});

