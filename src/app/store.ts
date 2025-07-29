import { configureStore } from "@reduxjs/toolkit";
import { languagesApi } from "../shared/api/languagesApi";
import { usersApi } from "../shared/api/usersApi";
import { picturesApi } from "../shared/api/picturesApi";

export const store = configureStore({
  reducer: {
    [languagesApi.reducerPath]: languagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [picturesApi.reducerPath]: picturesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(languagesApi.middleware)
      .concat(usersApi.middleware)
      .concat(picturesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
