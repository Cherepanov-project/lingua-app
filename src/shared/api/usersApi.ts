import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const JSONBIN_BASE_URL = "https://api.jsonbin.io/v3";
const JSONBIN_API_KEY = "$2a$10$ltfhYjgQ4XrIqAKXBw.QZuzJP4bMWkHhHKeT9ZVUwgUBaEk1.vGfm";
const JSONBIN_BIN_ID = "688a53a37b4b8670d8a9f543";

type User = {
  id: number | string;
  name: string;
  email: string;
  language: string;
  registrationDate: string;
  activeCourses: number;
  picture?: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: JSONBIN_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("X-Master-Key", JSONBIN_API_KEY);
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => `/b/${JSONBIN_BIN_ID}`,
      transformResponse: (response: { record: { users: User[] } }) => 
        response.record.users || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    
    getUser: builder.query<User, number | string>({
      query: (id) => ({
        url: `/b/${JSONBIN_BIN_ID}`,
        params: { id }, 
      }),
      transformResponse: (response: { record: { users: User[] } }, _meta, arg) => {
        console.log(`Fetching user with ID: ${arg}`);
        const user = response.record.users.find(u => u.id === arg);
        if (!user) {
          throw new Error(`User with id ${arg} not found`);
        }
        return user;
      },
      providesTags: (_result, _error, arg) => [{ type: 'Users', id: arg }],
    }),
  }),
});

export const { 
  useGetUsersQuery, 
  useGetUserQuery 
} = usersApi;