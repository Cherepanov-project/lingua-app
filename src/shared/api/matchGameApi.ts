import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const matchGamesApi = createApi({
  reducerPath: "matchGames",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["MatchGames"],
  endpoints: (builder) => ({
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
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }],
    }),
    deleteMatchGame: builder.mutation<MatchGame, number>({
      query: (id) => ({
        url: `matchgame/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }],
    }),
    editMatchGame: builder.mutation<MatchGame, MatchGame>({
      query: (newGame) => ({
        url: `matchgame/${newGame.id}`,
        method: "PATCH",
        body: newGame,
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMatchGamesQuery,
  useAddMatchGameMutation,
  useDeleteMatchGameMutation,
  useEditMatchGameMutation,
} = matchGamesApi;
