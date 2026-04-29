import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { gameApi } from './gameApi';
import { genreApi } from './genreApi';
import { reviewApi } from './reviewApi';
import { userApi } from './userApi';
import { walletApi } from './wallet';
import { adminApi } from './adminApi';

export type AlertSeverity = 'success' | 'error';

export interface AlertState {
  id: string;
  message: string;
  severity: AlertSeverity;
}

const alertSlice = createSlice({
  name: 'alert',
  initialState: [] as AlertState[],
  reducers: {
    removeAlert: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter(notification => notification.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(gameApi.endpoints.publishGame.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Game published successfully',
        severity: 'success',
      });
    }).addMatcher(gameApi.endpoints.publishGame.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to publish game',
        severity: 'error',
      });
    }).addMatcher(gameApi.endpoints.editGame.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Game edited successfully',
        severity: 'success',
      });
    }).addMatcher(gameApi.endpoints.editGame.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to edit game',
        severity: 'error',
      });
    }).addMatcher(gameApi.endpoints.purchaseGame.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Game purchased successfully',
        severity: 'success',
      });
    }).addMatcher(gameApi.endpoints.purchaseGame.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to purchase game',
        severity: 'error',
      });
    }).addMatcher(gameApi.endpoints.deleteGame.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Game deleted successfully',
        severity: 'success',
      });
    }).addMatcher(gameApi.endpoints.deleteGame.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to delete game',
        severity: 'error',
      });
    }).addMatcher(gameApi.endpoints.getDashboard.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to fetch dashboard',
        severity: 'error',
      });
    }).addMatcher(gameApi.endpoints.getGames.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to fetch games',
        severity: 'error',
      });
    }).addMatcher(gameApi.endpoints.getGame.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to fetch game',
        severity: 'error',
      });
    }).addMatcher(genreApi.endpoints.addGenre.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Genre added successfully',
        severity: 'success',
      });
    }).addMatcher(genreApi.endpoints.addGenre.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to add genre',
        severity: 'error',
      });
    }).addMatcher(genreApi.endpoints.deleteGenre.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Genre deleted successfully',
        severity: 'success',
      });
    }).addMatcher(genreApi.endpoints.deleteGenre.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to delete genre',
        severity: 'error',
      });
    }).addMatcher(genreApi.endpoints.updateGenre.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Genre updated successfully',
        severity: 'success',
      });
    }).addMatcher(genreApi.endpoints.updateGenre.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to update genre',
        severity: 'error',
      });
    }).addMatcher(genreApi.endpoints.getGenres.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to fetch genres',
        severity: 'error',
      });
    }).addMatcher(reviewApi.endpoints.addReview.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Review added successfully',
        severity: 'success',
      });
    }).addMatcher(reviewApi.endpoints.addReview.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to add review',
        severity: 'error',
      });
    }).addMatcher(reviewApi.endpoints.getReviews.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to fetch reviews',
        severity: 'error',
      });
    }).addMatcher(userApi.endpoints.changeUserStatus.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'User status changed successfully',
        severity: 'success',
      });
    }).addMatcher(userApi.endpoints.changeUserStatus.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to change user status',
        severity: 'error',
      });
    }).addMatcher(userApi.endpoints.changeCountry.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Country changed successfully',
        severity: 'success',
      });
    }).addMatcher(userApi.endpoints.changeCountry.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to change country',
        severity: 'error',
      })
    }).addMatcher(userApi.endpoints.getUsers.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to fetch users',
        severity: 'error',
      });
    }).addMatcher(userApi.endpoints.deleteUser.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'User deleted successfully',
        severity: 'success',
      });
    }).addMatcher(userApi.endpoints.deleteUser.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to delete user',
        severity: 'error',
      });
    }).addMatcher(walletApi.endpoints.topUpWallet.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Wallet topped up successfully',
        severity: 'success',
      });
    }).addMatcher(walletApi.endpoints.topUpWallet.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to top up wallet',
        severity: 'error',
      });
    }).addMatcher(walletApi.endpoints.getWallet.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to fetch wallet',
        severity: 'error',
      });
    }).addMatcher(adminApi.endpoints.initializeData.matchFulfilled, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Data initialized successfully',
        severity: 'success',
      });
    }).addMatcher(adminApi.endpoints.initializeData.matchRejected, (state) => {
      state.push({
        id: crypto.randomUUID(),
        message: 'Failed to initialize data',
        severity: 'error',
      });
    });
  }
})

export const { removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
