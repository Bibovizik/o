import { createApi } from '@reduxjs/toolkit/query/react';
import type { Dashboard, Game, PublishGamePayload } from '../types/Game';
import baseQueryWithLatency from './baseQuery';

function toPublishGameFormData(payload: PublishGamePayload): FormData {
  const fd = new FormData();
  fd.append('Name', payload.name);
  fd.append('ReleaseDate', payload.releaseDate);
  fd.append('Description', payload.description);
  fd.append('BasePriceUah', String(payload.basePriceUah));
  fd.append('MostOneTimePlayers', String(payload.mostOneTimePlayers));
  if (payload.image) {
    fd.append('Image', payload.image);
  }
  if (payload.imageUrl !== undefined && payload.imageUrl !== '') {
    fd.append('ImageUrl', payload.imageUrl);
  }
  if (payload.marketPriceOverridesJson !== undefined) {
    fd.append('MarketPriceOverridesJson', payload.marketPriceOverridesJson);
  }
  if (payload.preserveExistingImage !== undefined) {
    fd.append('PreserveExistingImage', String(payload.preserveExistingImage));
  }
  if (payload.systemRequirementsJson !== undefined) {
    fd.append('SystemRequirementsJson', payload.systemRequirementsJson);
  }
  if (payload.genreIdsJson !== undefined) {
    fd.append('GenreIdsJson', payload.genreIdsJson);
  }
  return fd;
}

export const PAGE_SIZE = 9;

export const gameApi = createApi({
  reducerPath: 'gameApi',
  tagTypes: ['games'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    getGames: builder.infiniteQuery<{ items: Game[], totalCount: number, page: number, totalPages: number }, { name?: string, isLibrary?: boolean }, number>({
      query: (props) => {
        const { pageParam, queryArg: { name, isLibrary } } = props;
        const page = typeof pageParam === 'number' ? pageParam : 1;
        const pageSize = PAGE_SIZE;
        const isSpecified = true;

        const params = new URLSearchParams();
        // application consistency: lowercase query params
        params.set('page', String(page));
        params.set('pageSize', String(pageSize));
        params.set('isSpecified', String(isSpecified));

        if (name) {
          params.set('name', name);
        }

        return `/games${isLibrary ? '/library' : ''}?${params.toString()}`;
      },
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          // If the API returns an empty page, stop immediately to avoid loops.
          if (!lastPage || !Array.isArray(lastPage.items) || lastPage.items.length === 0) {
            return undefined;
          }
          if (!lastPage.totalPages || lastPage.page >= lastPage.totalPages) {
            return undefined;
          }
          return lastPageParam + 1;
        }
      },
      providesTags: ['games'],
    }),
    getGame: builder.query<Game, { id: number }>({
      query: ({ id }) => `/games/${id}`,
      providesTags: ['games']
    }),
    publishGame: builder.mutation<void, PublishGamePayload>({
      query: (body) => ({
        url: `/games`,
        method: 'POST',
        body: toPublishGameFormData(body),
      }),
      invalidatesTags: ['games'],
    }),
    purchaseGame: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/games/${id}/purchase`,
        method: 'POST',
      }),
      invalidatesTags: ['games'],
    }),
    deleteGame: builder.mutation<void, number>({
      query: (gameId) => ({
        url: `/games`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameId),
      }),
      invalidatesTags: ['games'],
    }),
    getDashboard: builder.query<Dashboard, void>({
      query: () => `/games/dashboard`,
    }),
  }),
});

