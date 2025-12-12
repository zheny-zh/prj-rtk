import { useAppSelector } from "@/app/model/store";
import { playlistsApi } from "@/features/playlists/api/playlists-api";
import { tracksApi } from "@/features/tracks/api/tracks-api";

const excludedEndpoints = [
  playlistsApi.endpoints.fetchPlaylists.name,
  tracksApi.endpoints.fetchTracks.name,
];

export const useGlobalLoading = () => {
  return useAppSelector((state) => {
    const queries = Object.values(state.baseApi.queries || {});
    const mutation = Object.values(state.baseApi.mutations || {});

    const hasActiveQueries = queries.some((q) => {
      if (q?.status !== "pending") return;
      if (excludedEndpoints.includes(q.endpointName)) {
        const completedQueries = queries.filter(
          (q) => q?.status === "fulfilled",
        );
        return completedQueries.length > 0;
      }
    });
    const hasActiveMutations = mutation.some((m) => m?.status === "pending");

    return hasActiveQueries || hasActiveMutations;
  });
};
