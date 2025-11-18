import truthOrLieReducer from '../store/reducers/TruthOrLieSlice'
import readerReducer from '../store/reducers/Reading.ts'
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../user/features/auth/authApi'
import { languagesApi } from '../shared/api/languagesApi'
import { usersApi } from '../shared/api/usersApi'
import { picturesApi } from '../shared/api/picturesApi'
import { matchGameApi } from '../shared/api/matchGameApi.ts'
import { truthOrLieGamesApi } from '../shared/api/truthOrLieGameApi.ts'
import { listeningApi } from '../shared/api/listeningApi'
import { orthographyApi } from '../shared/api/orthographyjApi.ts'
import { newWordsApi } from '../shared/api/newWordsApi.ts'
import { grammarApi } from "../shared/api/grammarApi.ts";
import { grammarExercisesApi } from "../shared/api/grammarExercisesApi.ts";
import { bookApi } from '../shared/api/bookApi.ts'

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
    [newWordsApi.reducerPath]: newWordsApi.reducer,
    [grammarApi.reducerPath]: grammarApi.reducer,
    [grammarExercisesApi.reducerPath]: grammarExercisesApi.reducer,
    reader: readerReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(languagesApi.middleware)
      .concat(usersApi.middleware)
      .concat(picturesApi.middleware)
      .concat(truthOrLieGamesApi.middleware)
      .concat(matchGameApi.middleware)
      .concat(orthographyApi.middleware)
      .concat(listeningApi.middleware)
      .concat(newWordsApi.middleware)
      .concat(grammarApi.middleware)
      .concat(grammarExercisesApi.middleware)
      .concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
