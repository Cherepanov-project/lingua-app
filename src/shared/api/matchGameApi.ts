import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WordPair, LevelData } from "../helpers/matchGameHelpers";
import { generateDynamicLevel } from "../helpers/matchGameHelpers";

export type MatchGame = {
  id: number;
  level: number;
  pairs: {
    left: string;
    right: string;
  }[];
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const matchGameApi = createApi({
  reducerPath: "matchGameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["MatchGame", "MatchGames"],
  endpoints: (builder) => ({
    getWordPairs: builder.query<WordPair[], void>({
      query: () => "/matchgame",
      providesTags: ["MatchGame"],
    }),

    getLevel: builder.query<LevelData, number>({
      query: () => "/matchgame",
      transformResponse: (response: WordPair[], _meta, arg: number) => {
        return generateDynamicLevel(arg, 5, response);
      },
      providesTags: ["MatchGame"],
    }),

    getMatchGames: builder.query<MatchGame[], void>({
      query: () => "matchgame",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "MatchGames" as const, id })),
              { type: "MatchGames", id: "LIST" },
            ]
          : [{ type: "MatchGames", id: "LIST" }],
    }),

    addMatchGame: builder.mutation<MatchGame, Omit<MatchGame, "id">>({
      query: (newGame) => ({
        url: "matchgame",
        method: "POST",
        body: newGame,
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }, "MatchGame"],
    }),

    deleteMatchGame: builder.mutation<void, number>({
      query: (id) => ({
        url: `matchgame/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }, "MatchGame"],
    }),

    editMatchGame: builder.mutation<MatchGame, MatchGame>({
      query: (updatedGame) => ({
        url: `matchgame/${updatedGame.id}`,
        method: "PATCH",
        body: updatedGame,
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }, "MatchGame"],
    }),
  }),
});

export const {
  useGetWordPairsQuery,
  useGetLevelQuery,
  useGetMatchGamesQuery,

  useAddMatchGameMutation,
  useDeleteMatchGameMutation,
  useEditMatchGameMutation,
} = matchGameApi;

export type { WordPair, LevelData } from "../helpers/matchGameHelpers";
