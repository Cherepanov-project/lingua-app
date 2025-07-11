import { configureStore } from "@reduxjs/toolkit";
import { languagesApi } from "../shared/api/languagesApi";

export const store = configureStore({
  reducer: {
    [languagesApi.reducerPath]: languagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(languagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
