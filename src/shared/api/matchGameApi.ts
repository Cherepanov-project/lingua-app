import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { WordPair, LevelData } from '../helpers/matchGameHelpers';
import { generateDynamicLevel } from '../helpers/matchGameHelpers';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"

export const matchGameApi = createApi({
  reducerPath: 'matchGameApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["MatchGame"],
  endpoints: (builder) => ({
    getWordPairs: builder.query<WordPair[], void>({
      query: () => '/matchgame',
    }),
    getLevel: builder.query<LevelData, number>({
      query: () => {
        return '/matchgame';
      },
      transformResponse: (response: WordPair[], _meta, arg) => {
        return generateDynamicLevel(arg, 5, response);
      },
      providesTags: ['MatchGame']
    }),
  }),
});

export const { useGetWordPairsQuery, useGetLevelQuery } = matchGameApi;


