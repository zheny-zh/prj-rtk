import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistCreatedEvent,
  PlaylistUpdatedEvent,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlists-api.types";
import { baseApi, Tags } from "@/app/api";
import {
  playlistCreateResponseSchema,
  playlistsResponseSchema,
} from "@/features/playlists/model/playlists.schemas";
import { withZodCatch } from "@/common/utils";
import { imagesSchema } from "@/common/schemas";
import { SOCKET_EVENTS } from "@/common/constants";
import { subscribeToEvent } from "@/common/socket";

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query({
      query: (params: FetchPlaylistsArgs) => ({
        url: `playlists`,
        params,
      }),
      keepUnusedDataFor: 0,
      ...withZodCatch(playlistsResponseSchema),
      providesTags: [Tags.playlist],
      onCacheEntryAdded: async (
        _,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved },
      ) => {
        await cacheDataLoaded;

        const unsubscribes = [
          subscribeToEvent<PlaylistCreatedEvent>(
            SOCKET_EVENTS.PLAYLIST_CREATED,
            (msg) => {
              const newPlaylist = msg.payload.data;
              updateCachedData((state) => {
                state.data.pop();
                state.data.unshift(newPlaylist);
                state.meta.totalCount += 1;
                state.meta.pagesCount = Math.ceil(
                  state.meta.totalCount / state.meta.pageSize,
                );

                // 2 вариант
                // dispatch(playlistsApi.util.invalidateTags([Tags.playlist]))
              });
            },
          ),
          subscribeToEvent<PlaylistUpdatedEvent>(
            SOCKET_EVENTS.PLAYLIST_UPDATED,
            (msg) => {
              const newPlaylist = msg.payload.data;
              updateCachedData((state) => {
                const index = state.data.findIndex(
                  (playlist) => playlist.id === newPlaylist.id,
                );
                if (index !== -1) {
                  state.data[index] = { ...state.data[index], ...newPlaylist };
                }
              });
            },
          ),
        ];

        await cacheEntryRemoved;
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      },
    }),
    createPlaylists: build.mutation({
      query: (body: CreatePlaylistArgs) => ({
        method: "post",
        url: "/playlists",
        body,
      }),
      ...withZodCatch(playlistCreateResponseSchema),
      invalidatesTags: [Tags.playlist],
    }),
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
      onQueryStarted: async (
        { playlistId, body },
        { queryFulfilled, dispatch, getState },
      ) => {
        const args = playlistsApi.util.selectCachedArgsForQuery(
          getState(),
          "fetchPlaylists",
        );

        const patchCollections: any[] = [];

        args.forEach((arg) => {
          patchCollections.push(
            dispatch(
              playlistsApi.util.updateQueryData(
                "fetchPlaylists",
                {
                  pageNumber: arg.pageNumber,
                  pageSize: arg.pageSize,
                  search: arg.search,
                },
                (state) => {
                  const index = state.data.findIndex(
                    (pl) => pl.id === playlistId,
                  );
                  if (index !== -1) {
                    state.data[index].attributes = {
                      ...state.data[index].attributes,
                      ...body,
                    };
                  }
                },
              ),
            ),
          );
        });

        try {
          await queryFulfilled;
        } catch (e) {
          console.log(e);
          patchCollections.forEach((pc) => pc.undo());
        }
      },
      invalidatesTags: [Tags.playlist],
    }),

    uploadPlaylistCover: build.mutation({
      query: ({ playlistId, file }: { playlistId: string; file: File }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          method: "post",
          url: `/playlists/${playlistId}/images/main`,
          body: formData,
        };
      },
      ...withZodCatch(imagesSchema),
      invalidatesTags: [Tags.playlist],
    }),
    deletePlaylistCover: build.mutation<void, { playlistId: string }>({
      query: ({ playlistId }) => ({
        method: "delete",
        url: `/playlists/${playlistId}/images/main`,
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
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi;
