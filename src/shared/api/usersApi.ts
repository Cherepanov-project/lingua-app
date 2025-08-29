import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Auth0User = {
  user_id: string
  name: string
  email: string
  created_at: string
  logins_count: number
  picture: string
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AUTH0_AUDIENCE,
    prepareHeaders: headers => {
      const token = sessionStorage.getItem('management_token')
      if (token) headers.set('authorization', `Bearer ${token}`)
    }
  }),
  endpoints: builder => ({
    getUsers: builder.query<Auth0User[], void>({
      query: () => 'users'
    }),

    getUser: builder.query<Auth0User, string>({
      query: id => `users/${id}`
    })
  })
})

export const { useGetUsersQuery, useGetUserQuery } = usersApi
