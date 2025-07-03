import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../utils/cookies';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  id_token: string;
  userProfile?: UserProfile;
}

interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

interface PasswordResetRequest {
  email: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev-vsjevx5h8rqzm6di.us.auth0.com',
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => ({
        url: `/api/v2/users/${userId}`,
        headers: {
          // Authorization: `Bearer ${localStorage.getItem('management_token')}`,
          // Authorization: `Bearer ${localStorage.getItem('token')}`, //  access_token
          Authorization: `Bearer ${getCookie('auth_token')}`,
        },
      }),
    }),
    authUser: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: '/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'password',
          username: credentials.username,
          password: credentials.password,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: 'openid profile email',
          // client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          // client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID_SPA, // SPA
          client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET_SPA, // SPA
          connection: 'Username-Password-Authentication'
        }),
      }),
    }),
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/api/v2/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('management_token')}`,
        },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          password: userData.password,
          connection: 'Username-Password-Authentication',
        }),
      }),
    }),
    resetPassword: builder.mutation<void, PasswordResetRequest>({
      query: (data) => ({
        url: '/dbconnections/change_password',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID_SPA, // SPA
          email: data.email,
          connection: 'Username-Password-Authentication',
        }),
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useAuthUserMutation, useRegisterUserMutation, useResetPasswordMutation } = authApi;
