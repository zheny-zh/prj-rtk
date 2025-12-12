import { baseApi } from "@/app/api";
import type { FetchTracksResponse } from "@/features/tracks/api/tracks-api.types";

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<
      FetchTracksResponse,
      void,
      string | undefined
    >({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.meta.nextCursor,
      },
      query: (pageParams) => ({
        url: "playlists/tracks",
        params: { cursor: pageParams, paginationType: "cursor", pageSize: 5 },
      }),
    }),
  }),
});
export const { useFetchTracksInfiniteQuery } = tracksApi;
