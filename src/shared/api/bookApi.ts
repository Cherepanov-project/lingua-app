import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/` }),
  endpoints: builder => ({
    getBookHtml: builder.query<string, string>({
      query: (bookUrl) => ({
       url: `proxy?url=${encodeURIComponent(bookUrl)}`,         
       method: "GET",
       responseHandler: (response) => response.text(), 
      }),
    }),
  }),
})

export const { useGetBookHtmlQuery } = bookApi;