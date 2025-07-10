import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type User = {
  id: number
  name: string
  email: string
  language: string
  registrationDate: string
  activeCourses: number
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    
    getUser: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
  }),
})

export const { 
  useGetUsersQuery, 
  useGetUserQuery 
} = usersApi