import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LanguageOption } from "../types/language";

export const languagesApi = createApi({
  reducerPath: "languagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getLanguages: builder.query<LanguageOption[], void>({
      query: () => "/languages",
    }),
  }),
});

export const { useGetLanguagesQuery } = languagesApi;
