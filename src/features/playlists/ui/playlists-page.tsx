import { type ChangeEvent, useState } from "react";
import { useFetchPlaylistsQuery } from "@/features/playlists/api/playlistsApi";
import { useDebounceValue } from "@/common/hooks";
import { Pagination } from "@/common/pagination";
import { PlaylistsList } from "@/features/playlists/ui/playlists-list/playlists-list";
import { CreatePlaylistForm } from "@/features/playlists/ui/create-playlist-form/create-playlist-form";
import s from "./playlists-page.module.css";

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(2);

  const [search, setSearch] = useState<string>("");

  const debounceSearch = useDebounceValue(search);

  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize,
  });

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={"Search playlist by title"}
        onChange={searchPlaylistHandler}
      />
      <PlaylistsList
        playlists={data?.data ?? []}
        isPlaylistLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  );
};
