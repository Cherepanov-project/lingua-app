import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type MatchGame = {
  id: number;
  level: number;
  pairs: {
    russian: string;
    english: string;
  }[];
};

const API_BASE_URL = "http://localhost:3001";

export const matchGamesApi = createApi({
  reducerPath: "matchGames",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["MatchGames"],
  endpoints: (builder) => ({
    getMatchGames: builder.query<MatchGame[], void>({
      query: () => "match-games",
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
        url: "match-games",
        method: "POST",
        body: newGame,
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }],
    }),
  }),
});

export const { useGetMatchGamesQuery, useAddMatchGameMutation } = matchGamesApi;
