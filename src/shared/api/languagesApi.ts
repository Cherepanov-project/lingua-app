import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LanguageOption } from "../types/language";
import { API_BASE_URL } from "../constants/api";

export const languagesApi = createApi({
  reducerPath: "languagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getLanguages: builder.query<LanguageOption[], void>({
      query: () => "/languages",
    }),
  }),
});

export const { useGetLanguagesQuery } = languagesApi;
