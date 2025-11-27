import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LanguageOption } from "../types/language";
import type { LevelOptions } from "../types/levels";
import type { CourseModule } from "../types/module";
import type { Lesson } from "../types/lesson";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

const realBaseQuery = fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api` });

export const languagesApi = createApi({
  reducerPath: "languagesApi",
  baseQuery: realBaseQuery,
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
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Courses", id }],
    }),
    deleteCourse: builder.mutation<void, number>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),
    getModules: builder.query<CourseModule[], void>({
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
    updateModule: builder.mutation({
      query: (body) => ({
        url: "/modules",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Modules", id: "LIST" }],
    }),
    updateCourseModules: builder.mutation({
      query: ({ id, modules }) => ({
        url: "/courses",
        method: "PATCH",
        body: { id, modules },
      }),
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),
    updateCourseInfo: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Courses", id },
        { type: "Courses", id: "LIST" },
      ],
    }),
    getLessons: builder.query<Lesson[], void>({
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
  useUpdateModuleMutation,
  useGetModulesQuery,
  useGetCourseByIdQuery,
  useAddModuleMutation,
  useDeleteModuleMutation,
  useUpdateCourseModulesMutation,
  useGetLessonsQuery,
  useDeleteLessonMutation,
  useAddLessonMutation,
  useUpdateCourseInfoMutation,
} = languagesApi;
