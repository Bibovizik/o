import { countryApi } from './countryApi';
import { gameApi } from './gameApi';
import { reviewApi } from './reviewApi';
import { userApi } from './userApi';
import { walletApi } from './wallet';


export const { useGetGamesQuery, useGetGameQuery, usePublishGameMutation, useGetLibraryGamesQuery } = gameApi;
export const { useGetReviewsQuery, useAddReviewMutation } = reviewApi;
export const { useGetProfileQuery, useLogoutMutation, useLoginMutation, useRegisterMutation, useRegisterPublisherMutation } = userApi;
export const { useGetCountryCodeQuery } = countryApi;
export const { useGetWalletQuery, useTopUpWalletMutation } = walletApi;