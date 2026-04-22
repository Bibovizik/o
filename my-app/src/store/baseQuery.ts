import { fetchBaseQuery, type FetchArgs } from '@reduxjs/toolkit/query';
import { API_ORIGIN } from '../api/axios';

const ARTIFICIAL_LATENCY_MS = 600;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${API_ORIGIN}/api`,
  credentials: 'include',
});

function getRequestUrl(args: string | FetchArgs): string {
  return typeof args === 'string' ? args : args.url;
}

const baseQueryWithLatency: typeof rawBaseQuery = async (args, api, extraOptions) => {
  await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_LATENCY_MS));
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    typeof result.error === 'object' &&
    'status' in result.error &&
    result.error.status === 401
  ) {
    const url = getRequestUrl(args);
    const skipLogout =
      url.includes('/user/login') || url.includes('/auth/logout');

    if (!skipLogout) {
      void import('./userApi').then(({ userApi }) => {
        void api.dispatch(
          userApi.endpoints.logout.initiate(undefined, { track: false }),
        );
      });
    }
  }

  return result;
};

export default baseQueryWithLatency;