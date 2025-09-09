import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Auth0User = {
  user_id: string
  name: string
  email: string
  created_at: string
  logins_count: number
  picture: string
  roles?: string[]
}

type NewUserRequest = {
  email: string
  name: string
  password: string
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
    prepareHeaders: headers => {
      const token = sessionStorage.getItem('management_token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: builder => ({
    getUsers: builder.query<Auth0User[], void>({
      query: () => 'users',
      providesTags: ['Users']
    }),
    addUser: builder.mutation<Auth0User, NewUserRequest>({
      query: newUser => ({
        url: 'users',
        method: 'POST',
        body: {
          ...newUser,
          connection: 'Username-Password-Authentication'
        }
      }),
      // invalidatesTags: ['Users']

      async onQueryStarted (_newUser, { dispatch, queryFulfilled }) {
        try {
          const { data: createdUser } = await queryFulfilled
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, draft => {
              draft.push(createdUser)
            })
          )
        } catch (err) {
          console.error('Ошибка при добавлении пользователя:', err)
        }
      }
    }),
    deleteUser: builder.mutation<void, string>({
      query: userId => ({
        url: `users/${userId}`,
        method: 'DELETE'
      }),
      // invalidatesTags: ['Users']

      async onQueryStarted (userId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUsers', undefined, draft => {
            const index = draft.findIndex(user => user.user_id === userId)
            if (index !== -1) {
              draft.splice(index, 1)
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    })
  })
})

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } =
  usersApi
