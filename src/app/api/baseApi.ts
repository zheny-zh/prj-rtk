import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Tags = {
  playlist: "Playlist",
} as const;

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: Object.values(Tags),
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      );
      return headers;
    },
  }),

  endpoints: () => ({}),
});
