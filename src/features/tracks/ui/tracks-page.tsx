import { useFetchTracksInfiniteQuery } from "@/features/tracks/api/tracks-api";
import s from "./tracks-page.module.css";

export const TracksPage = () => {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchTracksInfiniteQuery();

  const pagesData = data?.pages.flatMap((p) => p.data) ?? [];

  const loadMoreHandler = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  return (
    <div>
      <h1>Tracks page</h1>
      <div className={s.list}>
        {pagesData.map((track) => {
          const { title, user, attachments } = track.attributes;

          return (
            <div key={track.id} className={s.item}>
              <div>
                <p>Title: {title}</p>
                <p>Name: {user.name}</p>
              </div>
              {attachments.length ? (
                <audio controls src={attachments[0].url} />
              ) : (
                "нет файла"
              )}
            </div>
          );
        })}
      </div>

      {!isLoading && (
        <>
          {hasNextPage ? (
            <div className={s.loadMoreContainer}>
              <button onClick={loadMoreHandler} disabled={isFetching}>
                {isFetchingNextPage ? "Loading..." : "Загрузить еще"}
              </button>
            </div>
          ) : (
            <p>Nothing more to load</p>
          )}
        </>
      )}
    </div>
  );
};
