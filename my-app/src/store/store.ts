import { configureStore } from '@reduxjs/toolkit';
import { gameApi } from './gameApi';
import { reviewApi } from './reviewApi';
import { userApi } from './userApi';
import { countryApi } from './countryApi';
import { walletApi } from './wallet';

export const store = configureStore({
  reducer: {
    [gameApi.reducerPath]: gameApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware, reviewApi.middleware, userApi.middleware, countryApi.middleware, walletApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
