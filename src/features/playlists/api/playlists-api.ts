import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlists-api.types";
import { baseApi, Tags } from "@/app/api";
import type { Images } from "@/common/types";

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: (params) => ({
        url: `playlists`,
        params,
      }),
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

    uploadPlaylistCover: build.mutation<
      Images,
      { playlistId: string; file: File }
    >({
      query: ({ playlistId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          method: "post",
          url: `/playlists/${playlistId}/images/main`,
          body: formData,
        };
      },
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
