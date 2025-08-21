import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
type Picture = {
  id: number
  img: string
  title: string
  tag: string
}

export const picturesApi = createApi({
  reducerPath: 'userPictures',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Pictures'],
  endpoints: (builder) => ({
    getPictures: builder.query<Picture[], void>({
      query: () => 'pictures',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Pictures' as const, id })),
              { type: 'Pictures', id: 'LIST' },
            ]
          : [{ type: 'Pictures', id: 'LIST' }],
    }),
    
    getPicture: builder.query<Picture, number>({
      query: (id) => `pictures/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Pictures', id }],
    }),
    
    addPicture: builder.mutation<Picture, Omit<Picture, 'id'>>({
      query: (newPicture) => ({
        url: 'pictures',
        method: 'POST',
        body: newPicture,
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