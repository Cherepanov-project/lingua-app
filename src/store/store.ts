import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../user/features/auth/authApi";
import { languagesApi } from "../shared/api/languagesApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [languagesApi.reducerPath]: languagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, languagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
