import truthOrLieReducer from '../store/reducers/TruthOrLieSlice'
import readerReducer from '../store/reducers/Reading.ts'
import { combineReducers } from '@reduxjs/toolkit'
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
import readerPersistReducer from './reducers/ReaderPersistSlice.ts'

const rootReducer = combineReducers({
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
  readerPersist: readerPersistReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>
export default rootReducer