import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countryApi = createApi({
  reducerPath: 'countryApi',
  tagTypes: ['country'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://ipapi.co' }),
  endpoints: (builder) => ({
    getCountryCode: builder.query<string, void>({
      query: () => '/json/',
      transformResponse: (response: { country_code: string }) => response.country_code,
      providesTags: ['country']
    }),
  }),
});