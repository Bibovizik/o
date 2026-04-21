import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ORIGIN } from '../api/axios';
import type { Game } from '../types/Game';

const ARTIFICIAL_LATENCY_MS = 600;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${API_ORIGIN}/api`,
  credentials: 'include',
});

const baseQueryWithLatency: typeof rawBaseQuery = async (args, api, extraOptions) => {
  await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_LATENCY_MS));
  return rawBaseQuery(args, api, extraOptions);
};

export const gameApi = createApi({
  reducerPath: 'gameApi',
  tagTypes: ['games'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    getGames: builder.query<Game[], { genreFilter?: string }>({
      query: ({ genreFilter }) => {
        if (genreFilter) {
          return `/games/genre/${genreFilter}`;
        }
        return '/Game';
      },
      providesTags: ['games']
    }),

  }),
});

