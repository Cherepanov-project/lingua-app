import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type Grammar } from "../../types/grammar";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

const realBaseQuery = fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api` });

export const grammarApi = createApi({
  reducerPath: "grammarApi",
  baseQuery: realBaseQuery,
  tagTypes: ["Rules"],
  endpoints: (build) => ({
    getRules: build.query<Grammar[], void>({
      query: () => "grammar",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Rules" as const, id })),
              { type: "Rules", id: "LIST" },
            ]
          : [{ type: "Rules", id: "LIST" }],
    }),
    addRule: build.mutation<void, Omit<Grammar, "id">>({
      query: (body) => ({
        url: "grammar",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Rules", id: "LIST" }],
    }),

    deleateRule: build.mutation({
      query: (id) => ({
        url: `grammar/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Rules", id },
        { type: "Rules", id: "LIST" },
      ],
    }),

    editRule: build.mutation<
      void,
      { id: number } & Partial<Omit<Grammar, "id">>
    >({
      query: ({ id, ...body }) => ({
        url: `grammar/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Rules", id },
        { type: "Rules", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetRulesQuery,
  useAddRuleMutation,
  useDeleateRuleMutation,
  useEditRuleMutation,
} = grammarApi;
