import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

export interface OrthographyExercise {
  id: number;
  word: string;
  imageUrl: string;
  description: string;
}

const realBaseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/api`,
});

export const orthographyApi = createApi({
  reducerPath: 'orthographyApi',
  baseQuery: realBaseQuery,
  tagTypes: ['OrthographyExercise'],
  endpoints: (builder) => ({
    getOrthographyExercise: builder.query<OrthographyExercise[], void>({
      query: () => '/orthography/words',
      providesTags: [{ type: 'OrthographyExercise', id: 'LIST' }],
    }),
  }),
});

export const { useGetOrthographyExerciseQuery } = orthographyApi;
