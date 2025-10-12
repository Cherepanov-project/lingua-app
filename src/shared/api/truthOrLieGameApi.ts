import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TruthOrLieGame = {
  id: number;
  level: number;
  statements: {
    statement: string;
    correctValue: boolean;
  }[];
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
  }),
});

export const { useGetTruthOrLieGamesQuery } = truthOrLieGamesApi;
