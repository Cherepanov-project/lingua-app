import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface WordPairApi {
  left: string;
  right: string;
}

export interface MatchGameLevelApi {
  id: number;
  level: number;
  pairs: WordPairApi[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const matchGameApi = createApi({
  reducerPath: "matchGameApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["MatchGameLevels"],
  endpoints: (builder) => ({
    getMatchGameLevels: builder.query<MatchGameLevelApi[], void>({
      query: () => `matchgame`,
    }),
    getMatchGameLevel: builder.query<MatchGameLevelApi | undefined, number>({
      query: (level) => `matchgame?level=${level}`,
      transformResponse: (response: MatchGameLevelApi[]) => response?.[0],
    }),
  }),
});

export const {
  useGetMatchGameLevelsQuery,
  useGetMatchGameLevelQuery,
} = matchGameApi;


