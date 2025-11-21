import { createSlice } from '@reduxjs/toolkit'

export interface BookItem {
  id: string
  title: string
  url: string
}

export interface ReaderState {
  books: BookItem[]
  currentBookId: string | null
  chunksByBook: Record<string, string[]>
  currentChunkIndexByBook: Record<string, number>
  maxCharsPerChunk: number
}

export const initialState: ReaderState = {
  books: [
    { id: '1', title: 'The Lock and the Key', url: 'https://storage.yandexcloud.net/lingua-app/Gruber_The-Lock-and-the-Key_RuLit_Me.html' },
    { id: '2', title: 'The Torrents of Spring', url: 'https://storage.yandexcloud.net/lingua-app/Heminguey_The-Torrents-of-Spring_RuLit_Me.html' },
    { id: '3', title: 'Marden Fee', url: 'https://storage.yandexcloud.net/lingua-app/Bullett_Marden-Fee_RuLit_Me.html' },
    { id: '4', title: 'Private Lives', url: 'https://storage.yandexcloud.net/lingua-app/Edvards_Private-Lives_RuLit_Me.html' },
    { id: '5', title: 'Ghost Sub', url: 'https://storage.yandexcloud.net/lingua-app/Taker_Danny-Jabo_2_Ghost-Sub_RuLit_Me.html' },
    { id: '6', title: 'Master of none', url: 'https://storage.yandexcloud.net/lingua-app/Gobl_Master-of-none_RuLit_Me.html' },
  ],
  currentBookId: null,
  chunksByBook: {},
  currentChunkIndexByBook: {},
  maxCharsPerChunk: 1350,
}

export const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload
    },
    setChunksForBook(state, action) {
      const { bookId, chunks } = action.payload
      state.chunksByBook[bookId] = chunks
      state.currentChunkIndexByBook[bookId] = 0
    },
    setCurrentChunkIndex(state, action) {
      const { bookId, index } = action.payload
      state.currentChunkIndexByBook[bookId] = index
    },
    setCurrentBook(state, action) {
      state.currentBookId = action.payload
    },
  },
})

export const { setBooks, setChunksForBook, setCurrentChunkIndex, setCurrentBook } =
  readerSlice.actions

export default readerSlice.reducer
