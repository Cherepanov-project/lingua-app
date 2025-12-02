import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TExerciseInsertText } from '../../types/exercisesInsertText'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api/'

export const exercisesInsertTextApi = createApi({
  reducerPath: 'exercisesInsertTextApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['ExercisesInsertText'],
  endpoints: builder => ({
    getExercisesInsertTextByLevel: builder.query<TExerciseInsertText, string>({
      query: level => `insert-text/level/${level}`,
    }),
    getExercisesInsertText: builder.query<TExerciseInsertText[], void>({
      query: () => 'insert-text',
      providesTags: ['ExercisesInsertText'],
    }),
    addExerciseInsertText: builder.mutation<TExerciseInsertText, Omit<TExerciseInsertText, 'id'>>({
      query: body => ({
        url: 'insert-text',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ExercisesInsertText'],
    }),
    updateExerciseInsertText: builder.mutation<TExerciseInsertText, TExerciseInsertText>({
      query: body => ({
        url: `insert-text`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['ExercisesInsertText'],
    }),
    deleteExerciseInsertText: builder.mutation<{ success: boolean; deleted: number }, number>({
      query: id => ({
        url: `insert-text/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ExercisesInsertText'],
    }),
  }),
})

export const {
  useGetExercisesInsertTextByLevelQuery,
  useGetExercisesInsertTextQuery,
  useUpdateExerciseInsertTextMutation,
  useAddExerciseInsertTextMutation,
  useDeleteExerciseInsertTextMutation,
} = exercisesInsertTextApi
