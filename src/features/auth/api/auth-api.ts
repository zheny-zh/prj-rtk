import { baseApi } from "@/app/api";
import type { MeResponse } from "@/common/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => `auth/me`,
    }),
  }),
});

export const { useGetMeQuery } = authApi;
