import { countryApi } from './countryApi';
import { gameApi } from './gameApi';
import { reviewApi } from './reviewApi';
import { userApi } from './userApi';
import { walletApi } from './wallet';
import { genreApi } from './genreApi';

export const {
  useGetGamesInfiniteQuery,
  useGetGameQuery,
  usePublishGameMutation,
  usePurchaseGameMutation,
  useDeleteGameMutation,
  useGetDashboardQuery,
  useEditGameMutation,
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
  useRegisterPublisherMutation,
} = userApi;
export const { useGetCountryCodeQuery } = countryApi;
export const { useGetWalletQuery, useTopUpWalletMutation } = walletApi;
export const { useGetGenresQuery, useAddGenreMutation, useDeleteGenreMutation, useUpdateGenreMutation } = genreApi;