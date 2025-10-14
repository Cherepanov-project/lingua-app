import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TruthOrLieGame = {
  id: number;
  level: number;
  statements: GameStatement[];
};

export type GameStatement = {
  statement: string;
  correctValue: string;
};

const API_BASE_URL = "http://localhost:3001";

export const truthOrLieGamesApi = createApi({
  reducerPath: "truthOrLieGames",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["TruthOrLieGames"],
  endpoints: (builder) => ({
    getTruthOrLieGames: builder.query<TruthOrLieGame[], void>({
      query: () => "truthlie",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "TruthOrLieGames" as const,
                id,
              })),
              { type: "TruthOrLieGames", id: "LIST" },
            ]
          : [{ type: "TruthOrLieGames", id: "LIST" }],
    }),
    addTruthOrLieGame: builder.mutation<
      TruthOrLieGame,
      Omit<TruthOrLieGame, "id">
    >({
      query: (newGame) => ({
        url: "truthlie",
        method: "POST",
        body: newGame,
      }),
      invalidatesTags: [{ type: "TruthOrLieGames", id: "LIST" }],
    }),
    deleteTruthOrLieGame: builder.mutation<TruthOrLieGame, number>({
      query: (id) => ({
        url: `truthlie/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "TruthOrLieGames", id: "LIST" }],
    }),
    deleteGameStatement: builder.mutation<
      TruthOrLieGame,
      { gameId: number; newStatements: GameStatement[] }
    >({
      query: ({ gameId, newStatements }) => ({
        url: `truthlie/${gameId}`,
        method: "PATCH",
        body: {
          statements: newStatements,
        },
      }),
      invalidatesTags: [{ type: "TruthOrLieGames", id: "LIST" }],
    }),
    editTruthOrLieGame: builder.mutation<TruthOrLieGame, TruthOrLieGame>({
      query: (newGame) => ({
        url: `truthlie/${newGame.id}`,
        method: "PATCH",
        body: newGame,
      }),
      invalidatesTags: [{ type: "TruthOrLieGames", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTruthOrLieGamesQuery,
  useDeleteTruthOrLieGameMutation,
  useDeleteGameStatementMutation,
  useAddTruthOrLieGameMutation,
  useEditTruthOrLieGameMutation,
} = truthOrLieGamesApi;
