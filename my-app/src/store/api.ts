import { countryApi } from './countryApi';
import { gameApi } from './gameApi';
import { reviewApi } from './reviewApi';
import { userApi } from './userApi';
import { walletApi } from './wallet';
import { genreApi } from './genreApi';
import { adminApi } from './admin';

export const {
  useGetGamesInfiniteQuery,
  useGetGameQuery,
  usePublishGameMutation,
  usePurchaseGameMutation,
  useDeleteGameMutation,
  useGetDashboardQuery,
  useEditGameMutation,
  useGetGamePricesQuery,
} = gameApi;
export const { useGetReviewsQuery, useAddReviewMutation } = reviewApi;
export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useChangeUserStatusMutation,
  useChangeCountryMutation,
  useLogoutMutation,
  useLoginMutation,
  useRegisterMutation,
} = userApi;
export const { useGetCountryCodeQuery } = countryApi;
export const { useGetWalletQuery, useTopUpWalletMutation } = walletApi;
export const { useGetGenresQuery, useAddGenreMutation, useDeleteGenreMutation, useUpdateGenreMutation } = genreApi;
export const { useInitializeDataMutation } = adminApi;  