import { useGetMeQuery } from "@/features/auth/api/auth-api";
import { useFetchPlaylistsQuery } from "@/features/playlists/api/playlists-api";
import { PlaylistsList } from "@/features/playlists/ui/playlists-list";
import { CreatePlaylistForm } from "@/features/playlists/ui/create-playlist-form/create-playlist-form";
import s from "./profile-page.module.css";
import { Navigate } from "react-router";
import { Path } from "@/common/routing/path";

export const ProfilePage = () => {
  const { data: meData, isLoading: isMeLoading } = useGetMeQuery();
  const { data: playlistsData, isLoading } = useFetchPlaylistsQuery(
    {
      userId: meData?.userId,
    },
    { skip: !meData?.userId },
  );

  if (!isMeLoading && !meData) return <Navigate to={Path.Playlists} />;

  return (
    <>
      <h1>{meData?.login}</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistsList
          playlists={playlistsData?.data ?? []}
          isPlaylistLoading={isLoading}
        />
      </div>
    </>
  );
};
