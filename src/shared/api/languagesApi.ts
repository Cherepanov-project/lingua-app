import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LanguageOption } from "../types/language";
import type { LevelOptions } from "../types/levels";
import { API_BASE_URL } from "../constants/api";

export const languagesApi = createApi({
  reducerPath: "languagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
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
