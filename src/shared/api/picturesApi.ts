import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type Picture = {
  id: number;
  img: string;
  title: string;
  tag: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

export const picturesApi = createApi({
  reducerPath: "userPictures",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/` }),
  tagTypes: ["Pictures"],
  endpoints: (builder) => ({
    getPictures: builder.query<Picture[], void>({
      query: () => "pictures",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Pictures" as const, id })),
              { type: "Pictures", id: "LIST" },
            ]
          : [{ type: "Pictures", id: "LIST" }],
    }),

    getPicture: builder.query<Picture, number>({
      query: (id) => `pictures/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Pictures", id }],
    }),

    addPicture: builder.mutation<Picture, Omit<Picture, "id">>({
      query: (newPicture) => ({
        url: "pictures",
        method: "POST",
        body: newPicture,
      }),
      invalidatesTags: [{ type: "Pictures", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPicturesQuery,
  useGetPictureQuery,
  useAddPictureMutation,
} = picturesApi;
