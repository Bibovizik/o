import { configureStore } from '@reduxjs/toolkit';
import { gameApi } from './gameApi';
import { reviewApi } from './reviewApi';
import { userApi } from './userApi';
import { countryApi } from './countryApi';
import { walletApi } from './wallet';
import { genreApi } from './genreApi';
import { adminApi } from './adminApi';
import alertReducer from './alertSlice';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    [gameApi.reducerPath]: gameApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        gameApi.middleware,
        reviewApi.middleware,
        userApi.middleware,
        countryApi.middleware,
        walletApi.middleware,
        genreApi.middleware,
        adminApi.middleware,
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
