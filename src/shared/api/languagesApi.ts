import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LanguageOption } from "../types/language";

const JSONBIN_BASE_URL = "https://api.jsonbin.io/v3";
const JSONBIN_API_KEY = "$2a$10$ltfhYjgQ4XrIqAKXBw.QZuzJP4bMWkHhHKeT9ZVUwgUBaEk1.vGfm";
const JSONBIN_BIN_ID = "688a53a37b4b8670d8a9f543";

export const languagesApi = createApi({
  reducerPath: "languagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: JSONBIN_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("X-Master-Key", JSONBIN_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLanguages: builder.query<LanguageOption[], void>({
      query: () => `/b/${JSONBIN_BIN_ID}`,
      transformResponse: (response: { record: { languages: LanguageOption[] } }) => 
        response.record.languages,
    }),
  }),
});

export const { useGetLanguagesQuery } = languagesApi;