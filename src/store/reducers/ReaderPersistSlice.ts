import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ReaderPersistState {
  progress: Record<string, number>
  visited: Record<string, boolean[]>
  finished: Record<string, boolean>
  selectedLanguage: Record<string, string>
}

const initialState: ReaderPersistState = {
  progress: {},
  visited: {},
  finished: {},
  selectedLanguage: {},
}

export const readerPersistSlice = createSlice({
  name: 'readerPersist',
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<{ bookId: string; index: number }>) {
      state.progress[action.payload.bookId] = action.payload.index
    },
    setVisited(state, action: PayloadAction<{ bookId: string; visited: boolean[] }>) {
      state.visited[action.payload.bookId] = action.payload.visited
    },
    setFinished(state, action: PayloadAction<{ bookId: string; finished: boolean }>) {
      state.finished[action.payload.bookId] = action.payload.finished
    },
    clearProgress(state, action: PayloadAction<string>) {
      delete state.progress[action.payload]
      delete state.visited[action.payload]
      delete state.finished[action.payload]
    },
    setLanguage(state, action: PayloadAction<{ key: string; value: string }>) {
      if (!state.selectedLanguage) {
        state.selectedLanguage = {}
      }
      state.selectedLanguage[action.payload.key] = action.payload.value
    },
    setInProgress(state, action: PayloadAction<{ bookId: string; index: number }>) {
      state.progress[action.payload.bookId] = action.payload.index
      state.finished[action.payload.bookId] = false
    },
  },
})

export const { setProgress, setVisited, setFinished, clearProgress, setLanguage, setInProgress } = readerPersistSlice.actions

export default readerPersistSlice.reducer
