import { createApi } from '@reduxjs/toolkit/query/react';
import type { Game, PublishGamePayload } from '../types/Game';
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

export const gameApi = createApi({
  reducerPath: 'gameApi',
  tagTypes: ['games'],
  baseQuery: baseQueryWithLatency,
  endpoints: (builder) => ({
    getGames: builder.query<Game[], { genreFilter?: string }>({
      query: () => `/games`,
      providesTags: ['games']
    }),
    getLibraryGames: builder.query<Game[], void>({
      query: () => `/games/library`,
      providesTags: ['games']
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
  }),
});

