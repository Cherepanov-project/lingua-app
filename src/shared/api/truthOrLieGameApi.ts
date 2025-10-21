import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Statement } from "../../user/components/Games/types/truthOrLie";

export type TruthOrLieGame = {
  id: number;
  level: number;
  statements: GameStatement[];
};

export type GameStatement = {
  statement: string;
  correctValue: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

export const truthOrLieGamesApi = createApi({
  reducerPath: "truthOrLieGames",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/` }),
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
    getStatementsByLevel: builder.query<Statement[], number>({
      query: () => "truthlie",
      transformResponse: (response: TruthOrLieGame[], _meta, arg: number) => {
        return response
          .filter((game) => game.level === arg)[0]
          .statements.map((statement, index) => ({
            id: index,
            statement: statement.statement,
            correctValue: statement.correctValue === "true" ? true : false,
          }));
      },
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
        url: "truthlie",
        method: "PATCH",
        body: {
          id: gameId,
          statements: newStatements,
        },
      }),
      invalidatesTags: [{ type: "TruthOrLieGames", id: "LIST" }],
    }),
    editTruthOrLieGame: builder.mutation<TruthOrLieGame, TruthOrLieGame>({
      query: (newGame) => ({
        url: "truthlie",
        method: "PATCH",
        body: newGame,
      }),
      invalidatesTags: [{ type: "TruthOrLieGames", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTruthOrLieGamesQuery,
  useGetStatementsByLevelQuery,
  useDeleteTruthOrLieGameMutation,
  useDeleteGameStatementMutation,
  useAddTruthOrLieGameMutation,
  useEditTruthOrLieGameMutation,
} = truthOrLieGamesApi;
