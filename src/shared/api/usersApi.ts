import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { getCookie, removeCookie, setCookie } from "../../user/utils/cookies";

export type Auth0User = {
  user_id: string;
  name: string;
  email: string;
  created_at: string;
  logins_count: number;
  picture: string;
  user_metadata?: Record<string, unknown>;
};

export type Auth0Role = {
  id: string;
  name: string;
};

type NewUserRequest = {
  email: string;
  name: string;
  password: string;
};

export interface BaseQueryApiWithRetry extends BaseQueryApi {
  alreadyRetried?: boolean;
}

// Базовый запрос
const rawBaseQuery = fetchBaseQuery({
  baseUrl: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
});

// Обёртка, которая автоматически получает management_token
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api: BaseQueryApiWithRetry, extraOptions) => {
  let token = getCookie("management_token");

  // Если токена нет — запрашиваем новый
  if (!token) {
    const tokenResponse = await fetch(
      `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID, // ⚙️ M2M Client ID
          client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET, // ⚙️ M2M Secret
          audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/`,
          grant_type: "client_credentials",
        }),
      }
    );

    const data = await tokenResponse.json();
    token = data.access_token;
    setCookie("management_token", token!);
  }

  // Добавляем токен к запросу
  const requestArgs: FetchArgs =
    typeof args === "string" ? { url: args } : { ...args };
  requestArgs.headers = {
    ...(requestArgs.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const result = await rawBaseQuery(requestArgs, api, extraOptions);

  // Если токен устарел → очищаем и пробуем снова
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    // Защита от бесконечного цикла
    if (api.alreadyRetried) return result;
    api.alreadyRetried = true;
    
    removeCookie("management_token");
    return baseQueryWithAuth(args, api, extraOptions);
  }

  return result;
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users", "UserMeta"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUsers: builder.query<Auth0User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getUserRoles: builder.query<Auth0Role[], string>({
      query: (userId) => `users/${userId}/roles`,
    }),

    getUserMeta: builder.query<Auth0User, string>({
      query: (userId) => `users/${userId}`,
      providesTags: ["UserMeta"],
    }),
    updateUserMeta: builder.mutation<
      void,
      { userId: string; level?: string; language?: string }
    >({
      query: ({ userId, ...meta }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: {
          user_metadata: meta,
        },
      }),
      invalidatesTags: ["UserMeta"],
    }),
    addUser: builder.mutation<Auth0User, NewUserRequest>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: {
          ...newUser,
          connection: "Username-Password-Authentication",
        },
      }),

      async onQueryStarted(_newUser, { dispatch, queryFulfilled }) {
        try {
          const { data: createdUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
              draft.push(createdUser);
            })
          );
        } catch (err) {
          console.error("Ошибка при добавлении пользователя:", err);
        }
      },
    }),

    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),

      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            const index = draft.findIndex((user) => user.user_id === userId);
            if (index !== -1) draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserRolesQuery,
  useGetUserMetaQuery,
  useUpdateUserMetaMutation,
} = usersApi;
