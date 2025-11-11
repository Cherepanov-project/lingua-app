import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TGrammarExercise } from '../../types/grammarExercises'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api/'

export const grammarExercisesApi = createApi({
  reducerPath: 'grammarExercisesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['GrammarExercises'],
  endpoints: builder => ({
    getGrammarExercises: builder.query<TGrammarExercise[], void>({
      query: () => 'grammar-exercises',
      providesTags: ['GrammarExercises'],
    }),
    getGrammarExercisesByLevel: builder.query<TGrammarExercise[], string>({
      query: level => `grammar-exercises/level/${level}`,
    }),
    addGrammarExercise: builder.mutation<TGrammarExercise, Omit<TGrammarExercise, 'id'>>({
      query: body => ({
        url: 'grammar-exercises',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GrammarExercises'],
    }),

    updateGrammarExercise: builder.mutation<TGrammarExercise, TGrammarExercise>({
      query: body => ({
        url: `grammar-exercises`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['GrammarExercises'],
    }),

    deleteGrammarExercise: builder.mutation<{ success: boolean; deleted: number }, number>({
      query: id => ({
        url: `grammar-exercises/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GrammarExercises'],
    }),
  }),
})

export const {
  useGetGrammarExercisesQuery,
  useAddGrammarExerciseMutation,
  useUpdateGrammarExerciseMutation,
  useDeleteGrammarExerciseMutation,
  useGetGrammarExercisesByLevelQuery,
} = grammarExercisesApi
