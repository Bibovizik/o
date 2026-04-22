import { countryApi } from './countryApi';
import { gameApi } from './gameApi';
import { reviewApi } from './reviewApi';
import { userApi } from './userApi';


export const { useGetGamesQuery, useGetGameQuery } = gameApi;
export const { useGetReviewsQuery, useAddReviewMutation } = reviewApi;
export const { useGetProfileQuery, useLogoutMutation, useLoginMutation, useRegisterMutation, useRegisterPublisherMutation } = userApi;
export const { useGetCountryCodeQuery } = countryApi;
