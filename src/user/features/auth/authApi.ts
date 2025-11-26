import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getCookie, removeCookie, setCookie } from "../../utils/cookies";
import type { BaseQueryApiWithRetry } from "../../../shared/api/usersApi";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
}
interface AuthResponse {
  access_token: string;
  id_token: string;
  userProfile?: UserProfile;
}
interface AuthRequest {
  username: string;
  password: string;
}
interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  language: string;
  level: string;
}
interface PasswordResetRequest {
  email: string;
}

const rawBaseQuery = fetchBaseQuery({ baseUrl: "/auth0" });

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api: BaseQueryApiWithRetry, extraOptions) => {
  const endpointsNeedingToken = ["getUserProfile", "registerUser"];
  if (!endpointsNeedingToken.includes(api.endpoint)) {
    return rawBaseQuery(args, api, extraOptions);
  }

  let token = getCookie("management_token");
  if (!token) {
    const tokenResponse = await rawBaseQuery(
      {
        url: "/oauth/token",
        method: "POST",
        body: {
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          grant_type: "client_credentials",
        },
      },
      api,
      extraOptions
    );

    if (tokenResponse.data) {
      token = (tokenResponse.data as { access_token: string }).access_token;
      setCookie("management_token", token);
    } else {
      if (tokenResponse.error instanceof Error) {
        throw new Error(
          `Не удалось получить management_token: ${tokenResponse.error}`
        );
      }
    }
  }

  const requestArgs: FetchArgs =
    typeof args === "string" ? { url: args } : { ...args };
  requestArgs.headers = {
    ...(requestArgs.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  let result = await rawBaseQuery(requestArgs, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    // Защита от бесконечного цикла
    if (api.alreadyRetried) return result;
    api.alreadyRetried = true;
    
    removeCookie("management_token");
    return baseQuery(args, api, extraOptions);
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `/api/v2/users/${userId}`,
    }),
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/api/v2/users",
        method: "POST",
        body: {
          email: userData.email,
          name: userData.name,
          password: userData.password,
          connection: "Username-Password-Authentication",
          user_metadata: {
            level: userData.level,
            language: userData.language,
          },
        },
      }),
    }),

    authUser: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: "/oauth/token",
        method: "POST",
        body: {
          grant_type: "password",
          username: credentials.username,
          password: credentials.password,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "openid profile email",
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID_SPA,
          client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET_SPA,
          connection: "Username-Password-Authentication",
        },
      }),
    }),

    resetPassword: builder.mutation<void, PasswordResetRequest>({
      query: (data) => ({
        url: "/dbconnections/change_password",
        method: "POST",
        body: {
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID_SPA,
          email: data.email,
          connection: "Username-Password-Authentication",
        },
        responseHandler: "text",
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useAuthUserMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
} = authApi;
