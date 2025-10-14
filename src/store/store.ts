import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../user/features/auth/authApi";
import { languagesApi } from "../shared/api/languagesApi";
import { usersApi } from "../shared/api/usersApi";
import { picturesApi } from "../shared/api/picturesApi";
import { matchGamesApi } from "../shared/api/matchGameApi";
import { truthOrLieGamesApi } from "../shared/api/truthOrLieGameApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [languagesApi.reducerPath]: languagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [picturesApi.reducerPath]: picturesApi.reducer,
    [matchGamesApi.reducerPath]: matchGamesApi.reducer,
    [truthOrLieGamesApi.reducerPath]: truthOrLieGamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(languagesApi.middleware)
      .concat(usersApi.middleware)
      .concat(picturesApi.middleware)
      .concat(matchGamesApi.middleware)
      .concat(truthOrLieGamesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
