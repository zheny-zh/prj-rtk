import { baseApi, Tags } from "@/app/api";
import type { LoginArgs } from "@/features/auth/api/auth-api.types";
import { AUTH_KEYS } from "@/common/constants";
import { withZodCatch } from "@/common/utils";
import {
  loginResponseSchema,
  meResponseSchemas,
} from "@/features/auth/model/auth.shemas";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => `auth/me`,
      ...withZodCatch(meResponseSchemas),
      providesTags: [Tags.auth],
    }),
    login: build.mutation({
      query: (payload: LoginArgs) => {
        return {
          method: "post",
          url: `/auth/login`,
          body: { ...payload, accessTokenTTL: "10s" },
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        localStorage.setItem(AUTH_KEYS.refreshToken, data.refreshToken);
        dispatch(authApi.util.invalidateTags([Tags.auth]));
      },
      ...withZodCatch(loginResponseSchema),
    }),

    logout: build.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken);

        return {
          method: "post",
          url: `/auth/logout`,
          body: { refreshToken },
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        localStorage.removeItem(AUTH_KEYS.accessToken);
        localStorage.removeItem(AUTH_KEYS.refreshToken);
        dispatch(baseApi.util.resetApiState());
      },
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi;
