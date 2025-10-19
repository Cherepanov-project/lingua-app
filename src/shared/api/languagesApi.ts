import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import type { LanguageOption } from "../types/language";
import type { LevelOptions } from "../types/levels";
import {
  mockLanguages,
  mockLevels,
  mockCourses,
  mockModules,
  mockLessons,
} from "../constants/mockDB";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

const mockBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const url = typeof args === "string" ? args : args.url;

  switch (url) {
    case "/languages":
      return { data: mockLanguages };
    case "/levels":
      return { data: mockLevels };
    case "/courses":
      return { data: mockCourses };
    case "/modules":
      return { data: mockModules };
    case "/lessons":
      return { data: mockLessons };
    default:
      return {
        error: {
          status: 404,
          statusText: "Not Found",
          data: "Endpoint not mocked",
        },
      };
  }
};

const realBaseQuery = fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api` });

export const languagesApi = createApi({
  reducerPath: "languagesApi",
  baseQuery: import.meta.env.PROD ? mockBaseQuery : realBaseQuery,
  tagTypes: ["Courses", "Modules", "Lessons"],
  endpoints: (builder) => ({
    getLanguages: builder.query<LanguageOption[], void>({
      query: () => "/languages",
    }),
    getLevels: builder.query<LevelOptions[], void>({
      query: () => "/levels",
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: [{ type: "Courses", id: "LIST" }],
    }),
    deleteCourse: builder.mutation<void, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),
    getModules: builder.query({
      query: () => "/modules",
      providesTags: [{ type: "Modules", id: "LIST" }],
    }),
    addModule: builder.mutation({
      query: (body) => ({
        url: "/modules",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Modules", id: "LIST" }],
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/modules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Modules", id: "LIST" }],
    }),
    updateLessonsInModule: builder.mutation({
      query: ({ id, lessons }) => ({
        url: `/modules/${id}`,
        method: "PATCH",
        body: { lessons },
      }),
      invalidatesTags: [{ type: "Modules", id: "LIST" }],
    }),
    updateCourseModules: builder.mutation({
      query: ({ id, modules }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: { modules },
      }),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),
    getLessons: builder.query({
      query: () => "/lessons",
      providesTags: [{ type: "Lessons", id: "LIST" }],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Lessons", id: "LIST" }],
    }),
    addLesson: builder.mutation({
      query: (body) => ({
        url: "/lessons",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Lessons", id: "LIST" }],
    }),
  }),
});

export const {
  useGetLanguagesQuery,
  useGetLevelsQuery,
  useAddCourseMutation,
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useUpdateLessonsInModuleMutation,
  useGetModulesQuery,
  useAddModuleMutation,
  useDeleteModuleMutation,
  useUpdateCourseModulesMutation,
  useGetLessonsQuery,
  useDeleteLessonMutation,
  useAddLessonMutation,
} = languagesApi;