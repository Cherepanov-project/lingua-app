import truthOrLieReducer from '../store/reducers/TruthOrLieSlice';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../user/features/auth/authApi';
import { languagesApi } from '../shared/api/languagesApi';
import { usersApi } from '../shared/api/usersApi';
import { picturesApi } from '../shared/api/picturesApi';
import { matchGameApi } from '../shared/api/matchGameApi.ts';
import { truthOrLieGamesApi } from '../shared/api/truthOrLieGameApi.ts';
import { listeningApi } from '../shared/api/listeningApi';
import { orthographyApi } from '../shared/api/orthographyjApi.ts';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [languagesApi.reducerPath]: languagesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [picturesApi.reducerPath]: picturesApi.reducer,
    [truthOrLieGamesApi.reducerPath]: truthOrLieGamesApi.reducer,
    truthOrLie: truthOrLieReducer,
    [matchGameApi.reducerPath]: matchGameApi.reducer,
    [orthographyApi.reducerPath]: orthographyApi.reducer,
    [listeningApi.reducerPath]: listeningApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(languagesApi.middleware)
      .concat(usersApi.middleware)
      .concat(picturesApi.middleware)
      .concat(truthOrLieGamesApi.middleware)
      .concat(matchGameApi.middleware)
      .concat(orthographyApi.middleware)
      .concat(listeningApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
