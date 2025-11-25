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
import storage from 'redux-persist/lib/storage'
import { type PersistConfig } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import rootReducer, { type RootReducer } from './rootReducer.ts'
import persistStore from 'redux-persist/es/persistStore'

export const persistConfig: PersistConfig<RootReducer> = {
  key: 'root',
  storage,
  whitelist: ['readerPersist'], 
}

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
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

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
