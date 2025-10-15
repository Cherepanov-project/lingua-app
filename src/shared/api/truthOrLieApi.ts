// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { API_BASE_URL } from "../config/api";
// import type { Statement, TruthOrLieData } from "../../user/components/Games/types/truthOrLie";

// export const truthOrLieApi = createApi({
//   reducerPath: "truthOrLieApi",
//   baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
//   tagTypes: ["TruthOrLie"],
//   endpoints: (build) => ({
//     getStatementsByLevel: build.query<Statement[], number>({
//       query: (level) => `truthlie?level=${level}`,
//       transformResponse: (response: TruthOrLieData[]) => response[0].statements,
//       providesTags: ["TruthOrLie"],
//     }),
//   }),
// });

// export const { useGetStatementsByLevelQuery } = truthOrLieApi;
