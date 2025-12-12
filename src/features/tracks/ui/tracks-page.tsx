import { useFetchTracksInfiniteQuery } from "@/features/tracks/api/tracks-api";
import { useInfiniteScroll } from "@/common/hooks";
import { TracksList } from "@/features/tracks/ui/tracks-list/tracks-list";
import { LoadingTrigger } from "@/features/tracks/ui/loading-trigger/loading-trigger";

export const TracksPage = () => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchTracksInfiniteQuery();

  const { observerRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetching,
  });

  const pagesData = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div>
      <h1>Tracks page</h1>
      <TracksList track={pagesData} />
      {hasNextPage && (
        <LoadingTrigger
          isFetchingNextPage={isFetchingNextPage}
          observerRef={observerRef}
        />
      )}
      {!hasNextPage && pagesData.length > 0 && <div>Треков больше нет</div>}
    </div>
  );
};
