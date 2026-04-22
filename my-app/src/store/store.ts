import { configureStore } from '@reduxjs/toolkit';
import { gameApi } from './gameApi';
import { reviewApi } from './reviewApi';
import { userApi } from './userApi';
import { countryApi } from './countryApi';

export const store = configureStore({
  reducer: {
    [gameApi.reducerPath]: gameApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware, reviewApi.middleware, userApi.middleware, countryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
