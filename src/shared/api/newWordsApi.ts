import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Word = {
  id: number
  topic_id: number
  ru: string
  en: string
}

export type Topic = {
  id: number
  title: string
  words: Word[]
}

export type NewWords = Topic[]

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

export const newWordsApi = createApi({
  reducerPath: 'newWordsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/` }),
  tagTypes: ['NewWords', 'NewWord'],
  endpoints: builder => ({
    getNewWords: builder.query<NewWords, void>({
      query: () => 'new-words',
      providesTags: ['NewWords']
    }),
    addNewWords: builder.mutation<Topic, Omit<Topic, 'id'>>({
      query: newWord => ({
        url: 'new-words',
        method: 'POST',
        body: newWord,
      }),
      invalidatesTags: [{ type: 'NewWord', id: 'LIST' }, 'NewWord'],
    }),

    deleteNewWords: builder.mutation<void, number>({
      query: id => ({
        url: `new-words/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'NewWords', id: 'LIST' }, 'NewWords'],
    }),

    editNewWords: builder.mutation<Topic, Topic>({
      query: updatedWords => ({
        url: 'new-words',
        method: 'PATCH',
        body: updatedWords,
      }),
      invalidatesTags: [{ type: 'NewWords', id: 'LIST' }, 'NewWords'],
    }),
  }),
})

export const {
  useGetNewWordsQuery,
  useAddNewWordsMutation,
  useDeleteNewWordsMutation,
  useEditNewWordsMutation,
} = newWordsApi
