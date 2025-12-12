import { baseApi } from "@/app/api";
import type { FetchTracksResponse } from "@/features/tracks/api/tracks-api.types";

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<FetchTracksResponse, void, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          return lastPageParam <
            (lastPage.meta as { pagesCount: number }).pagesCount
            ? lastPageParam + 1
            : undefined;
        },
      },
      query: ({ pageParam }) => ({
        url: "playlists/tracks",
        params: {
          pageNumber: pageParam,
          pageSize: 10,
          paginationType: "offset",
        },
      }),
    }),
  }),
});
export const { useFetchTracksInfiniteQuery } = tracksApi;
