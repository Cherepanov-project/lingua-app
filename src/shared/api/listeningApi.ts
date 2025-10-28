import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

export interface ListeningExercise {
  id: string;
  name: string;
  description: string;
  level: string;
  imageUrl: string;
  audioUrl: string;
  questions: Array<{ question: string; options: string[]; correct: string }>;
  progress: number;
}

const realBaseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/api`,
});

export const listeningApi = createApi({
  reducerPath: "listeningApi",
  baseQuery: realBaseQuery,
  tagTypes: ["ListeningExercises", "ListeningProgress"],
  endpoints: (builder) => ({
    getListeningExercises: builder.query<ListeningExercise[], void>({
      query: () => "/listening/exercises",
      providesTags: [{ type: "ListeningExercises", id: "LIST" }],
    }),
    getListeningExercise: builder.query<ListeningExercise, string>({
      query: (id) => `/listening/exercise?id=${id}`,
      providesTags: (_result, _error, id) => [{ type: "ListeningExercises", id }],
    }),
    updateListeningProgress: builder.mutation<void, { exerciseId: string; progress: number }>({
      query: ({ exerciseId, progress }) => ({
        url: "/listening/progress",
        method: "POST",
        body: { exerciseId, progress },
      }),
      invalidatesTags: (_result, _error, { exerciseId }) => [
        { type: "ListeningExercises", id: exerciseId },
        { type: "ListeningProgress", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetListeningExercisesQuery,
  useGetListeningExerciseQuery,
  useUpdateListeningProgressMutation,
} = listeningApi;