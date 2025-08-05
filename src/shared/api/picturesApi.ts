import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const JSONBIN_BASE_URL = "https://api.jsonbin.io/v3";
const JSONBIN_API_KEY = "$2a$10$ltfhYjgQ4XrIqAKXBw.QZuzJP4bMWkHhHKeT9ZVUwgUBaEk1.vGfm";
const JSONBIN_BIN_ID = "688a53a37b4b8670d8a9f543";

type Picture = {
  id: number | string;
  img: string;
  title: string;
  tag: string;
}

export const picturesApi = createApi({
  reducerPath: 'picturesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: JSONBIN_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("X-Master-Key", JSONBIN_API_KEY);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['Pictures'],
  endpoints: (builder) => ({
    getPictures: builder.query<Picture[], void>({
      query: () => `/b/${JSONBIN_BIN_ID}`,
      transformResponse: (response: { record: { pictures: Picture[] } }) => 
        response.record.pictures || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Pictures' as const, id })),
              { type: 'Pictures', id: 'LIST' },
            ]
          : [{ type: 'Pictures', id: 'LIST' }],
    }),
    
    getPicture: builder.query<Picture, number | string>({
      query: (id) => ({
        url: `/b/${JSONBIN_BIN_ID}`,
        params: { id },
      }),
      transformResponse: (response: { record: { pictures: Picture[] } }, _meta, arg) => {
        const picture = response.record.pictures.find(p => p.id === arg);
        if (!picture) {
          throw new Error(`Picture with id ${arg} not found`);
        }
        return picture;
      },
      providesTags: (_result, _error, arg) => [{ type: 'Pictures', id: arg }],
    }),
    
    addPicture: builder.mutation<Picture, Omit<Picture, 'id'> & { id?: number | string }>({
      query: (newPicture) => ({
        url: `/b/${JSONBIN_BIN_ID}`,
        method: 'PUT',
        body: {
          pictures: [newPicture]
        },
      }),
      invalidatesTags: [{ type: 'Pictures', id: 'LIST' }],
    }),
  }),
});

export const { 
  useGetPicturesQuery, 
  useGetPictureQuery,
  useAddPictureMutation,
} = picturesApi;