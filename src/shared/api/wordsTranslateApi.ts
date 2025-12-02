import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TWordsTranslate } from '../../types/wordsTranslate';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api/'

export const wordsTranslateApi = createApi({
  reducerPath: 'wordsTranslateApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['WordsTranslate'],
  endpoints: builder => ({
    getWordsTranslateByLevel: builder.query<TWordsTranslate, string>({
      query: level => `words_translate/level/${level}`,
    }),
    getWordsTranslate: builder.query<TWordsTranslate[], void>({
      query: () => 'words_translate',
      providesTags: ['WordsTranslate'],
    }),
    addWordsTranslate: builder.mutation<TWordsTranslate, Omit<TWordsTranslate, 'id'>>({
      query: body => ({
        url: 'words_translate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WordsTranslate'],
    }),
    updateWordsTranslate: builder.mutation<TWordsTranslate, TWordsTranslate>({
      query: body => ({
        url: `words_translate`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['WordsTranslate'],
    }),
    deleteWordsTranslate: builder.mutation<{ success: boolean; deleted: number }, number>({
      query: id => ({
        url: `words_translate/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WordsTranslate'],
    }),
  }),
})

export const {
  useGetWordsTranslateByLevelQuery,
  useGetWordsTranslateQuery,
  useUpdateWordsTranslateMutation,
  useAddWordsTranslateMutation,
  useDeleteWordsTranslateMutation,
} = wordsTranslateApi
