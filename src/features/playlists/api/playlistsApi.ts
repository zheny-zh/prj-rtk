import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistsApi.types";
import { baseApi, Tags } from "@/app/api";

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: () => `/playlists`,
      providesTags: [Tags.playlist],
    }),
    createPlaylists: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>(
      {
        query: (body) => ({ method: "post", url: "/playlists", body }),
        invalidatesTags: [Tags.playlist],
      },
    ),
    deletePlaylists: build.mutation<void, string>({
      query: (playlistId) => ({
        method: "delete",
        url: `/playlists/${playlistId}`,
      }),
      invalidatesTags: [Tags.playlist],
    }),
    updatePlaylists: build.mutation<
      void,
      { playlistId: string; body: UpdatePlaylistArgs }
    >({
      query: ({ playlistId, body }) => ({
        method: "put",
        url: `/playlists/${playlistId}`,
        body,
      }),
      invalidatesTags: [Tags.playlist],
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistsMutation,
  useDeletePlaylistsMutation,
  useUpdatePlaylistsMutation,
} = playlistsApi;
