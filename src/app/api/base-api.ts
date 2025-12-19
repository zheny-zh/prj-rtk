import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/app/api/base-query-with-reauth";

export const Tags = {
  playlist: "Playlist",
  auth: "Auth",
} as const;

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: Object.values(Tags),
  baseQuery: baseQueryWithReauth,

  endpoints: () => ({}),
});
